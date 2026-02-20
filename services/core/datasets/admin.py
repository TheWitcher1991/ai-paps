from django.contrib import admin
from django.contrib.admin import ModelAdmin, TabularInline
from django.db.models import Count
from django.utils.html import format_html

from datasets.models import Dataset, DatasetAnnotation, DatasetAsset, DatasetClass


class DatasetClassInline(admin.TabularInline):
    model = DatasetClass
    extra = 0
    show_change_link = True


class DatasetAssetInline(admin.TabularInline):
    model = DatasetAsset
    extra = 0
    show_change_link = True
    readonly_fields = ("preview", "width", "height")

    def preview(self, obj):
        if obj.file:
            return format_html(
                '<img src="{}" width="120" style="object-fit:cover;" />',
                obj.file.url,
            )
        return "-"

    preview.short_description = "Preview"


@admin.register(Dataset)
class DatasetAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "name",
        "format",
        "source",
        "status",
        "assets_count",
        "classes_count",
        "annotations_count",
        "created_date",
    )

    list_filter = ("source", "status", "format", "subset", "created_date")
    search_fields = ("name", "source_id")
    readonly_fields = ("created_date", "updated_date")

    inlines = [DatasetClassInline, DatasetAssetInline]

    date_hierarchy = "created_date"
    ordering = ("-created_date",)

    def get_queryset(self, request):
        qs = super().get_queryset(request)
        return qs.annotate(
            _assets_count=Count("assets"),
            _classes_count=Count("classes"),
            _annotations_count=Count("annotations"),
        )

    def assets_count(self, obj):
        return obj._assets_count

    assets_count.admin_order_field = "_assets_count"

    def classes_count(self, obj):
        return obj._classes_count

    classes_count.admin_order_field = "_classes_count"

    def annotations_count(self, obj):
        return obj._annotations_count

    annotations_count.admin_order_field = "_annotations_count"


@admin.register(DatasetAsset)
class DatasetAssetAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "dataset",
        "preview",
        "width",
        "height",
        "annotations_count",
        "created_date",
    )

    list_filter = ("dataset", "created_date")
    search_fields = ("dataset__name", "source_id")
    readonly_fields = ("preview", "created_date", "updated_date")

    autocomplete_fields = ("dataset",)

    def get_queryset(self, request):
        qs = super().get_queryset(request)
        return qs.select_related("dataset").annotate(_annotations_count=Count("annotations"))

    def preview(self, obj):
        if obj.file:
            return format_html(
                '<img src="{}" width="120" style="object-fit:cover;" />',
                obj.file.url,
            )
        return "-"

    preview.short_description = "Preview"

    def annotations_count(self, obj):
        return obj._annotations_count

    annotations_count.admin_order_field = "_annotations_count"


@admin.register(DatasetClass)
class DatasetClassAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "name",
        "dataset",
        "class_id",
        "annotations_count",
        "created_date",
    )

    search_fields = ("name", "dataset__name")
    list_filter = ("dataset",)
    autocomplete_fields = ("dataset",)

    def get_queryset(self, request):
        qs = super().get_queryset(request)
        return qs.select_related("dataset").annotate(_annotations_count=Count("annotations"))

    def annotations_count(self, obj):
        return obj._annotations_count

    annotations_count.admin_order_field = "_annotations_count"


@admin.register(DatasetAnnotation)
class DatasetAnnotationAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "dataset",
        "asset",
        "cls",
        "area",
        "iscrowd",
    )

    list_filter = ("dataset", "cls", "iscrowd")
    search_fields = ("dataset__name",)
    autocomplete_fields = ("dataset", "asset", "cls")

    readonly_fields = ("dataset", "asset", "cls")

    def get_queryset(self, request):
        return super().get_queryset(request).select_related("dataset", "asset", "cls")
