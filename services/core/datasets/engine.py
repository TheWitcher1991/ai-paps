import json
import tempfile
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
        self._merge_categories(coco)
        self._merge_images(coco)
        self._merge_annotations(coco)

    def _merge_categories(self, coco):
        for cat in coco.get("categories", []):
            if cat["id"] not in self.category_map:
                new_id = len(self.category_map) + 1
                self.category_map[cat["id"]] = new_id
                cat["id"] = new_id
                self.coco["categories"].append(cat)

    def _merge_images(self, coco):
        for img in coco.get("images", []):
            img["id"] += self.image_id_offset
            self.coco["images"].append(img)

        if coco.get("images"):
            self.image_id_offset = max(i["id"] for i in self.coco["images"]) + 1

    def _merge_annotations(self, coco):
        for ann in coco.get("annotations", []):
            ann["id"] += self.annotation_id_offset
            ann["image_id"] += self.image_id_offset
            ann["category_id"] = self.category_map.get(ann["category_id"], ann["category_id"])
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

        coco = self._wait_and_load_coco(rq_id)

        self.registry.merge(coco)

        self.save()

    def validate(self):
        pass

    @transaction.atomic
    def save(self):
        coco = self.registry.coco

        images_dir = ""

        dataset = dataset_repository.create(
            name="CVAT Dataset",
            source=self.source,
            source_id=self.source_id,
            format=DatasetFormat.COCO,
        )

        category_map = {}
        for cat in coco.get("categories", []):
            cls = dataset_class_repository.create(
                dataset=dataset,
                name=cat["name"],
                class_id=cat["id"],
            )
            category_map[cat["id"]] = cls

        image_map = {}
        for img in coco.get("images", []):
            image_path = images_dir / img["file_name"]

            with open(image_path, "rb") as f:
                django_file = File(f)

                dataset_asset = dataset_asset_repository.create(
                    dataset=dataset,
                    width=img["width"],
                    height=img["height"],
                    source_id=img["id"],
                )

                dataset_asset.file.save(img["file_name"], django_file, save=True)

            image_map[img["id"]] = dataset_asset

        for ann in coco.get("annotations", []):
            dataset_annotation_repository.objects.create(
                dataset=dataset,
                asset=image_map[ann["image_id"]],
                cls=category_map[ann["category_id"]],
                segmentation=ann.get("segmentation", []),
                bbox=ann.get("bbox", []),
                area=ann.get("area", 0),
                iscrowd=ann.get("iscrowd", 0) == 1,
            )

        return dataset

    def _wait_and_load_coco(self, rq_id: RqId, timeout: int = 300, interval: int = 5) -> dict:
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

        coco_archive_path = Path(self._download_rq_result(rq_id))

        with tempfile.TemporaryDirectory() as tmpdir:
            tmpdir = Path(tmpdir)
            with zipfile.ZipFile(coco_archive_path, "r") as zip_ref:
                zip_ref.extractall(tmpdir)

            ann_path = tmpdir / "annotations" / "instances_default.json"
            if not ann_path.exists():
                raise FileNotFoundError(f"Файл COCO не найден: {ann_path}")

            with open(ann_path, "r", encoding="utf-8") as f:
                coco = json.load(f)

        return coco

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
