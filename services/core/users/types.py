from django.db import models

from packages.kernel.utils import t


class UserRole(models.TextChoices):
    ADMIN = "admin", t("Администратор")
    USER = "user", t("Пользователь")
    WORKER = "worker", t("Рабочий")


class MembershipRole(models.TextChoices):
    WORKER = "worker", t("Рабочий")
    SUPERVISOR = "supervisor", t("Супервайзер")
    MAINTAINER = "maintainer", t("Сопровождающий")
    OWNER = "owner", t("Владелец")
