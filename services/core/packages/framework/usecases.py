from typing import Any, Generic, Optional, Type, TypeVar

from django.core.cache import cache
from django.db import models, transaction
from rest_framework.generics import get_object_or_404

from packages.framework.caching import clean_cache_by_tag
from packages.kernel.utils import get_content_type_for_model

T = TypeVar("T", bound=models.Model)
K = TypeVar("K", bound=int)


class UseCaseAdapter(Generic[T, K]):
    """
    Базовый адаптер для работы с моделями Django.
    """

    def __init__(self, model: Type[T]):
        self.model: Type[T] = model

    @property
    def DoesNotExist(self):
        return self.model.DoesNotExist

    @property
    def objects(self) -> models.QuerySet[T]:
        return self.model.objects

    def optimize(self) -> models.QuerySet[T]:
        raise NotImplementedError()

    def content_type(self):
        return get_content_type_for_model(self.model)

    def count(self) -> int:
        return self.model.objects.count()

    def get_queryset(self) -> models.QuerySet[T]:
        return self.model.objects.get_queryset()

    def all(self) -> models.QuerySet[T]:
        return self.get_queryset().all()

    def filter(self, *args, **kwargs) -> models.QuerySet[T]:
        return self.get_queryset().filter(*args, **kwargs)

    def exclude(self, *args, **kwargs) -> models.QuerySet[T]:
        return self.get_queryset().exclude(*args, **kwargs)

    def get_by_id(self, pk: K) -> T:
        return self.get_queryset().get(id=pk)

    @transaction.atomic
    def get_by_id_for_update(self, pk: K) -> T:
        return self.get_queryset().select_for_update(skip_locked=True).get(id=pk)

    def get_by_key(self, key: str, value: any) -> T:
        return self.get_queryset().get(**{key: value})

    def get(self, **kwargs) -> T:
        return self.get_queryset().get(**kwargs)

    def ids(self, queryset: models.QuerySet) -> list[int]:
        return list(queryset.values_list("id", flat=True))

    def get_object_or_404(self, pk: int) -> T:
        return get_object_or_404(self.model, pk=pk)

    def create(self, **kwargs) -> T:
        return self.model.objects.create(**kwargs)

    def update(self, pk: K, **kwargs) -> int:
        return self.get_queryset().filter(id=pk).update(**kwargs)

    def get_or_create(self, **kwargs) -> models.QuerySet[T]:
        return self.get_queryset().get_or_create(**kwargs)

    def update_or_create(self, **kwargs) -> models.QuerySet[T]:
        return self.get_queryset().update_or_create(**kwargs)

    def delete(self, pk: K) -> tuple[int, dict]:
        return self.get_queryset().filter(id=pk).delete()


class RepositoryAdapter(UseCaseAdapter[T, K]):
    pass


class CacheUseCaseAdapter:
    """
    Базовый адаптер с кэшированием.
    """

    cache_prefix: str = "service"
    cache_queryset_key: str = "queryset"
    cache_object_key: str = "object"
    cache_retrieve_key: str = "retrieve"
    cache_prefix_delimiter: str = "_"

    def get_queryset_cache_key(self) -> str:
        """
        Генерирует ключ для кэша для набора данных.
        """
        return f"{self.cache_prefix}{self.cache_prefix_delimiter}{self.cache_queryset_key}"

    def get_object_cache_key(self, pk: int) -> str:
        """
        Генерирует ключ для кэша для объекта.
        """
        return (
            f"{self.cache_prefix}{self.cache_prefix_delimiter}{self.cache_object_key}{self.cache_prefix_delimiter}{pk}"
        )

    def get_retrieve_cache_key(self, pk: int) -> str:
        """
        Генерирует ключ для кэша для объекта.
        """
        return f"{self.cache_prefix}{self.cache_prefix_delimiter}{self.cache_retrieve_key}{self.cache_prefix_delimiter}{pk}"

    def get_cache_key(self, key: str) -> str:
        """
        Генерирует полный ключ для кэша.
        """
        return f"{self.cache_prefix}{self.cache_prefix_delimiter}{key}"

    def set_cache(self, key: str, value: Any, timeout: Optional[int] = None):
        """
        Устанавливает значение в кэше.
        """
        cache.set(self.get_cache_key(key), value, timeout)

    def get_cache(self, key: str) -> Optional[Any]:
        """
        Получает значение из кэша.
        """
        return cache.get(self.get_cache_key(key))

    def delete_cache(self, key: str):
        """
        Удаляет конкретный ключ из кэша.
        """
        cache.delete(self.get_cache_key(key))

    def delete_global_cache(self):
        """
        Удаляет все ключи, которые начинаются с self.cache_prefix.
        """
        clean_cache_by_tag(f"{self.cache_prefix}")

    def delete_queryset_cache(self):
        """
        Удаляет все ключи, которые начинаются с self.cache_queryset_key.
        """
        clean_cache_by_tag(f"{self.cache_prefix}{self.cache_prefix_delimiter}{self.cache_queryset_key}")

    def delete_object_cache(self, pk: int):
        """
        Удаляет все ключи, которые начинаются с self.cache_object_key.
        """
        clean_cache_by_tag(
            f"{self.cache_prefix}{self.cache_prefix_delimiter}{self.cache_object_key}{self.cache_prefix_delimiter}{pk}"
        )

    def delete_retrieve_cache(self, pk: int):
        """
        Удаляет все ключи, которые начинаются с self.cache_retrieve_key.
        """
        clean_cache_by_tag(
            f"{self.cache_prefix}{self.cache_prefix_delimiter}{self.cache_retrieve_key}{self.cache_prefix_delimiter}{pk}"
        )

    def delete_user_queryset_cache(self, user_id: int):
        """
        Удаляет все ключи, которые начинаются с self.cache_queryset_key.
        """
        clean_cache_by_tag(
            f"{self.cache_prefix}{self.cache_prefix_delimiter}{self.cache_queryset_key}{self.cache_prefix_delimiter}{user_id}"
        )

    def delete_user_object_cache(self, user_id: int, pk: int):
        """
        Удаляет все ключи, которые начинаются с self.cache_object_key.
        """
        clean_cache_by_tag(
            f"{self.cache_prefix}{self.cache_prefix_delimiter}{self.cache_object_key}{self.cache_prefix_delimiter}{pk}{self.cache_prefix_delimiter}{user_id}"
        )

    def delete_user_retrieve_cache(self, user_id: int, pk: int):
        """
        Удаляет все ключи, которые начинаются с self.cache_retrieve_key.
        """
        clean_cache_by_tag(
            f"{self.cache_prefix}{self.cache_prefix_delimiter}{self.cache_retrieve_key}{self.cache_prefix_delimiter}{pk}{self.cache_prefix_delimiter}{user_id}"
        )


class CacheModelUseCaseAdapter(UseCaseAdapter[T, K], CacheUseCaseAdapter):
    pass
