from datasets.repositories import (
    DatasetAnnotationRepository,
    DatasetAssetRepository,
    DatasetClassRepository,
    DatasetRepository,
)
from packages.framework.usecases import UseCaseAdapter


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
