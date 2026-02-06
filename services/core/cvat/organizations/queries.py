from cvat.organizations.types import OrganizationReadRequest
from cvat.organizations.usecase import CVATOrganizationsUsecase
from packages.kernel.types import ExtendedRequest


class OrganizationsQuery:

    def __init__(self):
        self.use_case = CVATOrganizationsUsecase()

    def filter(self, request: ExtendedRequest):
        request = OrganizationReadRequest(
            page=request.query_params.get("page", 1), page_size=request.query_params.get("page_size", 25)
        )
        return self.use_case.find_all(request)

    def get_by_id(self, pk: int):
        return self.use_case.find_one(pk)

    def get_ncmu(self):
        return self.use_case.find_ncmu()
