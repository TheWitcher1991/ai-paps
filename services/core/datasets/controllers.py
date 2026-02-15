from datasets.filters import DatasetAnnotationFilter, DatasetAssetFilter, DatasetClassFilter, DatasetFilter
from datasets.serializers import (
    DatasetAnnotationSerializer,
    DatasetAssetSerializer,
    DatasetClassSerializer,
    DatasetSerializer,
)
from datasets.usecases import (
    dataset_annotation_use_case,
    dataset_asset_use_case,
    dataset_class_use_case,
    dataset_use_case,
)
from packages.framework.controllers import ReadOnlyModelSetController


class DatasetSetController(ReadOnlyModelSetController):
    prefix = "datasets"

    queryset = dataset_use_case.optimize()
    serializer_class = DatasetSerializer
    filterset_class = DatasetFilter


class DatasetAssetSetController(ReadOnlyModelSetController):
    prefix = "assets"

    queryset = dataset_asset_use_case.optimize()
    serializer_class = DatasetAssetSerializer
    filterset_class = DatasetAssetFilter


class DatasetClassSetController(ReadOnlyModelSetController):
    prefix = "classes"

    queryset = dataset_class_use_case.optimize()
    serializer_class = DatasetClassSerializer
    filterset_class = DatasetClassFilter


class DatasetAnnotationSetController(ReadOnlyModelSetController):
    prefix = "annotations"

    queryset = dataset_annotation_use_case.optimize()
    serializer_class = DatasetAnnotationSerializer
    filterset_class = DatasetAnnotationFilter
