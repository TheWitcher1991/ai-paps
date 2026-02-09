from cvat.labels.types import LabelRequest
from cvat.labels.usecase import CVATLabelsUsecase
from cvat.shared.utils import cvat_paginated_list_to_dict
from packages.kernel.types import ExtendedRequest


class LabelQuery:

    def __init__(self):
        self.use_case = CVATLabelsUsecase()

    def filter(self, request: ExtendedRequest):
        request = LabelRequest(
            page=request.query_params.get("page", 1), page_size=request.query_params.get("page_size", 25)
        )
        return cvat_paginated_list_to_dict(self.use_case.find_all(request))

    def get_by_id(self, pk: int):
        return self.use_case.find_one(pk)
