from dataclasses import dataclass
from typing import Optional, Literal

import urllib3
from cvat_sdk.api_client.model.paginated_task_read_list import PaginatedTaskReadList
from cvat_sdk.api_client.model.task_read import TaskRead

from cvat.shared.types import PaginatedRequest


TaskResponse = tuple[Optional[TaskRead], urllib3.HTTPResponse]
TaskListResponse = tuple[Optional[PaginatedTaskReadList], urllib3.HTTPResponse]


@dataclass(frozen=True)
class TasksRequest(PaginatedRequest):
    x_organization: Optional[str]
    assignee: Optional[str]
    dimension: Optional[str]
    filter: Optional[str]
    mode: Optional[str]
    name: Optional[str]
    org: Optional[str]
    org_id: Optional[int]
    owner: Optional[str]
    project_id: Optional[int]
    project_name: Optional[str]
    search: Optional[str]
    sort: Optional[
        Literal['project_name', 'name', 'owner', 'status', 'assignee', 'subset', 'mode', 'dimension', 'tracker_link', 'validation_mode', 'id', 'project_id', 'updated_date']
    ]
    status: Optional[str]
    subset: Optional[str]
    tracker_link: Optional[str]
    validation_mode: Optional[str]
