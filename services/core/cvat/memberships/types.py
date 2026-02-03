from dataclasses import dataclass
from typing import List, Literal, Optional

from cvat_sdk.api_client.model.membership_read import MembershipRead as CVATMembershipRead
from cvat_sdk.api_client.model.paginated_membership_read_list import (
    PaginatedMembershipReadList as CVATPaginatedMembershipReadList,
)

from cvat.shared.types import CVATHTTPResponse, PaginatedRequest

PaginatedMembershipReadList = CVATPaginatedMembershipReadList
MembershipRead = CVATMembershipRead

MembershipReadResponse = CVATHTTPResponse[Optional[MembershipRead]]
MembershipReadListResponse = CVATHTTPResponse[Optional[PaginatedMembershipReadList]]

MembershipReadList = List[MembershipRead]


@dataclass(frozen=True)
class MembershipReadRequest(PaginatedRequest):
    x_organization: Optional[str] = None
    filter: Optional[str] = None
    org: Optional[str] = None
    org_id: Optional[int] = None
    role: Optional[str] = None
    sort: Optional[Literal["user", "role", "id"]] = None
    user: Optional[str] = None
