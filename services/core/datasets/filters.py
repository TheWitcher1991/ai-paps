from datasets.models import Dataset, DatasetAnnotation, DatasetAsset, DatasetClass
from packages.kernel.adapters import FilterAdapter


class DatasetFilter(FilterAdapter):

    class Meta:
        class Meta:
            model = Dataset
            fields = ("source", "status", "format")


class DatasetAssetFilter(FilterAdapter):

    class Meta:
        class Meta:
            model = DatasetAsset
            fields = ("dataset",)


class DatasetClassFilter(FilterAdapter):

    class Meta:
        class Meta:
            model = DatasetClass
            fields = ("dataset",)


class DatasetAnnotationFilter(FilterAdapter):

    class Meta:
        class Meta:
            model = DatasetAnnotation
            fields = ("dataset", "asset", "cls")
