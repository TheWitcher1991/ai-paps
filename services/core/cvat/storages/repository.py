from typing import Optional

from cvat.shared.repository import CVATRepository
from cvat.storages.types import CloudStorageRead, CloudStorageReadRequest, PaginatedCloudStorageReadList


class CVATStorageRepository(CVATRepository):

    def __init__(self):
        super().__init__()
        self.api = self.session.cloudstorages_api

    def find_all(self, request: Optional[CloudStorageReadRequest] = None) -> PaginatedCloudStorageReadList:
        return self.execute(self.api.list, **self.params(request)).data

    def find_one(self, storage_id: int) -> Optional[CloudStorageRead]:
        return self.execute(self.api.retrieve, storage_id).data
