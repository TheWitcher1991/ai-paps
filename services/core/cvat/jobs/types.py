from dataclasses import dataclass
from typing import Literal, Optional

import urllib3
from cvat_sdk.api_client.model.job_read import JobRead
from cvat_sdk.api_client.model.paginated_job_read_list import PaginatedJobReadList

from cvat.shared.types import PaginatedRequest

JobResponse = tuple[Optional[JobRead], urllib3.HTTPResponse]
JobListResponse = tuple[Optional[PaginatedJobReadList], urllib3.HTTPResponse]


@dataclass(frozen=True)
class JobsRequest(PaginatedRequest):
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
