from django.db import transaction

from datasets.repositories import (
    DatasetAnnotationRepository,
    DatasetAssetRepository,
    DatasetClassRepository,
    DatasetRepository,
)
from packages.framework.usecases import UseCaseAdapter


class MergeDatasetsUseCase(UseCaseAdapter):
    def __init__(self):
        self.repo = DatasetRepository()
        self.asset_repo = DatasetAssetRepository()
        self.class_repo = DatasetClassRepository()
        self.annotation_repo = DatasetAnnotationRepository()

    @transaction.atomic
    def execute(self, name: str, description: str, dataset_ids: list[int]):
        datasets = self.repo.all().filter(id__in=dataset_ids)

        if datasets.count() < 2:
            raise ValueError("At least 2 datasets required for merging")

        first_dataset = datasets.first()

        new_dataset = self.repo.create(
            {
                "name": name,
                "description": description,
                "source_id": first_dataset.source_id,
                "source": first_dataset.source,
                "status": first_dataset.status,
                "format": first_dataset.format,
                "subset": first_dataset.subset,
                "modality": first_dataset.modality,
            }
        )

        class_name_to_new_class = {}

        for dataset in datasets:
            for cls in dataset.classes.all():
                existing_class = new_dataset.classes.filter(name=cls.name).first()

                if existing_class:
                    class_name_to_new_class[(dataset.id, cls.source_id)] = existing_class
                else:
                    new_class = self.class_repo.create(
                        {
                            "dataset": new_dataset,
                            "name": cls.name,
                            "source_id": cls.source_id,
                        }
                    )
                    class_name_to_new_class[(dataset.id, cls.source_id)] = new_class

        for dataset in datasets:
            for asset in dataset.assets.all():
                new_asset = self.asset_repo.create(
                    {
                        "dataset": new_dataset,
                        "file": asset.file,
                        "width": asset.width,
                        "height": asset.height,
                        "source_id": asset.source_id,
                    }
                )

                for ann in asset.annotations.all():
                    new_cls = class_name_to_new_class.get((dataset.id, ann.cls.source_id))
                    if new_cls:
                        self.annotation_repo.create(
                            {
                                "dataset": new_dataset,
                                "asset": new_asset,
                                "cls": new_cls,
                                "segmentation": ann.segmentation,
                                "bbox": ann.bbox,
                                "area": ann.area,
                                "iscrowd": ann.iscrowd,
                            }
                        )

        return new_dataset


class DatasetUseCase(UseCaseAdapter):
    def __init__(self):
        self.repo = DatasetRepository()

    def optimize(self):
        return self.repo.all().prefetch_related("classes")


class DatasetAssetUseCase(UseCaseAdapter):
    def __init__(self):
        self.repo = DatasetAssetRepository()

    def optimize(self):
        return self.repo.all().select_related("dataset")


class DatasetClassUseCase(UseCaseAdapter):
    def __init__(self):
        self.repo = DatasetClassRepository()

    def optimize(self):
        return self.repo.all().select_related("dataset")


class DatasetAnnotationUseCase(UseCaseAdapter):
    def __init__(self):
        self.repo = DatasetAnnotationRepository()

    def optimize(self):
        return self.repo.all().select_related("dataset", "asset", "cls")


dataset_use_case = DatasetUseCase()
dataset_asset_use_case = DatasetAssetUseCase()
dataset_class_use_case = DatasetClassUseCase()
dataset_annotation_use_case = DatasetAnnotationUseCase()
merge_datasets_use_case = MergeDatasetsUseCase()
