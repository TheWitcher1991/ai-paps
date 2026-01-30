from dataclasses import dataclass

from users.models import User


@dataclass(frozen=True)
class RequestContext:
    user: User
