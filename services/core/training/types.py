from typing import NewType

from django.db import models

from packages.kernel.utils import t

ModelId = NewType("ModelId", int)
TrainingId = NewType("TrainingId", int)


class ModelSubset(models.TextChoices):
    CLASSIFICATION = "classification", t("Классификация")
    SEGMENTATION = "segmentation", t("Сегментация")
    DETECTION = "detection", t("Обнаружение")


class ModelFramework(models.TextChoices):
    TENSORFLOW = "tensorflow", t("Tensorflow")
    PYTORCH = "pytorch", t("Pytorch")
    ULTRALYTICS = "ultralytics", t("Ultralytics")


class ModelStatus(models.TextChoices):
    READY = "ready", t("Готова")
    DEPLOYED = "deployed", t("Развернута")
    TRAINING = "training", t("Обучается")
    ARCHIVED = "archived", t("Архив")


class ModelArchitecture(models.TextChoices):
    resnet50 = "resnet50", t("resnet50")
    resnet101 = "resnet101", t("resnet101")
    resnet152 = "resnet152", t("resnet152")
    deeplabv3 = "deeplabv3", t("deeplabv3")
    unet = "unet", t("unet")
    yolo = "yolo", t("yolo")


class TrainingStatus(models.TextChoices):
    PENDING = "pending", t("Ожидает")
    QUEUED = "queued", t("В очереди")
    RUNNING = "running", t("Обучение")
    VALIDATING = "validating", t("Валидация")
    FINISHED = "finished", t("Завершено")
    FAILED = "failed", t("Ошибка")
    CANCELLED = "cancelled", t("Отменено")


class TrainingOptimizer(models.TextChoices):
    ADAM = "adam", t("Adam")
    ADAMW = "adamw", t("AdamW")
    SGD = "sgd", t("SGD")
    RMSPROP = "rmsprop", t("RMSprop")


class TrainingLossFunction(models.TextChoices):
    BCE = "BCE", "BCE"
    BCE_WITH_LOGITS = "BCEWithLogits", t("BCEWithLogits")
    CROSS_ENTROPY = "CrossEntropy", t("CrossEntropy")
    MSE = "MSE", t("MSE")


class TrainingScheduler(models.TextChoices):
    STEP = "StepLR", t("StepLR")
    EXPONENTIAL = "ExponentialLR", t("ExponentialLR")
    PLATEAU = "ReduceLROnPlateau", t("ReduceLROnPlateau")
    COSINE = "CosineAnnealingLR", t("CosineAnnealingLR")
    COSINE_WARMUP = "CosineAnnealingWarmRestarts", t("CosineAnnealingWarmRestarts")
