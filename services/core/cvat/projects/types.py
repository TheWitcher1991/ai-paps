from dataclasses import dataclass
from typing import Literal, Optional

import urllib3
from cvat_sdk.api_client.model.paginated_project_read_list import PaginatedProjectReadList
from cvat_sdk.api_client.model.project_read import ProjectRead

from cvat.shared.types import PaginatedRequest

ProjectResponse = tuple[Optional[ProjectRead], urllib3.HTTPResponse]
ProjectListResponse = tuple[Optional[PaginatedProjectReadList], urllib3.HTTPResponse]


@dataclass(frozen=True)
class ProjectsRequest(PaginatedRequest):
    x_organization: Optional[str] = None
    assignee: Optional[str] = None
    filter: Optional[str] = None
    name: Optional[str] = None
    org: Optional[str] = None
    org_id: Optional[int] = None
    owner: Optional[str] = None
    search: Optional[str] = None
    sort: Optional[Literal["name", "owner", "assignee", "status", "id", "updated_date"]] = None
    status: Optional[str] = None
