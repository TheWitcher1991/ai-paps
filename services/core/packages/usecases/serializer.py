from ast import Dict
from typing import Any, Optional, Type

from rest_framework.fields import empty

from packages.kernel.adapters import SerializerAdapter


class SerializerUseCase:
    """
    Базовый use case для работы с сериализаторами.
    Позволяет валидировать и сохранять данные через абстрактный SerializerAdapter.
    """

    def _get_valid_serializer(
        self,
        serializer_class: Type[SerializerAdapter],
        instance: Optional[Any] = None,
        data: Any = empty,
        context: Optional[Dict] = None,
        partial: bool = False,
    ) -> SerializerAdapter:
        serializer = serializer_class(instance=instance, data=data, context=context, partial=partial)
        serializer.is_valid(raise_exception=True)
        return serializer

    def save(
        self,
        serializer_class: Type[SerializerAdapter],
        instance: Optional[Any] = None,
        data: Any = empty,
        context: Optional[Dict] = None,
        partial: bool = False,
    ) -> SerializerAdapter:
        serializer = self._get_valid_serializer(
            serializer_class, instance=instance, data=data, context=context, partial=partial
        )
        serializer.save()
        return serializer

    def is_valid(
        self,
        serializer_class: Type[SerializerAdapter],
        instance: Optional[Any] = None,
        data: Any = empty,
        context: Optional[Dict] = None,
        partial: bool = False,
    ) -> SerializerAdapter:
        return self._get_valid_serializer(serializer_class, instance=None, data=data, context=context, partial=partial)


serializer_use_case = SerializerUseCase()
