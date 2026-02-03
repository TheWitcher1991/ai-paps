from typing import Optional

from cvat.jobs.types import JobRead, JobReadRequest, PaginatedJobReadList
from cvat.rq.types import RqId
from cvat.shared.repository import CVATRepository
from cvat.shared.types import CVATDatasetFormat


class CVATJobRepository(CVATRepository):

    def __init__(self):
        super().__init__()
        self.api = self.session.jobs_api

    def find_all(self, request: Optional[JobReadRequest] = None) -> PaginatedJobReadList:
        return self.execute(self.api.list, self.params(request)).data

    def find_one(self, job_id: int) -> Optional[JobRead]:
        return self.execute(self.api.retrieve, job_id)

    def export_dataset(
        self,
        job_id: int,
        format: CVATDatasetFormat,
        **kwargs,
    ) -> RqId:
        return self.execute(
            self.api.create_dataset_export,
            format,
            job_id,
            **kwargs,
        )
