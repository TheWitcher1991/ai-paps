from abc import ABC, abstractmethod
from typing import Callable, ParamSpec, TypeVar

from cvat_sdk.api_client import ApiException, Configuration

from cvat.shared.client import CVATClient
from cvat.shared.config import CVATConfig
from cvat.shared.exceptions import CVATServiceError
from cvat.shared.types import CVATHTTPResponse, CVATRequest, CVATResponse

R = TypeVar("R")
P = ParamSpec("P")


class CVATRepository(ABC):

    def __init__(self):
        self.config = CVATConfig()
        self.client = CVATClient(
            Configuration(host=self.config.host, username=self.config.username, password=self.config.password)
        )

    @property
    def session(self):
        return self.client.get_api_instance()

    def find_all(self, *args, **kwargs): ...

    def find_one(self, *args, **kwargs): ...

    def create(self, *args, **kwargs): ...

    def update(self, *args, **kwargs): ...

    def delete(self, *args, **kwargs): ...

    def params(self, request: CVATRequest):
        return request.to_query() if request else {}

    def execute(self, fn: Callable[P, CVATHTTPResponse[R]], *args: P.args, **kwargs: P.kwargs) -> CVATResponse[R]:
        try:
            data, response = fn(*args, **kwargs)
            return CVATResponse(
                data=data,
                status=response.status,
                headers=dict(response.headers),
            )
        except ApiException as e:
            raise CVATServiceError(
                message=e.reason,
                status_code=e.status,
            )
