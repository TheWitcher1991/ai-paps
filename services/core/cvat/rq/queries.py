from cvat.rq.types import RqRequest
from cvat.rq.usecase import CVATRequestsUsecase
from cvat.shared.utils import cvat_paginated_list_to_dict
from packages.kernel.types import ExtendedRequest


class RequestQuery:

    def __init__(self):
        self.use_case = CVATRequestsUsecase()

    def filter(self, request: ExtendedRequest):
        page = int(request.query_params.get("page", 1))
        page_size = int(request.query_params.get("page_size", 25))

        request = RqRequest(
            page=page,
            page_size=page_size,
        )

        return cvat_paginated_list_to_dict(self.use_case.find_all(request))

    def get_by_id(self, pk: int):
        return self.use_case.find_one(pk)
