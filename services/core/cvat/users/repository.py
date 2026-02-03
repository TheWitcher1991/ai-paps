from typing import Optional

from cvat.shared.repository import CVATRepository
from cvat.users.types import MetaUser, MetaUserRequest, PaginatedMetaUserList


class CVATUserRepository(CVATRepository):

    def __init__(self):
        super().__init__()
        self.api = self.session.users_api

    def find_all(self, request: Optional[MetaUserRequest] = None) -> PaginatedMetaUserList:
        return self.execute(self.api.list, **self.params(request)).data

    def find_one(self, user_id: int) -> Optional[MetaUser]:
        return self.execute(self.api.retrieve, user_id).data

    def find_me(self) -> Optional[MetaUser]:
        return self.execute(self.api.retrieve_self).data
