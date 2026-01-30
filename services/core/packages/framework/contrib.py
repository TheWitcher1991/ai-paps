from typing import Optional

from django.contrib.auth import authenticate as django_authenticate

from packages.kernel.types import ExtendedRequest
from users.models import User


def authenticate(request: ExtendedRequest, email: str, password: str) -> Optional[User]:
    return django_authenticate(request=request, email=email, password=password)
