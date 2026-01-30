from cvat.projects.types import ProjectListResponse, ProjectResponse, ProjectsRequest
from cvat.shared.repository import CVATRepository
from cvat.shared.types import CVATDatasetFormat, RqResponse


class CVATProjectRepository(CVATRepository):

    def __init__(self):
        super().__init__()
        self.api = self.session.projects_api

    def find_all(self, request: ProjectsRequest) -> ProjectListResponse:
        return self.api.list(request)

    def find_one(self, project_id: int) -> ProjectResponse:
        return self.api.retrieve(project_id)

    def export_dataset(
        self,
        project_id: int,
        format: CVATDatasetFormat,
        **kwargs,
    ) -> RqResponse:
        return self.api.create_dataset_export(
            id=project_id,
            format=format,
            **kwargs,
        )

    def import_dataset(self, project_id: int, format: CVATDatasetFormat, **kwargs) -> RqResponse:
        return self.api.create_dataset(id=project_id, format=format, **kwargs)

    def export_backup(self, project_id: int, **kwargs) -> RqResponse:
        return self.api.create_backup_export(project_id, **kwargs)

    def import_backup(self, **kwargs) -> RqResponse:
        return self.api.create_backup(**kwargs)
