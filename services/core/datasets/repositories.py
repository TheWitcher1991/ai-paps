from datasets.models import Dataset, DatasetAsset, DatasetClass, DatasetAnnotation
from datasets.types import DatasetId, DatasetAnnotationId, DatasetAssetId, DatasetClassId
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
