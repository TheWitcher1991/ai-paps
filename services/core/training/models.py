from django.db import models

from packages.framework.fields import S3PrivateFileField
from packages.kernel.adapters import ModelAdapter
from packages.kernel.utils import t
from training.types import (
    ModelArchitecture,
    ModelFramework,
    ModelStatus,
    ModelSubset,
    TrainingLossFunction,
    TrainingOptimizer,
    TrainingScheduler,
    TrainingStatus,
)


class Model(ModelAdapter):
    name = models.CharField(t("Название"), max_length=255)
    alias = models.CharField(t("Алиас"), max_length=255)
    description = models.TextField(t("Описание"), blank=True, null=True)
    file = S3PrivateFileField(upload_to="models/")
    subset = models.CharField(t("Задача"), choices=ModelSubset.choices, max_length=32)
    framework = models.CharField(t("Фреймворк"), choices=ModelFramework.choices, max_length=32)
    architecture = models.CharField(t("Архитектура"), choices=ModelArchitecture.choices, max_length=32)
    status = models.CharField(t("Статус"), choices=ModelStatus.choices, default=ModelStatus.READY, max_length=32)

    class Meta:
        ordering = ("-created_date",)
        verbose_name = t("Модель")
        verbose_name_plural = t("Модели")


class Training(ModelAdapter):
    name = models.CharField(t("Название"), max_length=255)
    description = models.TextField(t("Описание"), blank=True, null=True)
    model = models.ForeignKey(Model, on_delete=models.CASCADE, related_name="training")

    class Meta:
        ordering = ("-created_date",)
        verbose_name = t("Обучение модели")
        verbose_name_plural = t("Обучение моделей")


class TrainingConfig(ModelAdapter):
    lr_scheduler = models.CharField(
        t("Схема обучения"), choices=TrainingScheduler.choices, default=TrainingScheduler.PLATEAU, max_length=32
    )
    optimizer = models.CharField(
        t("Оптимизатор"), choices=TrainingOptimizer, default=TrainingOptimizer.ADAM, max_length=32
    )
    loss_function = models.CharField(
        t("Функция потерь"), choices=TrainingLossFunction.choices, default=TrainingLossFunction.BCE, max_length=32
    )

    epochs = models.IntegerField(t("Эпох"), default=20)

    early_stopping_patience = models.IntegerField(t("Патейнс"), default=5)

    train_batch_size = models.IntegerField(t("Размер батча"), default=4)
    valid_batch_size = models.IntegerField(t("Размер валидационного батча"), default=2)

    valid_ratio = models.FloatField(t("Размер валидационного набора"), default=0.2)
    test_ratio = models.FloatField(t("Размер тестового набора"), default=0.1)

    learning_rate = models.FloatField(t("Скорость обучения"), default=0.0001)

    image_width = models.IntegerField(t("Ширина изображения"), default=512)
    image_height = models.IntegerField(t("Высота изображения"), default=512)

    seed = models.IntegerField(t("Сид"), default=42)

    use_flip = models.BooleanField(t("Использовать поворот"), default=False)

    rotation_degrees = models.IntegerField(t("Поворот"), default=0)

    hsv_v = models.IntegerField(t("Яркость"), default=0)
    hsv_s = models.IntegerField(t("Насыщенность"), default=0)
    hsv_h = models.IntegerField(t("Оттенок"), default=0)

    class Meta:
        ordering = ("-created_date",)
        verbose_name = t("Конфигурация обучения модели")
        verbose_name_plural = t("Конфигурации обучения моделей")


class TrainingDataset(ModelAdapter):
    training = models.ForeignKey(Training, on_delete=models.CASCADE, related_name="datasets")
    dataset = models.ForeignKey("datasets.Dataset", on_delete=models.CASCADE)

    class Meta:
        ordering = ("-created_date",)
        verbose_name = t("Набор данных для обучения модели")
        verbose_name_plural = t("Наборы данных для обучения моделей")


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
