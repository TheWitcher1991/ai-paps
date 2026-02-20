from typing import NewType

from django.db import models

from packages.kernel.utils import t

ModelId = NewType("ModelId", int)


class ModelSubset(models.TextChoices):
    CLASSIFICATION = "classification", t("Классификация")
    SEGMENTATION = "segmentation", t("Сегментация")
    DETECTION = "detection", t("Обнаружение")


class ModelFramework(models.TextChoices):
    TENSORFLOW = "tensorflow", t("Tensorflow")
    PYTORCH = "pytorch", t("Pytorch")
    ULTRALYTICS = "ultralytics", t("Ultralytics")


class ModelStatus(models.TextChoices):
    DRAFT = "draft", "Черновик"
    TRAINING = "training", "Обучается"
    READY = "ready", "Готова"
    DEPLOYED = "deployed", "Развернута"
    ARCHIVED = "archived", "Архив"


class TrainingStatus(models.TextChoices):
    PENDING = "pending", "Ожидает"
    QUEUED = "queued", "В очереди"
    RUNNING = "running", "Обучение"
    VALIDATING = "validating", "Валидация"
    FINISHED = "finished", "Завершено"
    FAILED = "failed", "Ошибка"
    CANCELLED = "cancelled", "Отменено"
