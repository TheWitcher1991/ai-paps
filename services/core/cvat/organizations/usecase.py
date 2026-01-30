from cvat.organizations.repository import CVATOrganizationRepository
from cvat.shared.usecase import CVATUsecase


class CVATOrganizationsUsecase(CVATUsecase):

    def __init__(self):
        self.repo = CVATOrganizationRepository()
