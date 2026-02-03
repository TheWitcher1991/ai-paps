from typing import Optional

from cvat_sdk.api_client import ApiException

from cvat.shared.exceptions import CVATServiceError
from cvat.shared.usecase import CVATUsecase
from cvat.users.repository import CVATUserRepository
from cvat.users.types import MetaUser, MetaUserRequest, PaginatedMetaUserList


class CVATUsersUsecase(CVATUsecase):

    def __init__(self):
        self.repo = CVATUserRepository()

    def find_all(self, request: Optional[MetaUserRequest] = None) -> PaginatedMetaUserList:
        try:
            return self.repo.find_all(request)
        except ApiException as e:
            raise CVATServiceError(
                message=e.reason,
                status_code=e.status,
            )

    def find_one(self, user_id: int) -> Optional[MetaUser]:
        try:
            return self.repo.find_one(user_id)
        except ApiException as e:
            raise CVATServiceError(e.reason, e.status)

    def find_me(self) -> Optional[MetaUser]:
        try:
            return self.repo.find_me()
        except ApiException as e:
            raise CVATServiceError(e.reason, e.status)
