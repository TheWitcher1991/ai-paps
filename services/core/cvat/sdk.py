from cvat.jobs.usecase import CVATJobsUsecase
from cvat.labels.usecase import CVATLabelsUsecase
from cvat.memberships.usecase import CVATMembershipsUsecase
from cvat.organizations.usecase import CVATOrganizationsUsecase
from cvat.projects.usecase import CVATProjectsUsecase
from cvat.rq.usecase import CVATRequestsUsecase
from cvat.shared.config import CVATConfig
from cvat.tasks.usecase import CVATTasksUsecase
from cvat.users.usecase import CVATUsersUsecase


class CVAT:
    def __init__(self):
        self.config = CVATConfig()
        self.jobs = CVATJobsUsecase()
        self.labels = CVATLabelsUsecase()
        self.memberships = CVATMembershipsUsecase()
        self.organizations = CVATOrganizationsUsecase()
        self.projects = CVATProjectsUsecase()
        self.requests = CVATRequestsUsecase()
        self.tasks = CVATTasksUsecase()
        self.users = CVATUsersUsecase()


cvat = CVAT()
