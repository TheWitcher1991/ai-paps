from cvat_sdk.api_client import ApiException

from cvat.jobs.repository import CVATJobRepository
from cvat.jobs.types import JobListResponse, JobResponse, JobsRequest
from cvat.shared.exceptions import CVATServiceError
from cvat.shared.types import CVATDatasetFormat, RqResponse
from cvat.shared.usecase import CVATUsecase


class CVATJobsUsecase(CVATUsecase):

    def __init__(self):
        self.repo = CVATJobRepository()

    def find_all(self, request: JobsRequest) -> JobListResponse:
        try:
            return self.repo.find_all(request)
        except ApiException as e:
            raise CVATServiceError(e.reason, e.status)

    def find_one(self, job_id: int) -> JobResponse:
        try:
            return self.repo.find_one(job_id)
        except ApiException as e:
            raise CVATServiceError(e.reason, e.status)

    def export_dataset(
        self,
        job_id: int,
        format: CVATDatasetFormat,
        **kwargs,
    ) -> RqResponse:
        try:
            return self.repo.export_dataset(job_id, format, **kwargs)
        except ApiException as e:
            raise CVATServiceError(e.reason, e.status)
