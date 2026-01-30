from django.core.files.storage import default_storage
from django.db import models
from rest_framework import serializers

from config import settings


class NullableIntegerField(serializers.IntegerField):
    def to_internal_value(self, data):
        if data in ("", None):
            return None
        return super().to_internal_value(data)


class ContentTypeField(serializers.RelatedField):
    def to_representation(self, value):
        if not value:
            return None
        return {
            "id": value.id,
            "app_label": value.app_label,
            "model": value.model,
        }


class S3PrivateFileField(models.FileField):
    def __init__(self, verbose_name=None, name=None, upload_to="", storage=None, **kwargs):
        storage = default_storage
        # if hasattr(settings, "AWS_PRIVATE_MEDIA_LOCATION") and settings.USE_S3:
        #    storage = S3PrivateStorage()
        super().__init__(verbose_name, name, upload_to, storage, **kwargs)


class S3PublicFileField(models.FileField):
    def __init__(self, verbose_name=None, name=None, upload_to="", storage=None, **kwargs):
        storage = default_storage
        # if hasattr(settings, "AWS_PUBLIC_MEDIA_LOCATION") and settings.USE_S3:
        #    storage = S3MediaStorage()
        super().__init__(verbose_name, name, upload_to, storage, **kwargs)
