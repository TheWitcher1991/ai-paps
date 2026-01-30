from dataclasses import dataclass
from typing import Literal, Optional

import urllib3
from cvat_sdk.api_client.model.label import Label
from cvat_sdk.api_client.model.paginated_label_list import PaginatedLabelList

from cvat.shared.types import PaginatedRequest

LabelResponse = tuple[Optional[Label], urllib3.HTTPResponse]
LabelListResponse = tuple[Optional[PaginatedLabelList], urllib3.HTTPResponse]


@dataclass(frozen=True)
class LabelsRequest(PaginatedRequest):
    x_organization: Optional[str] = None
    color: Optional[str] = None
    filter: Optional[str] = None
    job_id: Optional[int] = None
    name: Optional[str] = None
    org: Optional[int] = None
    org_id: Optional[int] = None
    parent: Optional[int] = None
    parent_id: Optional[int] = None
    project_id: Optional[int] = None
    search: Optional[str] = None
    sort: Optional[
        Literal[
            "name",
            "parent",
            "id",
            "type",
            "color",
            "parent_id",
        ]
    ] = None
    task_id: Optional[int] = None
    type: Optional[str] = None
