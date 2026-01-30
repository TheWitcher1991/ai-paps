from dataclasses import dataclass
from typing import Optional, Literal

import urllib3
from cvat_sdk.api_client.model.paginated_project_read_list import PaginatedProjectReadList
from cvat_sdk.api_client.model.project_read import ProjectRead

from cvat.shared.types import PaginatedRequest


ProjectResponse = tuple[Optional[ProjectRead], urllib3.HTTPResponse]
ProjectListResponse = tuple[Optional[PaginatedProjectReadList], urllib3.HTTPResponse]


@dataclass(frozen=True)
class ProjectsRequest(PaginatedRequest):
    x_organization: Optional[str]
    assignee: Optional[str]
    filter: Optional[str]
    name: Optional[str]
    org: Optional[str]
    org_id: Optional[int]
    owner: Optional[str]
    search: Optional[str]
    sort: Optional[
        Literal['name', 'owner', 'assignee', 'status', 'id', 'updated_date']
    ]
    status: Optional[str]
