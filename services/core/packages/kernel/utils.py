from datetime import datetime, timedelta
from typing import Type, Union

import jwt
from django.contrib.contenttypes.models import ContentType
from django.db.models import Model
from django.utils.translation import gettext_lazy

from config.settings import HASH_ALGORITHM, SECRET_KEY, SESSION_EXPIRE_DAYS, SESSION_EXPIRE_MINUTES


def get_content_type_for_model(obj: Union[Model, Type[Model]], for_concrete_model=True) -> ContentType:
    return ContentType.objects.get_for_model(obj, for_concrete_model)


def t(value: str) -> str:
    return gettext_lazy(value)


def get_user_from_context(context: dict):
    request = context.get("request")

    if hasattr(request, "user"):
        return request.user
    else:
        return None


def jwt_encode(user, is_refresh=False):
    """
    Кодировать JWT-токен
    """
    delta = timedelta(days=SESSION_EXPIRE_DAYS) if is_refresh else timedelta(minutes=SESSION_EXPIRE_MINUTES)

    dt = datetime.now() + delta

    token = jwt.encode(
        payload={"user_id": user.id, "exp": dt.timestamp(), "iat": datetime.now().timestamp()},
        key=SECRET_KEY,
        algorithm=HASH_ALGORITHM,
    )

    return token, dt


def jwt_decode(token) -> dict | None:
    """
    Декодировать JWT-токен
    """
    try:
        return jwt.decode(jwt=token, key=SECRET_KEY, algorithms=[HASH_ALGORITHM])
    except (jwt.ExpiredSignatureError, jwt.DecodeError, jwt.InvalidTokenError) as e:
        return None


def jwt_is_valid(token) -> bool:
    """
    Проверить валидность JWT-токена
    """
    return jwt_decode(token) is not None
