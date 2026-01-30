from rest_framework import status
from rest_framework.exceptions import APIException


class ModelNotCreatedException(Exception):
    """Возникает, когда модель не создана"""

    pass


class ModelNotUpdatedException(Exception):
    """Возникает, когда модель не обновляется"""

    pass


class ModelNotDeletedException(Exception):
    """Возникает, когда модель не удалена"""

    pass


class HTTPException(APIException):
    """Базовое исключение для сервисов"""

    status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
    default_detail = "Ошибка сервиса"
    default_code = "service_error"


class ServiceError(Exception):
    """Базовое исключение для сервисов"""
