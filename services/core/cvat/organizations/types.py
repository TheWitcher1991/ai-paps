from dataclasses import dataclass
from typing import List, Optional

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
    pass
