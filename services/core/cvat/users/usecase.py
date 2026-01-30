from cvat_sdk.api_client import ApiException

from cvat.shared.usecase import CVATUsecase
from cvat.shared.exceptions import CVATServiceError
from cvat.users.repository import CVATUserRepository
from cvat.users.types import UsersRequest, UserResponse, UserListResponse


class CVATUsersUsecase(CVATUsecase):

    def __init__(self):
        self.repo = CVATUserRepository()

    def list_users(self, request: UsersRequest) -> UserListResponse:
        try:
            return self.repo.list(request)
        except ApiException as e:
            raise CVATServiceError(
                message=e.reason,
                status_code=e.status,
            )

    def get_user(self, user_id: int) -> UserResponse:
        try:
            return self.repo.get_by_id(user_id)
        except ApiException as e:
            raise CVATServiceError(e.reason, e.status)

    def get_current_user(self) -> UserResponse:
        try:
            return self.repo.get_me()
        except ApiException as e:
            raise CVATServiceError(e.reason, e.status)
