from dataclasses import dataclass
from typing import List, Literal, Optional

from cvat_sdk.api_client.model.organization_read import OrganizationRead as CVATOrganizationRead
from cvat_sdk.api_client.model.paginated_organization_read_list import (
    PaginatedOrganizationReadList as CVATPaginatedOrganizationReadList,
)

from cvat.shared.types import CVATHTTPResponse, PaginatedRequest

PaginatedOrganizationReadList = CVATPaginatedOrganizationReadList
OrganizationRead = CVATOrganizationRead

OrganizationListResponse = CVATHTTPResponse[Optional[PaginatedOrganizationReadList]]
OrganizationResponse = CVATHTTPResponse[Optional[OrganizationRead]]

OrganizationReadList = List[OrganizationRead]


@dataclass(frozen=True)
class OrganizationReadRequest(PaginatedRequest):
    filter: Optional[str] = None
    name: Optional[str] = None
    owner: Optional[str] = None
    slug: Optional[str] = None
    sort: Optional[Literal["name", "owner", "slug", "id"]] = None
