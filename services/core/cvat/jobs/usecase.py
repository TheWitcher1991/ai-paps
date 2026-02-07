from typing import Optional

from cvat_sdk.api_client import ApiException

from cvat.jobs.repository import CVATJobRepository
from cvat.jobs.types import JobRead, JobReadRequest, PaginatedJobReadList
from cvat.rq.types import DataMetaRead, LabeledData, LabeledDataRequest, RqId
from cvat.shared.exceptions import CVATServiceError
from cvat.shared.types import CVATDatasetFormat
from cvat.shared.usecase import CVATUsecase


class CVATJobsUsecase(CVATUsecase):

    def __init__(self):
        self.repo = CVATJobRepository()

    def find_all(self, request: Optional[JobReadRequest] = None) -> PaginatedJobReadList:
        try:
            return self.repo.find_all(request)
        except ApiException as e:
            raise CVATServiceError(e.reason, e.status)

    def find_one(self, job_id: int) -> Optional[JobRead]:
        try:
            return self.repo.find_one(job_id)
        except ApiException as e:
            raise CVATServiceError(e.reason, e.status)

    def find_data_meta(self, job_id: int) -> Optional[DataMetaRead]:
        try:
            return self.repo.find_data_meta(job_id)
        except ApiException as e:
            raise CVATServiceError(e.reason, e.status)

    def find_annotations(self, job_id: int, request: Optional[LabeledDataRequest] = None) -> Optional[LabeledData]:
        try:
            return self.repo.find_annotations(job_id, request)
        except ApiException as e:
            raise CVATServiceError(e.reason, e.status)

    def export_dataset(
        self,
        job_id: int,
        format: CVATDatasetFormat,
        **kwargs,
    ) -> RqId:
        try:
            return self.repo.export_dataset(job_id, format, **kwargs)
        except ApiException as e:
            raise CVATServiceError(e.reason, e.status)
