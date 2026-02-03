from dataclasses import dataclass
from typing import List, Literal, Optional

from cvat_sdk.api_client.model.job_read import JobRead as CVATJobRead
from cvat_sdk.api_client.model.paginated_job_read_list import PaginatedJobReadList as CVATPaginatedJobReadList

from cvat.shared.types import CVATHTTPResponse, PaginatedRequest

PaginatedJobReadList = CVATPaginatedJobReadList
JobRead = CVATJobRead

JobReadResponse = CVATHTTPResponse[Optional[JobRead]]
JobReadListResponse = CVATHTTPResponse[Optional[PaginatedJobReadList]]

JobReadList = List[JobRead]


@dataclass(frozen=True)
class JobReadRequest(PaginatedRequest):
    x_organization: Optional[str] = None
    assignee: Optional[str] = None
    dimension: Optional[str] = None
    filter: Optional[str] = None
    org: Optional[str] = None
    org_id: Optional[int] = None
    parent_job_id: Optional[str] = None
    project_id: Optional[int] = None
    project_name: Optional[str] = None
    search: Optional[str] = None
    sort: Optional[
        Literal[
            "task_name",
            "project_name",
            "assignee",
            "state",
            "stage",
            "id",
            "task_id",
            "project_id",
            "updated_date",
            "dimension",
            "type",
            "parent_job_id",
        ]
    ] = None
    stage: Optional[str] = None
    state: Optional[str] = None
    task_id: Optional[int] = None
    task_name: Optional[str] = None
    type: Optional[str] = None
