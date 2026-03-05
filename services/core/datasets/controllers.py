from rest_framework.decorators import action

from datasets.filters import DatasetAnnotationFilter, DatasetAssetFilter, DatasetClassFilter, DatasetFilter
from datasets.serializers import (
    DatasetAnnotationSerializer,
    DatasetAssetSerializer,
    DatasetClassSerializer,
    DatasetSerializer,
    MergeDatasetsSerializer,
)
from datasets.usecases import (
    dataset_annotation_use_case,
    dataset_asset_use_case,
    dataset_class_use_case,
    dataset_use_case,
    merge_datasets_use_case,
)
from packages.framework.controllers import ReadOnlyModelSetController


class DatasetSetController(ReadOnlyModelSetController):
    prefix = "datasets"

    queryset = dataset_use_case.optimize()
    serializer_class = DatasetSerializer
    filterset_class = DatasetFilter

    @action(detail=False, methods=["post"], url_path="merge", serializer_class=MergeDatasetsSerializer)
    def merge(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        name = serializer.validated_data["name"]
        description = serializer.validated_data.get("description", "")
        dataset_ids = serializer.validated_data["dataset_ids"]

        merged_dataset = merge_datasets_use_case.execute(
            name=name,
            description=description,
            dataset_ids=dataset_ids,
        )

        return self.get_response(merged_dataset, serializer=DatasetSerializer)


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
