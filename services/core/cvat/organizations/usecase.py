from typing import Optional

from cvat_sdk.api_client import ApiException

from cvat.organizations.repository import CVATOrganizationRepository
from cvat.organizations.types import OrganizationRead, OrganizationReadRequest, PaginatedOrganizationReadList
from cvat.shared.exceptions import CVATServiceError
from cvat.shared.usecase import CVATUsecase


class CVATOrganizationsUsecase(CVATUsecase):

    def __init__(self):
        self.repo = CVATOrganizationRepository()

    def find_all(self, request: Optional[OrganizationReadRequest] = None) -> PaginatedOrganizationReadList:
        try:
            return self.repo.find_all(request)
        except ApiException as e:
            raise CVATServiceError(e.reason, e.status)

    def find_one(self, organization_id: int) -> Optional[OrganizationRead]:
        try:
            return self.repo.find_one(organization_id)
        except ApiException as e:
            raise CVATServiceError(e.reason, e.status)

    def find_ncmu(self) -> Optional[OrganizationRead]:
        try:
            return self.repo.find_ncmu()
        except ApiException as e:
            raise CVATServiceError(e.reason, e.status)
