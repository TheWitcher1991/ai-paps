from functools import wraps
from typing import Callable, ParamSpec, TypeVar

from cvat_sdk.api_client import ApiException

from cvat.shared.exceptions import CVATServiceError
from cvat.shared.types import CVATHTTPResponse, CVATResponse

P = ParamSpec("P")
R = TypeVar("R")


def handle_cvat(fn: Callable[P, CVATHTTPResponse[R]]) -> Callable[P, CVATResponse[R]]:
    @wraps(fn)
    def wrapper(*args: P.args, **kwargs: P.kwargs) -> CVATResponse[R]:
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

    return wrapper
