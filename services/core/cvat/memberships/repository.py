from typing import Optional

from cvat.memberships.types import MembershipRead, MembershipReadRequest, PaginatedMembershipReadList
from cvat.shared.repository import CVATRepository


class CVATMembershipRepository(CVATRepository):

    def __init__(self):
        super().__init__()
        self.api = self.session.memberships_api

    def find_all(self, request: Optional[MembershipReadRequest] = None) -> PaginatedMembershipReadList:
        return self.execute(self.api.list, **self.params(request)).data

    def find_one(self, membership_id: int) -> Optional[MembershipRead]:
        return self.execute(self.api.retrieve, membership_id).data
