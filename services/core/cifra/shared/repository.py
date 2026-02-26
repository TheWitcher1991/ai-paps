import json
from abc import ABC
from typing import Callable, ParamSpec, TypeVar, Any

from requests import Response

from cifra.shared.client import CifraClient
from cifra.shared.config import CifraConfig
from cifra.shared.exceptions import CifraServiceError, CifraApiException
from cifra.shared.types import CifraResponse, CifraRequest

R = TypeVar("R")
P = ParamSpec("P")


class CifraRepository(ABC):

    def __init__(self):
        self.config = CifraConfig()
        self.client = CifraClient(self.config)

    def params(self, request: CifraRequest):
        return request.to_query() if request else {}

    def execute(self, fn: Callable[..., Response], *args: Any, **kwargs: Any) -> CifraResponse:
        try:
            response = fn(*args, **kwargs)

            try:
                data = response.json() if response.content else None
            except json.JSONDecodeError:
                data = response.text

            return CifraResponse(
                data=data,
                status=response.status_code,
                headers=dict(response.headers),
            )
        except CifraApiException as e:
            raise CifraServiceError(
                message=e.reason,
                status_code=e.status,
            )
