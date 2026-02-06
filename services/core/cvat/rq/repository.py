from typing import Optional

from cvat.rq.types import PaginatedRequestList, Request, RqRequest
from cvat.shared.repository import CVATRepository


class CVATRequestRepository(CVATRepository):

    def __init__(self):
        super().__init__()
        self.api = self.session.requests_api

    def find_all(self, request: Optional[RqRequest] = None) -> PaginatedRequestList:
        return self.execute(self.api.list, **self.params(request)).data

    def find_one(self, request_id: int) -> Optional[Request]:
        return self.execute(self.api.retrieve, request_id).data

    def cancel(
        self,
        request_id: int,
        **kwargs,
    ) -> None:
        return self.execute(
            self.api.create_cancel(),
            id=request_id,
            **kwargs,
        ).data
