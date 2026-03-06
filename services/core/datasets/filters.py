from datasets.models import Dataset, DatasetAnnotation, DatasetAsset, DatasetClass
from packages.kernel.adapters import FilterAdapter
from django_filters.rest_framework import CharFilter
from django.db.models import QuerySet

class DatasetFilter(FilterAdapter):
    class Meta:
        model = Dataset
        fields = ("source", "status", "format", "subset", "modality")


class DatasetAssetFilter(FilterAdapter):
    dataset = CharFilter(field_name="dataset", method="filter_dataset")

    class Meta:
        model = DatasetAsset
        fields = ("file_format",)

    def filter_dataset(self, queryset: QuerySet, name, value):
        return queryset.filter(dataset_id=value)


class DatasetClassFilter(FilterAdapter):

    class Meta:
        model = DatasetClass
        fields = ("dataset",)


class DatasetAnnotationFilter(FilterAdapter):

    class Meta:
        model = DatasetAnnotation
        fields = ("dataset", "asset", "cls")
