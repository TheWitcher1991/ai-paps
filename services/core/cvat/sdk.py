from cvat.shared.config import CVATConfig
from cvat.users.usecase import CVATUsersUsecase


class CVAT:
    def __init__(self):
        self.config = CVATConfig()
        self.users = CVATUsersUsecase()


cvat = CVAT()
