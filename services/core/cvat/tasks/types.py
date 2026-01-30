from dataclasses import dataclass
from typing import Literal, Optional

import urllib3
from cvat_sdk.api_client.model.paginated_task_read_list import PaginatedTaskReadList
from cvat_sdk.api_client.model.task_read import TaskRead

from cvat.shared.types import PaginatedRequest

TaskResponse = tuple[Optional[TaskRead], urllib3.HTTPResponse]
TaskListResponse = tuple[Optional[PaginatedTaskReadList], urllib3.HTTPResponse]


@dataclass(frozen=True)
class TasksRequest(PaginatedRequest):
    x_organization: Optional[str] = None
    assignee: Optional[str] = None
    dimension: Optional[str] = None
    filter: Optional[str] = None
    mode: Optional[str] = None
    name: Optional[str] = None
    org: Optional[str] = None
    org_id: Optional[int] = None
    owner: Optional[str] = None
    project_id: Optional[int] = None
    project_name: Optional[str] = None
    search: Optional[str] = None
    sort: Optional[
        Literal[
            "project_name",
            "name",
            "owner",
            "status",
            "assignee",
            "subset",
            "mode",
            "dimension",
            "tracker_link",
            "validation_mode",
            "id",
            "project_id",
            "updated_date",
        ]
    ] = None
    status: Optional[str] = None
    subset: Optional[str] = None
    tracker_link: Optional[str] = None
    validation_mode: Optional[str] = None
