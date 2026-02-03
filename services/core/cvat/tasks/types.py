from dataclasses import dataclass
from typing import List, Literal, Optional

from cvat_sdk.api_client.model.paginated_task_read_list import PaginatedTaskReadList as CVATPaginatedTaskReadList
from cvat_sdk.api_client.model.task_read import TaskRead as CVATTaskRead

from cvat.shared.types import CVATHTTPResponse, PaginatedRequest

PaginatedTaskReadList = CVATPaginatedTaskReadList
TaskRead = CVATTaskRead

TaskReadResponse = CVATHTTPResponse[Optional[TaskRead]]
TaskReadListResponse = CVATHTTPResponse[Optional[PaginatedTaskReadList]]

TaskReadList = List[TaskRead]


@dataclass(frozen=True)
class TaskReadRequest(PaginatedRequest):
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
