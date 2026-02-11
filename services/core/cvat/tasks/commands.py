from cvat.shared.types import CVATDatasetFormat
from cvat.tasks.usecase import CVATTasksUsecase
from datasets.engine import DatasetEngine
from datasets.types import DatasetSource
from packages.kernel.types import ExtendedRequest


class TaskCommand:
    def __init__(self):
        self.use_case = CVATTasksUsecase()
        self.dataset_engine = DatasetEngine()

    def export(self, job_id: int):
        return self.dataset_engine.export(DatasetSource.TASKS, job_id)

    def export_dataset(self, task_id: int, request: ExtendedRequest):
        dataset_format = request.query_params.get("format", CVATDatasetFormat.COCO)

        return self.use_case.export_dataset(task_id, dataset_format)
