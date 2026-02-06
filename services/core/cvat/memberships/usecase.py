from typing import Optional

from cvat_sdk.api_client import ApiException

from cvat.memberships.repository import CVATMembershipRepository
from cvat.memberships.types import MembershipRead, MembershipReadRequest, PaginatedMembershipReadList
from cvat.shared.exceptions import CVATServiceError
from cvat.shared.usecase import CVATUsecase


class CVATMembershipsUsecase(CVATUsecase):

    def __init__(self):
        self.repo = CVATMembershipRepository()

    def find_all(self, request: Optional[MembershipReadRequest] = None) -> PaginatedMembershipReadList:
        try:
            return self.repo.find_all(request)
        except ApiException as e:
            raise CVATServiceError(e.reason, e.status)

    def find_one(self, membership_id: int) -> Optional[MembershipRead]:
        try:
            return self.repo.find_one(membership_id)
        except ApiException as e:
            raise CVATServiceError(e.reason, e.status)
