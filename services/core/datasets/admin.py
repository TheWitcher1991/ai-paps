from django.contrib import admin
from django.contrib.admin import ModelAdmin, TabularInline

from datasets.models import Dataset, DatasetAnnotation, DatasetAsset, DatasetClass


class DatasetAssetInline(TabularInline):
    model = DatasetAsset
    extra = 1


class DatasetClassInline(TabularInline):
    model = DatasetClass
    extra = 1


class DatasetAnnotationInline(TabularInline):
    model = DatasetAnnotation
    extra = 1


@admin.register(Dataset)
class DatasetAdmin(ModelAdmin):
    inlines = [DatasetClassInline, DatasetAssetInline]


@admin.register(DatasetAsset)
class DatasetAssetAdmin(ModelAdmin):
    inlines = [DatasetAnnotationInline]


@admin.register(DatasetClass)
class DatasetClassAdmin(ModelAdmin):
    pass


@admin.register(DatasetAnnotation)
class DatasetAnnotationAdmin(ModelAdmin):
    pass
