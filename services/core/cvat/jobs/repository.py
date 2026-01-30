from cvat.jobs.types import JobListResponse, JobResponse, JobsRequest
from cvat.shared.repository import CVATRepository
from cvat.shared.types import CVATDatasetFormat, RqResponse


class CVATJobRepository(CVATRepository):

    def __init__(self):
        super().__init__()
        self.api = self.session.jobs_api

    def find_all(self, request: JobsRequest) -> JobListResponse:
        return self.api.list(request)

    def find_one(self, job_id: int) -> JobResponse:
        return self.api.retrieve(job_id)

    def export_dataset(
        self,
        job_id: int,
        format: CVATDatasetFormat,
        **kwargs,
    ) -> RqResponse:
        return self.api.create_dataset_export(
            format,
            job_id,
            **kwargs,
        )
