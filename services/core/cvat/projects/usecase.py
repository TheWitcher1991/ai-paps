from cvat_sdk.api_client import ApiException

from cvat.projects.repository import CVATProjectRepository
from cvat.projects.types import ProjectListResponse, ProjectResponse, ProjectsRequest
from cvat.shared.exceptions import CVATServiceError
from cvat.shared.types import CVATDatasetFormat, RqResponse
from cvat.shared.usecase import CVATUsecase


class CVATProjectsUsecase(CVATUsecase):

    def __init__(self):
        self.repo = CVATProjectRepository()

    def find_all(self, request: ProjectsRequest) -> ProjectListResponse:
        try:
            return self.repo.find_all(request)
        except ApiException as e:
            raise CVATServiceError(e.reason, e.status)

    def find_one(self, project_id: int) -> ProjectResponse:
        try:
            return self.repo.find_one(project_id)
        except ApiException as e:
            raise CVATServiceError(e.reason, e.status)

    def export_dataset(
        self,
        project_id: int,
        format: CVATDatasetFormat,
        **kwargs,
    ) -> RqResponse:
        try:
            return self.repo.export_dataset(project_id, format, **kwargs)
        except ApiException as e:
            raise CVATServiceError(e.reason, e.status)

    def import_dataset(self, project_id: int, format: CVATDatasetFormat, **kwargs) -> RqResponse:
        try:
            return self.repo.import_dataset(project_id, format, **kwargs)
        except ApiException as e:
            raise CVATServiceError(e.reason, e.status)

    def export_backup(self, project_id: int, **kwargs) -> RqResponse:
        try:
            return self.repo.export_backup(project_id, **kwargs)
        except ApiException as e:
            raise CVATServiceError(e.reason, e.status)

    def import_backup(self, **kwargs) -> RqResponse:
        try:
            return self.repo.import_backup(**kwargs)
        except ApiException as e:
            raise CVATServiceError(e.reason, e.status)
