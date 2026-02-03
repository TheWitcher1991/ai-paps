from typing import Optional

from cvat.projects.types import PaginatedProjectReadList, ProjectRead, ProjectReadRequest
from cvat.rq.types import RqId
from cvat.shared.repository import CVATRepository
from cvat.shared.types import CVATDatasetFormat


class CVATProjectRepository(CVATRepository):

    def __init__(self):
        super().__init__()
        self.api = self.session.projects_api

    def find_all(self, request: Optional[ProjectReadRequest] = None) -> PaginatedProjectReadList:
        return self.execute(self.api.list, self.params(request)).data

    def find_one(self, project_id: int) -> Optional[ProjectRead]:
        return self.execute(self.api.retrieve, project_id).data

    def export_dataset(
        self,
        project_id: int,
        format: CVATDatasetFormat,
        **kwargs,
    ) -> RqId:
        return self.execute(
            self.api.create_dataset_export,
            id=project_id,
            format=format,
            **kwargs,
        ).data

    def import_dataset(self, project_id: int, format: CVATDatasetFormat, **kwargs) -> RqId:
        return self.execute(self.api.create_dataset, id=project_id, format=format, **kwargs).data

    def export_backup(self, project_id: int, **kwargs) -> RqId:
        return self.execute(self.api.create_backup_export, project_id, **kwargs).data

    def import_backup(self, **kwargs) -> RqId:
        return self.execute(self.api.create_backup, **kwargs).data
