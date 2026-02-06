from typing import Optional

from cvat_sdk.api_client import ApiException

from cvat.rq.repository import CVATRequestRepository
from cvat.rq.types import PaginatedRequestList, Request, RqRequest
from cvat.shared.exceptions import CVATServiceError
from cvat.shared.usecase import CVATUsecase


class CVATRequestsUsecase(CVATUsecase):

    def __init__(self):
        self.repo = CVATRequestRepository()

    def find_all(self, request: Optional[RqRequest] = None) -> PaginatedRequestList:
        try:
            return self.repo.find_all(request)
        except ApiException as e:
            raise CVATServiceError(e.reason, e.status)

    def find_one(self, request_id: int) -> Optional[Request]:
        try:
            return self.repo.find_one(request_id)
        except ApiException as e:
            raise CVATServiceError(e.reason, e.status)

    def cancel(self, request_id: int) -> None:
        try:
            return self.repo.cancel(request_id)
        except ApiException as e:
            raise CVATServiceError(e.reason, e.status)
