from cvat.projects.types import ProjectResponse, ProjectListResponse, ProjectsRequest
from cvat.shared.types import RqResponse, CVATDatasetFormat
from cvat.shared.repository import CVATRepository


class CVATProjectRepository(CVATRepository):

    def __init__(self):
        super().__init__()
        self.api = self.session.projects_api

    def list(self, request: ProjectsRequest) -> ProjectListResponse:
        return self.api.list(request)

    def get_by_id(self, project_id: int) -> ProjectResponse:
        return self.api.retrieve(project_id)

    def export_dataset(
        self,
        project_id: int,
        format: CVATDatasetFormat,
        **kwargs,
    ) -> RqResponse:
        return self.api.create_dataset_export(
            format,
            project_id,
            **kwargs,
        )

    def import_dataset(self, project_id: int, **kwargs) -> RqResponse:
        return self.api.create_dataset(project_id, **kwargs)

    def export_backup(self, project_id: int, **kwargs) -> RqResponse:
        return self.api.create_backup_export(project_id, **kwargs)

    def import_backup(self, **kwargs) -> RqResponse:
        return self.api.create_backup(**kwargs)
