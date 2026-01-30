from cvat.jobs.usecase import CVATJobsUsecase
from cvat.labels.usecase import CVATLabelsUsecase
from cvat.organizations.usecase import CVATOrganizationsUsecase
from cvat.projects.usecase import CVATProjectsUsecase
from cvat.shared.config import CVATConfig
from cvat.tasks.usecase import CVATTasksUsecase
from cvat.users.usecase import CVATUsersUsecase


class CVAT:
    def __init__(self):
        self.config = CVATConfig()
        self.jobs = CVATJobsUsecase()
        self.labels = CVATLabelsUsecase()
        self.organizations = CVATOrganizationsUsecase()
        self.projects = CVATProjectsUsecase()
        self.tasks = CVATTasksUsecase()
        self.users = CVATUsersUsecase()


cvat = CVAT()
