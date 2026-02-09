from typing import Optional

from cvat_sdk.api_client import ApiException

from cvat.shared.exceptions import CVATServiceError
from cvat.shared.usecase import CVATUsecase
from cvat.storages.repository import CVATStorageRepository
from cvat.storages.types import CloudStorageRead, CloudStorageReadRequest, PaginatedCloudStorageReadList


class CVATStoragesUsecase(CVATUsecase):

    def __init__(self):
        self.repo = CVATStorageRepository()

    def find_all(self, request: Optional[CloudStorageReadRequest] = None) -> PaginatedCloudStorageReadList:
        try:
            return self.repo.find_all(request)
        except ApiException as e:
            raise CVATServiceError(e.reason, e.status)

    def find_one(self, storage_id: int) -> Optional[CloudStorageRead]:
        try:
            return self.repo.find_one(storage_id)
        except ApiException as e:
            raise CVATServiceError(e.reason, e.status)
