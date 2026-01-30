from cvat.shared.repository import CVATRepository


class CVATOrganizationRepository(CVATRepository):

    def __init__(self):
        super().__init__()
        self.api = self.session.organizations_api
