from cvat.jobs.types import JobReadRequest
from cvat.jobs.usecase import CVATJobsUsecase
from packages.kernel.types import ExtendedRequest


class JobsQuery:

    def __init__(self):
        self.use_case = CVATJobsUsecase()

    def filter(self, request: ExtendedRequest):
        request = JobReadRequest(
            page=request.query_params.get("page", 1), page_size=request.query_params.get("page_size", 25)
        )
        return self.use_case.find_all(request)

    def get_by_id(self, pk: int):
        return self.use_case.find_one(pk)
