from cvat.rq.types import RqRequest
from cvat.rq.usecase import CVATRequestsUsecase
from cvat.shared.utils import cvat_paginated_list_to_dict
from packages.kernel.types import ExtendedRequest


class RequestQuery:

    def __init__(self):
        self.use_case = CVATRequestsUsecase()

    def filter(self, request: ExtendedRequest):
        request = RqRequest(
            page=request.query_params.get("page", 1), page_size=request.query_params.get("page_size", 25)
        )
        return cvat_paginated_list_to_dict(self.use_case.find_all(request))

    def get_by_id(self, pk: int):
        return self.use_case.find_one(pk)
