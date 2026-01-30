from cvat_sdk.api_client import ApiException

from cvat.shared.exceptions import CVATServiceError
from cvat.shared.types import CVATDatasetFormat, RqResponse
from cvat.shared.usecase import CVATUsecase
from cvat.tasks.repository import CVATTaskRepository
from cvat.tasks.types import TaskListResponse, TaskResponse, TasksRequest


class CVATTasksUsecase(CVATUsecase):

    def __init__(self):
        self.repo = CVATTaskRepository()

    def find_all(self, request: TasksRequest) -> TaskListResponse:
        try:
            return self.repo.find_all(request)
        except ApiException as e:
            raise CVATServiceError(e.reason, e.status)

    def find_one(self, task_id: int) -> TaskResponse:
        try:
            return self.repo.find_one(task_id)
        except ApiException as e:
            raise CVATServiceError(e.reason, e.status)

    def export_dataset(
        self,
        task_id: int,
        format: CVATDatasetFormat,
        **kwargs,
    ) -> RqResponse:
        try:
            return self.repo.export_dataset(task_id, format, **kwargs)
        except ApiException as e:
            raise CVATServiceError(e.reason, e.status)

    def export_backup(self, task_id: int, **kwargs) -> RqResponse:
        try:
            return self.repo.export_backup(task_id, **kwargs)
        except ApiException as e:
            raise CVATServiceError(e.reason, e.status)

    def import_backup(self, **kwargs) -> RqResponse:
        try:
            return self.repo.import_backup(**kwargs)
        except ApiException as e:
            raise CVATServiceError(e.reason, e.status)
