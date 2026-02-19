from datasets.models import Dataset, DatasetAnnotation, DatasetAsset, DatasetClass
from packages.kernel.adapters import FilterAdapter


class DatasetFilter(FilterAdapter):
    class Meta:
        model = Dataset
        fields = ("source", "status", "format", "subset", "modality")


class DatasetAssetFilter(FilterAdapter):

    class Meta:
        model = DatasetAsset
        fields = ("dataset",)


class DatasetClassFilter(FilterAdapter):

    class Meta:
        model = DatasetClass
        fields = ("dataset",)


class DatasetAnnotationFilter(FilterAdapter):

    class Meta:
        model = DatasetAnnotation
        fields = ("dataset", "asset", "cls")
