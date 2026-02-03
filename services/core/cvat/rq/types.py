from typing import Optional

from cvat_sdk.api_client.model.rq_id import RqId as CVATRqId

from cvat.shared.types import CVATHTTPResponse

RqId = CVATRqId

RqResponse = CVATHTTPResponse[Optional[RqId]]
