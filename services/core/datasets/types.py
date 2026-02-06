from django.db import models

from packages.kernel.utils import t


class DatasetSource(models.TextChoices):
    PROJECTS = "projects", t("Проекты")
    TASKS = "tasks", t("Задачи")
    JOBS = "jobs", t("Работы")


class DatasetStatus(models.TextChoices):
    UPLOADED = "uploaded", t("Загружен"),
    ANNOTATION = "annotation", t("Размечается")
    COMPLETED = "completed", t("Завершен")


class AnnotationStatus(models.TextChoices):
    NOT_ANNOTATED = "not_annotated", t("Не размечен")
    IN_PROGRESS = "in_progress", t("В работе")
    ANNOTATION = "annotation", t("Размечается")
    ANNOTATED = "annotated", t("Размечен")
    VALIDATION = "validation", t("Проверяется")
    REVIEWED = "reviewed", t("Проверен")
    COMPLETED = "completed", t("Завершен")
