from dataclasses import dataclass
from typing import List, Literal, Optional

from cvat_sdk.api_client.model.label import Label as CVATLabel
from cvat_sdk.api_client.model.paginated_label_list import PaginatedLabelList as CVATPaginatedLabelList

from cvat.shared.types import CVATHTTPResponse, PaginatedRequest

PaginatedLabelList = CVATPaginatedLabelList
Label = CVATLabel

LabelResponse = CVATHTTPResponse[Optional[Label]]
LabelListResponse = CVATHTTPResponse[Optional[PaginatedLabelList]]

LabelList = List[Label]


@dataclass(frozen=True)
class LabelRequest(PaginatedRequest):
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
