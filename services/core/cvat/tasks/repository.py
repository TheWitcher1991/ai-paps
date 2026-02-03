from typing import Optional

from cvat.rq.types import RqId
from cvat.shared.repository import CVATRepository
from cvat.shared.types import CVATDatasetFormat
from cvat.tasks.types import PaginatedTaskReadList, TaskRead, TaskReadRequest


class CVATTaskRepository(CVATRepository):

    def __init__(self):
        super().__init__()
        self.api = self.session.tasks_api

    def find_all(self, request: Optional[TaskReadRequest] = None) -> PaginatedTaskReadList:
        return self.execute(self.api.list, self.params(request)).data

    def find_one(self, task_id: int) -> Optional[TaskRead]:
        return self.execute(self.api.retrieve, task_id).data

    def export_dataset(
        self,
        task_id: int,
        format: CVATDatasetFormat,
        **kwargs,
    ) -> RqId:
        return self.execute(self.api.create_dataset_export, format, task_id, **kwargs).data

    def export_backup(self, task_id: int, **kwargs) -> RqId:
        return self.execute(self.api.create_backup_export, task_id, **kwargs).data

    def import_backup(self, **kwargs) -> RqId:
        return self.execute(self.api.create_backup, **kwargs).data
