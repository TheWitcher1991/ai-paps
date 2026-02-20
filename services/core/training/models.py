from django.db import models

from packages.framework.fields import S3PrivateFileField
from packages.kernel.adapters import ModelAdapter
from packages.kernel.utils import t
from training.types import ModelFramework, ModelSubset, TrainingStatus


class Model(ModelAdapter):
    name = models.CharField(t("Название"), max_length=255)
    alias = models.CharField(t("Алиас"), max_length=255)
    description = models.TextField(t("Описание"), blank=True, null=True)
    file = S3PrivateFileField(upload_to="models/")
    subset = models.CharField(t("Задача"), choices=ModelSubset.choices, max_length=32)
    framework = models.CharField(t("Фреймворк"), choices=ModelFramework.choices, max_length=32)
    deployed = models.BooleanField(t("Развернута"), default=False)

    class Meta:
        ordering = ("-created_date",)
        verbose_name = t("Модель")
        verbose_name_plural = t("Модели")


class Training(ModelAdapter):
    dataset = models.ForeignKey("datasets.Dataset", on_delete=models.CASCADE, related_name="training")
    model = models.ForeignKey(Model, on_delete=models.CASCADE, related_name="training")

    train_split = models.FloatField(default=0.7)
    val_split = models.FloatField(default=0.2)
    test_split = models.FloatField(default=0.1)

    epochs = models.IntegerField(default=20)

    train_batch_size = models.IntegerField(default=4)
    val_batch_size = models.IntegerField(default=2)

    learning_rate = models.FloatField(default=0.0001)

    image_width = models.IntegerField(default=512)
    image_height = models.IntegerField(default=512)

    seed = models.IntegerField(default=42)

    class Meta:
        ordering = ("-created_date",)
        verbose_name = t("Обучение модели")
        verbose_name_plural = t("Обучение моделей")


class TrainingRun(ModelAdapter):
    training = models.ForeignKey(Training, on_delete=models.CASCADE, related_name="runs")

    status = models.CharField(max_length=32, choices=TrainingStatus.choices, default=TrainingStatus.PENDING)

    current_epoch = models.IntegerField(default=0)

    train_loss = models.FloatField(null=True, blank=True)
    val_loss = models.FloatField(null=True, blank=True)
    test_loss = models.FloatField(null=True, blank=True)

    started_date = models.DateTimeField(null=True, blank=True)
    finished_date = models.DateTimeField(null=True, blank=True)

    class Meta:
        ordering = ("-created_date",)
        verbose_name = t("Запуск обучения модели")
        verbose_name_plural = t("Запуск обучения моделей")
