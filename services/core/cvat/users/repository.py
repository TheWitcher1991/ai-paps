from cvat.users.types import UserListResponse, UserResponse, UsersRequest
from cvat.shared.repository import CVATRepository


class CVATUserRepository(CVATRepository):

    def __init__(self):
        super().__init__()
        self.api = self.session.users_api

    def list(self, request: UsersRequest) -> UserListResponse:
        return self.api.list(
            x_organization=request.x_organization,
            filter=request.filter,
            first_name=request.first_name,
            is_active=request.is_active,
            last_name=request.last_name,
            org=request.org,
            org_id=request.org_id,
            page=request.page,
            page_size=request.page_size,
            sort=request.sort,
            username=request.username,
        )

    def get_by_id(self, user_id: int) -> UserResponse:
        return self.api.retrieve(user_id)

    def get_me(self) -> UserResponse:
        return self.api.retrieve_self()
