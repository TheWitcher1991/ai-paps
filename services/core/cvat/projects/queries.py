from cvat.projects.types import ProjectReadRequest
from cvat.projects.usecase import CVATProjectsUsecase
from packages.kernel.types import ExtendedRequest


class ProjectsQuery:

    def __init__(self):
        self.use_case = CVATProjectsUsecase()

    def filter(self, request: ExtendedRequest):
        request = ProjectReadRequest(
            page=request.query_params.get("page", 1), page_size=request.query_params.get("page_size", 25)
        )
        return self.use_case.find_all(request)

    def get_by_id(self, pk: int):
        return self.use_case.find_one(pk)
