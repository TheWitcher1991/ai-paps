from typing import Optional

from cvat.labels.types import Label, LabelsRequest, PaginatedLabelList
from cvat.shared.repository import CVATRepository


class CVATLabelRepository(CVATRepository):

    def __init__(self):
        super().__init__()
        self.api = self.session.labels_api

    def find_all(self, request: Optional[LabelsRequest] = None) -> PaginatedLabelList:
        return self.execute(self.api.list, **self.params(request)).data

    def find_one(self, label_id: int) -> Optional[Label]:
        return self.execute(self.api.retrieve, label_id).data
