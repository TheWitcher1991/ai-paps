from dataclasses import dataclass
from typing import List, Literal, Optional

from cvat_sdk.api_client.model.cloud_storage_read import CloudStorageRead as CVATCloudStorageRead
from cvat_sdk.api_client.model.paginated_cloud_storage_read_list import (
    PaginatedCloudStorageReadList as CVATPaginatedCloudStorageReadList,
)

from cvat.shared.types import CVATHTTPResponse, PaginatedRequest

PaginatedCloudStorageReadList = CVATPaginatedCloudStorageReadList
CloudStorageRead = CVATCloudStorageRead

CloudStorageReadListResponse = CVATHTTPResponse[Optional[PaginatedCloudStorageReadList]]
CloudStorageReadResponse = CVATHTTPResponse[Optional[CloudStorageRead]]

CloudStorageReadList = List[CloudStorageRead]


@dataclass(frozen=True)
class CloudStorageReadRequest(PaginatedRequest):
    x_organization: Optional[str] = None
    credentials_type: Optional[str] = None
    filter: Optional[str] = None
    slug: Optional[str] = None
    name: Optional[str] = None
    org: Optional[str] = None
    org_id: Optional[int] = None
    owner: Optional[str] = None
    provider_type: Optional[str] = None
    resource: Optional[str] = None
    sort: Optional[Literal["provider_type", "name", "resource", "credentials_type", "owner", "description", "id"]] = (
        None
    )
