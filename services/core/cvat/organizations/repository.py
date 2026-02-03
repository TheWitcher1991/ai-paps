from typing import Optional

from cvat.organizations.types import OrganizationRead, OrganizationReadRequest, PaginatedOrganizationReadList
from cvat.shared.repository import CVATRepository


class CVATOrganizationRepository(CVATRepository):

    def __init__(self):
        super().__init__()
        self.api = self.session.organizations_api

    def find_all(self, request: Optional[OrganizationReadRequest] = None) -> PaginatedOrganizationReadList:
        return self.execute(self.api.list, **self.params(request)).data

    def find_one(self, organization_id: int) -> Optional[OrganizationRead]:
        return self.execute(self.api.retrieve, organization_id).data

    def find_ncmu(self):
        return self.execute(self.api.retrieve, self.config.org_id)
