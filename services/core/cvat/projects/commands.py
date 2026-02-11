from cvat.projects.adapters import CVATProjectAdapter
from cvat.shared.types import CVATDatasetFormat
from datasets.engine import DatasetEngine
from datasets.types import DatasetSource
from packages.kernel.types import ExtendedRequest


class ProjectCommand:
    def __init__(self):
        self.projects = CVATProjectAdapter()
        self.dataset_engine = DatasetEngine()

    def export(self, job_id: int):
        return self.dataset_engine.export(DatasetSource.PROJECTS, job_id)

    def export_dataset(self, project_id: int, request: ExtendedRequest):
        dataset_format = request.query_params.get("format", CVATDatasetFormat.COCO)

        return self.projects.export_dataset(project_id, dataset_format)
