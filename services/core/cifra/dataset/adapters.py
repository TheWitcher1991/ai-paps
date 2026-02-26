from typing import Optional

from cvat_sdk.api_client import ApiException

from cvat.projects.abstract import ProjectAbstract
from cvat.projects.repository import CVATProjectRepository
from cvat.projects.types import PaginatedProjectReadList, ProjectRead, ProjectReadRequest
from cvat.rq.types import RqId
from cvat.shared.exceptions import CVATServiceError
from cvat.shared.types import CVATDatasetFormat


class DatasetAdapter(ProjectAbstract):

    def __init__(self):
        self.repo = CVATProjectRepository()

    def find_all(self, request: Optional[ProjectReadRequest] = None) -> PaginatedProjectReadList:
        try:
            return self.repo.find_all(request)
        except ApiException as e:
            raise CVATServiceError(e.reason, e.status)

    def find_one(self, project_id: int) -> Optional[ProjectRead]:
        try:
            return self.repo.find_one(project_id)
        except ApiException as e:
            raise CVATServiceError(e.reason, e.status)

    def export_dataset(
        self,
        project_id: int,
        format: CVATDatasetFormat,
        **kwargs,
    ) -> RqId:
        try:
            return self.repo.export_dataset(project_id, format, **kwargs)
        except ApiException as e:
            raise CVATServiceError(e.reason, e.status)

    def import_dataset(self, project_id: int, format: CVATDatasetFormat, **kwargs) -> RqId:
        try:
            return self.repo.import_dataset(project_id, format, **kwargs)
        except ApiException as e:
            raise CVATServiceError(e.reason, e.status)

    def export_backup(self, project_id: int, **kwargs) -> RqId:
        try:
            return self.repo.export_backup(project_id, **kwargs)
        except ApiException as e:
            raise CVATServiceError(e.reason, e.status)

    def import_backup(self, **kwargs) -> RqId:
        try:
            return self.repo.import_backup(**kwargs)
        except ApiException as e:
            raise CVATServiceError(e.reason, e.status)
