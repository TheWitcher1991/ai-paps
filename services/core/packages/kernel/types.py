from enum import StrEnum, auto
from typing import TypedDict

from django.db import models
from django.http import HttpRequest
from rest_framework.request import wrap_attributeerrors
from rest_framework.views import Request

from packages.kernel.utils import t
from users.models import User


class DocumentStatus(models.TextChoices):
    DRAFT = "draft", t("Черновик")
    PUBLISHED = "published", t("Опубликован")


class BatchUnit(models.TextChoices):
    KG = "kg", t("Килограмм")
    L = "l", t("Литр")
    PCS = "pcs", t("Штука")
    PKG = "pkg", t("Упаковка")


class ExtendedRequest(HttpRequest, Request):

    @property
    def user(self) -> User:
        """
        Returns the user associated with the current request, as authenticated
        by the authentication classes provided to the request.
        """
        if not hasattr(self, "_user"):
            with wrap_attributeerrors():
                self._authenticate()
        return self._user


class LoggerResource(StrEnum):
    kernel = auto()


class JWTSignedSession(TypedDict):
    user: int
    refresh_token: str
    access_token: str
    session_expires: float
    access_expires: float
    token_type: str


class JWTRefreshSession(TypedDict):
    access_token: str
    access_expires: float


class JWTAuthenticated(TypedDict):
    user: int
    token: str
