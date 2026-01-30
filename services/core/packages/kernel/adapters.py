from django.contrib.auth.models import AbstractUser, UserManager
from django.db import models
from django.db.models import QuerySet
from django_filters.rest_framework import CharFilter, FilterSet
from rest_framework import serializers

from packages.kernel.utils import t


class ModelAdapter(models.Model):
    created_at = models.DateTimeField(t("Дата создания"), auto_now_add=True)
    updated_at = models.DateTimeField(t("Дата обновления"), auto_now=True)

    class Meta:
        abstract = True


class UserModelAdapter(AbstractUser):
    objects = UserManager()

    class Meta:
        abstract = True


class FilterAdapter(FilterSet):
    ordering = CharFilter(field_name="ordering", method="filter_ordering")

    def filter_ordering(self, queryset: QuerySet, name, value):
        return queryset.order_by(value)


class SerializerAdapter(serializers.Serializer):
    def to_dto(self, dto_class):
        return dto_class(**self.validated_data)


class ModelSerializerAdapter(serializers.ModelSerializer):
    def to_dto(self, dto_class):
        return dto_class(**self.validated_data)
