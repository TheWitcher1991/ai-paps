from django.contrib.auth.validators import UnicodeUsernameValidator
from django.db import models

from config.settings import CHAR_MAX_LENGTH
from packages.kernel.adapters import UserModelAdapter
from packages.kernel.utils import t
from users.managers import UserManager
from users.types import UserRole


class User(UserModelAdapter):
    username_validator = UnicodeUsernameValidator()

    cvat_id = models.IntegerField(t("CVAT Id"), unique=True)
    email = models.EmailField(t("Email"), max_length=CHAR_MAX_LENGTH, unique=True)
    username = models.CharField(
        t("Username"),
        max_length=150,
        unique=True,
        validators=[username_validator],
    )
    first_name = models.CharField(t("Имя"), max_length=CHAR_MAX_LENGTH)
    last_name = models.CharField(t("Фамилия"), max_length=CHAR_MAX_LENGTH)
    surname = models.CharField(t("Отчество"), max_length=CHAR_MAX_LENGTH, blank=True, null=True)
    date_joined = models.DateTimeField(t("Дата регистрации"), auto_now_add=True)
    last_synced_at = models.DateTimeField(auto_now=True)
    role = models.CharField(t("Роль"), max_length=20, choices=UserRole.choices, default=UserRole.USER)
    has_analytics_access = models.BooleanField()
    url = models.URLField(blank=True, null=True)

    objects = UserManager()

    class Meta:
        ordering = ("-date_joined",)
        verbose_name = t("Пользователь")
        verbose_name_plural = t("Пользователи")
