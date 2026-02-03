from dataclasses import dataclass
from typing import List, Literal, Optional

from cvat_sdk.api_client.model.meta_user import MetaUser as CVATMetaUser
from cvat_sdk.api_client.model.paginated_meta_user_list import PaginatedMetaUserList as CVATPaginatedMetaUserList

from cvat.shared.types import CVATHTTPResponse, PaginatedRequest

PaginatedMetaUserList = CVATPaginatedMetaUserList
MetaUser = CVATMetaUser

MetaUserListResponse = CVATHTTPResponse[Optional[PaginatedMetaUserList]]
MetaUserResponse = CVATHTTPResponse[Optional[MetaUser]]

MetaUserList = List[MetaUser]


@dataclass(frozen=True)
class MetaUserRequest(PaginatedRequest):
    x_organization: Optional[str] = None
    filter: Optional[str] = None
    first_name: Optional[str] = None
    is_active: Optional[bool] = None
    last_name: Optional[str] = None
    org: Optional[str] = None
    org_id: Optional[int] = None
    sort: Optional[Literal["username", "first_name", "last_name", "id", "is_active"]] = None
    username: Optional[str] = None
