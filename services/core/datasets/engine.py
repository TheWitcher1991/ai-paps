import json
import shutil
import time
import zipfile
from pathlib import Path
from typing import Optional

import requests
from django.core.files import File
from django.db import transaction

from config.settings import CVAT_TOKEN, MEDIA_ROOT
from cvat.rq.types import RqId, RqStatus
from cvat.sdk import cvat
from cvat.shared.types import CVATDatasetFormat
from datasets.repositories import (
    dataset_annotation_repository,
    dataset_asset_repository,
    dataset_class_repository,
    dataset_repository,
)
from datasets.types import DatasetFormat, DatasetSource
from packages.kernel.utils import validation_error


class COCODatasetRegistry:

    def __init__(self):
        self.coco = {
            "images": [],
            "annotations": [],
            "categories": [],
        }

        self.category_map = {}
        self.image_id_offset = 0
        self.annotation_id_offset = 0

    def merge(self, coco: dict):
        image_offset = self.image_id_offset
        annotation_offset = self.annotation_id_offset

        self._merge_categories(coco)
        self._merge_images(coco, image_offset)
        self._merge_annotations(coco, image_offset, annotation_offset)

    def _merge_categories(self, coco):
        for cat in coco.get("categories", []):
            if cat["id"] not in self.category_map:
                new_id = len(self.category_map) + 1
                self.category_map[cat["id"]] = new_id
                cat["id"] = new_id
                self.coco["categories"].append(cat)

    def _merge_images(self, coco, image_offset):
        for img in coco.get("images", []):
            img["id"] += image_offset
            self.coco["images"].append(img)

        if coco.get("images"):
            self.image_id_offset = max(i["id"] for i in self.coco["images"]) + 1

    def _merge_annotations(self, coco, image_offset, annotation_offset):
        for ann in coco.get("annotations", []):
            ann["id"] += annotation_offset
            ann["image_id"] += image_offset
            ann["category_id"] = self.category_map.get(
                ann["category_id"],
                ann["category_id"],
            )
            self.coco["annotations"].append(ann)

        if coco.get("annotations"):
            self.annotation_id_offset = max(a["id"] for a in self.coco["annotations"]) + 1


class DatasetRegistry:

    @staticmethod
    def export(source: DatasetSource, source_id: int) -> RqId:
        if source == DatasetSource.PROJECTS.value:
            return cvat.projects.export_dataset(project_id=source_id, format=CVATDatasetFormat.COCO)

        if source == DatasetSource.TASKS.value:
            return cvat.tasks.export_dataset(task_id=source_id, format=CVATDatasetFormat.COCO)

        if source == DatasetSource.JOBS.value:
            return cvat.jobs.export_dataset(job_id=source_id, format=CVATDatasetFormat.COCO)

        raise ValueError("Unsupported dataset source")


