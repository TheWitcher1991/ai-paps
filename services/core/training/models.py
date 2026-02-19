from django.db import models

from packages.framework.fields import S3PrivateFileField
from packages.kernel.adapters import ModelAdapter
from packages.kernel.utils import t
from training.types import ModelFramework, ModelSubset


class Model(ModelAdapter):
    name = models.CharField(t("Название"), max_length=255)
    alias = models.CharField(t("Алиас"), max_length=255)
    description = models.TextField(t("Описание"), blank=True, null=True)
    file = S3PrivateFileField(upload_to="models/")
    subset = models.CharField(t("Задача"), choices=ModelSubset.choices, max_length=32)
    framework = models.CharField(t("Фреймворк"), choices=ModelFramework.choices, max_length=32)
    deployed = models.BooleanField(t("Развернута"), default=False)

    class Meta:
        ordering = ("-created_at",)
        verbose_name = t("Модель")
        verbose_name_plural = t("Модели")
