from datasets.models import Dataset, DatasetAnnotation, DatasetAsset, DatasetClass
from datasets.types import DatasetAnnotationId, DatasetAssetId, DatasetClassId, DatasetId
from packages.framework.usecases import RepositoryAdapter


class DatasetRepository(RepositoryAdapter[Dataset, DatasetId]):
    def __init__(self):
        super().__init__(Dataset)


class DatasetAssetRepository(RepositoryAdapter[DatasetAsset, DatasetAssetId]):
    def __init__(self):
        super().__init__(DatasetAsset)


class DatasetClassRepository(RepositoryAdapter[DatasetClass, DatasetClassId]):
    def __init__(self):
        super().__init__(DatasetClass)


class DatasetAnnotationRepository(RepositoryAdapter[DatasetAnnotation, DatasetAnnotationId]):
    def __init__(self):
        super().__init__(DatasetAnnotation)


dataset_repository = DatasetRepository()
dataset_asset_repository = DatasetAssetRepository()
dataset_class_repository = DatasetClassRepository()
dataset_annotation_repository = DatasetAnnotationRepository()
