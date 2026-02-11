from cvat.jobs.usecase import CVATJobsUsecase
from cvat.shared.types import CVATDatasetFormat
from datasets.engine import DatasetEngine
from datasets.types import DatasetSource
from packages.kernel.types import ExtendedRequest


class JobCommand:
    def __init__(self):
        self.use_case = CVATJobsUsecase()
        self.dataset_engine = DatasetEngine()

    def export(self, job_id: int):
        return self.dataset_engine.export(DatasetSource.JOBS, job_id)

    def export_dataset(self, job_id: int, request: ExtendedRequest):
        dataset_format = request.query_params.get("format", CVATDatasetFormat.COCO)

        return self.use_case.export_dataset(job_id, dataset_format)
