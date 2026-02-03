from django.db import models

from packages.kernel.utils import t


class UserRole(models.TextChoices):
    ADMIN = "admin", t("Администратор")
    USER = "user", t("Оператор")
    WORKER = "worker", t("Рабочий")
