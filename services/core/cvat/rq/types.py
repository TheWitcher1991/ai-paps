from dataclasses import dataclass
from enum import StrEnum
from typing import List, Literal, Optional

from cvat_sdk.api_client.model.paginated_request_list import PaginatedRequestList as CVATPaginatedRequestList
from cvat_sdk.api_client.model.request import Request as CVATRequest
from cvat_sdk.api_client.model.rq_id import RqId as CVATRqId

from cvat.shared.types import CVATHTTPResponse, PaginatedRequest

PaginatedRequestList = CVATPaginatedRequestList
Request = CVATRequest

RequestResponse = CVATHTTPResponse[Optional[Request]]
ProjectRequestResponse = CVATHTTPResponse[Optional[PaginatedRequestList]]

RequestList = List[Request]

RqId = CVATRqId

RqIdResponse = CVATHTTPResponse[Optional[RqId]]


class RqStatus(StrEnum):
    QUEUED = "queued"
    STARTED = ("started",)
    FAILED = "failed"
    FINISHED = ("finished",)


@dataclass(frozen=True)
class RqRequest(PaginatedRequest):
    action: Optional[str] = None
    filter: Optional[str] = None
    format: Optional[str] = None
    job_id: Optional[int] = None
    org: Optional[str] = None
    project_id: Optional[int] = None
    sort: Optional[Literal["status", "id"]] = None
    status: Optional[str] = None
    subresource: Optional[str] = None
    target: Optional[str] = None
    task_id: Optional[int] = None