class DatasetEngine:

    def __init__(self):
        self.registry = COCODatasetRegistry()
        self.source: Optional[DatasetSource] = None
        self.source_id: Optional[int] = None

    def export(self, source: DatasetSource, source_id: int):
        self.source = source
        self.source_id = source_id

        rq_id = DatasetRegistry.export(source, source_id)

        extract_dir = None
        zip_path = None

        try:
            coco, extract_dir, zip_path = self._wait_and_load_coco(rq_id)

            self.registry.merge(coco)

            self.save(extract_dir)
        finally:
            if zip_path and Path(zip_path).exists():
                Path(zip_path).unlink(missing_ok=True)

            if extract_dir and Path(extract_dir).exists():
                shutil.rmtree(extract_dir, ignore_errors=True)

    def validate(self):
        pass

    @transaction.atomic
    def save(self, extract_dir: Path):
        coco = self.registry.coco

        images_dir = extract_dir / "images" / "default"

        dataset = dataset_repository.create(
            name="CVAT Dataset",
            source=self.source,
            source_id=self.source_id,
            format=DatasetFormat.COCO,
        )

        category_map = {}
        try:
            for cat in coco.get("categories", []):
                cls = dataset_class_repository.create(
                    dataset=dataset,
                    name=cat["name"],
                    class_id=cat["id"],
                )
                category_map[cat["id"]] = cls
        except Exception as e:
            validation_error(f"Dataset asset error: {e}")

        image_map = {}
        try:
            for img in coco.get("images", []):
                image_path = images_dir / img["file_name"]

                dataset_asset = dataset_asset_repository.create(
                    dataset=dataset,
                    width=img["width"],
                    height=img["height"],
                    source_id=img["id"],
                )

                with open(image_path, "rb") as f:
                    dataset_asset.file.save(
                        img["file_name"],
                        File(f),
                        save=True,
                    )

                image_map[img["id"]] = dataset_asset
        except Exception as e:
            validation_error(f"Dataset class error: {e}")

        try:
            for ann in coco.get("annotations", []):
                image_id = ann["image_id"]
                category_id = ann["category_id"]

                print(f"ann: {ann}")

                if image_id not in image_map:
                    validation_error(f"Image not found: {image_id}")

                if category_id not in category_map:
                    validation_error(f"Category not found: {category_id}")

                dataset_annotation_repository.create(
                    dataset=dataset,
                    asset=image_map[ann["image_id"]],
                    cls=category_map[ann["category_id"]],
                    segmentation=ann.get("segmentation", []),
                    bbox=ann.get("bbox", []),
                    area=ann.get("area", 0),
                    iscrowd=ann.get("iscrowd", 0) == 1,
                )
        except Exception as e:
            validation_error(f"Dataset annotation error: {e}")

        return dataset

    def _wait_and_load_coco(self, rq_id: RqId, timeout: int = 300, interval: int = 5):
        start = time.time()

        while True:
            job_status = self._get_rq_status(rq_id)

            if job_status.value == RqStatus.FINISHED:
                break

            elif job_status.value == RqStatus.FINISHED:
                raise RuntimeError(f"Экспорт CVAT завершился с ошибкой: {job_status}")

            if time.time() - start > timeout:
                raise TimeoutError("Экспорт CVAT не завершился за отведённое время")

            time.sleep(interval)

        zip_path = Path(self._download_rq_result(rq_id))

        extract_dir = Path(MEDIA_ROOT) / "datasets" / f"cvat_{rq_id.rq_id}"
        extract_dir.mkdir(parents=True, exist_ok=True)

        with zipfile.ZipFile(zip_path, "r") as zip_ref:
            zip_ref.extractall(extract_dir)

        ann_path = extract_dir / "annotations" / "instances_default.json"
        if not ann_path.exists():
            raise FileNotFoundError(f"Файл COCO не найден: {ann_path}")

        with open(ann_path, "r", encoding="utf-8") as f:
            coco = json.load(f)

        return coco, extract_dir, zip_path

    def _get_rq_status(self, rq_id: RqId) -> RqStatus:
        rq = cvat.requests.find_one(rq_id.rq_id)
        return rq.status

    def _download_rq_result(self, rq_id: RqId) -> str:
        rq = cvat.requests.find_one(rq_id.rq_id)
        if not rq.result_url:
            raise RuntimeError(f"Экспорт ещё не готов: {rq_id}")

        url = rq.result_url

        export_dir = Path(MEDIA_ROOT) / "datasets"
        export_dir.mkdir(parents=True, exist_ok=True)

        zip_path = export_dir / f"cvat_export_{rq_id.rq_id}.zip"

        response = requests.get(url, headers={"Authorization": "Bearer " + CVAT_TOKEN}, stream=True)
        response.raise_for_status()

        with open(zip_path, "wb") as f:
            for chunk in response.iter_content(chunk_size=8192):
                if chunk:
                    f.write(chunk)

        return str(zip_path)
