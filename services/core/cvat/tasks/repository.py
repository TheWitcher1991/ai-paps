from cvat.shared.repository import CVATRepository
from cvat.shared.types import CVATDatasetFormat, RqResponse
from cvat.tasks.types import TaskListResponse, TaskResponse, TasksRequest


class CVATTaskRepository(CVATRepository):

    def __init__(self):
        super().__init__()
        self.api = self.session.tasks_api

    def find_all(self, request: TasksRequest) -> TaskListResponse:
        return self.api.list(request)

    def find_one(self, task_id: int) -> TaskResponse:
        return self.api.retrieve(task_id)

    def export_dataset(
        self,
        task_id: int,
        format: CVATDatasetFormat,
        **kwargs,
    ) -> RqResponse:
        return self.api.create_dataset_export(
            format,
            task_id,
            **kwargs,
        )

    def export_backup(self, task_id: int, **kwargs) -> RqResponse:
        return self.api.create_backup_export(task_id, **kwargs)

    def import_backup(self, **kwargs) -> RqResponse:
        return self.api.create_backup(**kwargs)
