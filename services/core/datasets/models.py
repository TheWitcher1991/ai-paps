from django.db import models

from datasets.types import DatasetSource, DatasetStatus
from packages.framework.fields import S3PrivateFileField
from packages.kernel.adapters import ModelAdapter
from packages.kernel.utils import t


class Dataset(ModelAdapter):
    name = models.CharField(max_length=255)
    source_id = models.IntegerField(t("Source ID"))
    source = models.CharField(t("Источник"), choices=DatasetSource.choices, max_length=32)
    status = models.CharField(
        t("Источник"), choices=DatasetStatus.choices, default=DatasetStatus.UPLOADED, max_length=32
    )

    class Meta:
        ordering = ("-created_at",)
        verbose_name = t("Датасет")
        verbose_name_plural = t("Датасеты")


class DatasetFile(ModelAdapter):
    dataset = models.ForeignKey(Dataset, on_delete=models.CASCADE, related_name="files")
    file = S3PrivateFileField(upload_to="datasets/")

    source_id = models.IntegerField(t("Source ID"))

    class Meta:
        ordering = ("-created_at",)
        verbose_name = t("Файл датасета")
        verbose_name_plural = t("Файлы датасета")
