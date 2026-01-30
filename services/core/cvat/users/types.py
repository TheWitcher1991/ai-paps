from dataclasses import dataclass
from typing import Optional, Literal

import urllib3
from cvat_sdk.api_client.model.meta_user import MetaUser
from cvat_sdk.api_client.model.paginated_meta_user_list import PaginatedMetaUserList

from cvat.shared.types import PaginatedRequest

UserListResponse = tuple[Optional[PaginatedMetaUserList], urllib3.HTTPResponse]
UserResponse = tuple[Optional[MetaUser], urllib3.HTTPResponse]


@dataclass(frozen=True)
class UsersRequest(PaginatedRequest):
    x_organization: Optional[str] = None
    filter: Optional[str] = None
    first_name: Optional[str] = None
    is_active: Optional[bool] = None
    last_name: Optional[str] = None
    org: Optional[str] = None
    org_id: Optional[int] = None
    sort: Optional[Literal['username', 'first_name', 'last_name', 'id', 'is_active']] = None
    username: Optional[str] = None
