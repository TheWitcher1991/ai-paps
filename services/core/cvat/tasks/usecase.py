from cvat_sdk.api_client import ApiException

from cvat.projects.repository import CVATProjectRepository
from cvat.projects.types import ProjectsRequest, ProjectListResponse, ProjectResponse
from cvat.shared.exceptions import CVATServiceError
from cvat.shared.types import RqResponse, CVATDatasetFormat
from cvat.shared.usecase import CVATUsecase


class CVATTasksUsecase(CVATUsecase):

    def __init__(self):
        self.repo = CVATProjectRepository()

    def list_projects(self, request: ProjectsRequest) -> ProjectListResponse:
        try:
            return self.repo.list(request)
        except ApiException as e:
            raise CVATServiceError(e.reason, e.status)

    def get_project(self, project_id: int) -> ProjectResponse:
        try:
            return self.repo.get_by_id(project_id)
        except ApiException as e:
            raise CVATServiceError(e.reason, e.status)

    def export_project_dataset(
        self,
        project_id: int,
        format: CVATDatasetFormat,
        **kwargs,
    ) -> RqResponse:
        try:
            return self.repo.export_dataset(project_id, format, **kwargs)
        except ApiException as e:
            raise CVATServiceError(e.reason, e.status)

    def import_project_dataset(self, project_id: int, **kwargs) -> RqResponse:
        try:
            return self.repo.import_dataset(project_id, **kwargs)
        except ApiException as e:
            raise CVATServiceError(e.reason, e.status)

    def export_project_backup(self, project_id: int, **kwargs) -> RqResponse:
        try:
            return self.repo.export_backup(project_id, **kwargs)
        except ApiException as e:
            raise CVATServiceError(e.reason, e.status)

    def import_project_backup(self, **kwargs) -> RqResponse:
        try:
            return self.repo.import_backup(**kwargs)
        except ApiException as e:
            raise CVATServiceError(e.reason, e.status)
