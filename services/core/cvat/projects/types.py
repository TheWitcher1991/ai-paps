from dataclasses import dataclass
from typing import List, Literal, Optional

from cvat_sdk.api_client.model.paginated_project_read_list import (
    PaginatedProjectReadList as CVATPaginatedProjectReadList,
)
from cvat_sdk.api_client.model.project_read import ProjectRead as CVATProjectRead

from cvat.shared.types import CVATHTTPResponse, PaginatedRequest

PaginatedProjectReadList = CVATPaginatedProjectReadList
ProjectRead = CVATProjectRead

ProjectReadResponse = CVATHTTPResponse[Optional[ProjectRead]]
ProjectReadListResponse = CVATHTTPResponse[Optional[PaginatedProjectReadList]]

ProjectReadList = List[ProjectRead]


@dataclass(frozen=True)
class ProjectReadRequest(PaginatedRequest):
    x_organization: Optional[str] = None
    assignee: Optional[str] = None
    filter: Optional[str] = None
    name: Optional[str] = None
    org: Optional[str] = None
    org_id: Optional[int] = None
    owner: Optional[str] = None
    sort: Optional[Literal["name", "owner", "assignee", "status", "id", "updated_date"]] = None
    status: Optional[str] = None
