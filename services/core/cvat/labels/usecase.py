from cvat_sdk.api_client import ApiException

from cvat.labels.repository import CVATLabelRepository
from cvat.labels.types import LabelListResponse, LabelResponse, LabelsRequest
from cvat.shared.exceptions import CVATServiceError
from cvat.shared.usecase import CVATUsecase


class CVATLabelsUsecase(CVATUsecase):

    def __init__(self):
        self.repo = CVATLabelRepository()

    def find_all(self, request: LabelsRequest) -> LabelListResponse:
        try:
            return self.repo.find_all(request)
        except ApiException as e:
            raise CVATServiceError(e.reason, e.status)

    def find_one(self, label_id: int) -> LabelResponse:
        try:
            return self.repo.find_one(label_id)
        except ApiException as e:
            raise CVATServiceError(e.reason, e.status)
