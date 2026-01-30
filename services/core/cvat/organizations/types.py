from dataclasses import dataclass
from typing import Optional

import urllib3
from cvat_sdk.api_client.model.organization_read import OrganizationRead
from cvat_sdk.api_client.model.paginated_organization_read_list import PaginatedOrganizationReadList

from cvat.shared.types import PaginatedRequest

OrganizationResponse = tuple[Optional[OrganizationRead], urllib3.HTTPResponse]
OrganizationListResponse = tuple[Optional[PaginatedOrganizationReadList], urllib3.HTTPResponse]


@dataclass(frozen=True)
class OrganizationsRequest(PaginatedRequest):
    pass
