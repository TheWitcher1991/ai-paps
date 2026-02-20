from django.db import models

from datasets.types import DatasetFormat, DatasetModality, DatasetSource, DatasetStatus, DatasetSubset
from packages.framework.fields import S3PrivateFileField
from packages.kernel.adapters import ModelAdapter
from packages.kernel.utils import t


class Dataset(ModelAdapter):
    name = models.CharField(t("Название"), max_length=255)
    description = models.TextField(t("Описание"), blank=True, null=True)
    source_id = models.IntegerField(t("Source ID"))
    source = models.CharField(t("Источник"), choices=DatasetSource.choices, max_length=32)
    status = models.CharField(t("Статус"), choices=DatasetStatus.choices, default=DatasetStatus.UPLOADED, max_length=32)
    format = models.CharField(t("Формат"), choices=DatasetFormat.choices, max_length=128)
    subset = models.CharField(t("Для чего"), choices=DatasetSubset.choices, default=DatasetSubset.TRAIN, max_length=32)
    modality = models.CharField(
        t("Модальность"), choices=DatasetModality.choices, default=DatasetModality.RGB, max_length=32
    )

    class Meta:
        ordering = ("-created_date",)
        verbose_name = t("Датасет")
        verbose_name_plural = t("Датасеты")


class DatasetAsset(ModelAdapter):
    dataset = models.ForeignKey(Dataset, on_delete=models.CASCADE, related_name="assets")
    file = S3PrivateFileField(upload_to="datasets/images")
    width = models.IntegerField(t("Ширина"))
    height = models.IntegerField(t("Высота"))
    source_id = models.IntegerField(t("Source ID"))

    class Meta:
        ordering = ("-created_date",)
        verbose_name = t("Ассет датасета")
        verbose_name_plural = t("Ассеты датасета")


class DatasetClass(ModelAdapter):
    dataset = models.ForeignKey(Dataset, on_delete=models.CASCADE, related_name="classes")
    name = models.CharField(t("Название"), max_length=255)
    source_id = models.IntegerField(t("Source ID"))

    class Meta:
        ordering = ("-created_date",)
        verbose_name = t("Класс датасета")
        verbose_name_plural = t("Классы датасета")


class DatasetAnnotation(models.Model):
    dataset = models.ForeignKey(Dataset, on_delete=models.CASCADE, related_name="annotations")
    asset = models.ForeignKey(DatasetAsset, on_delete=models.CASCADE, related_name="annotations")
    cls = models.ForeignKey(DatasetClass, on_delete=models.CASCADE, related_name="annotations")
    segmentation = models.JSONField(t("Сегментация"))
    bbox = models.JSONField(t("Бокс"))
    area = models.FloatField(t("Площадь"))
    iscrowd = models.BooleanField(t("Скульптура"), default=False)

    class Meta:
        verbose_name = t("Аннотация")
        verbose_name_plural = t("Аннотации")
