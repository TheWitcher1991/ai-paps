from cvat.labels.types import LabelListResponse, LabelResponse, LabelsRequest
from cvat.shared.repository import CVATRepository


class CVATLabelRepository(CVATRepository):

    def __init__(self):
        super().__init__()
        self.api = self.session.labels_api

    def find_all(self, request: LabelsRequest) -> LabelListResponse:
        return self.api.list(request)

    def find_one(self, label_id: int) -> LabelResponse:
        return self.api.retrieve(label_id)
