from cvat.sdk import cvat
from cvat.shared.types import CVATDatasetFormat
from datasets.types import DatasetSource


class DatasetRegistry:

    @staticmethod
    def find_annotations(source: DatasetSource, source_id: int):
        if source == DatasetSource.PROJECTS:
            return cvat.projects.export_dataset(source_id, CVATDatasetFormat.COCO)
        elif source == DatasetSource.TASKS.value:
            return cvat.tasks.export_dataset(source_id, CVATDatasetFormat.COCO)
        elif source == DatasetSource.JOBS.value:
            return cvat.jobs.export_dataset(source_id, CVATDatasetFormat.COCO)
        else:
            raise ValueError()


class DatasetEngine:

    def export(self, source: DatasetSource, source_id: int):
        annotations = DatasetRegistry.find_annotations(source, source_id)

    def validate(self):
        pass
