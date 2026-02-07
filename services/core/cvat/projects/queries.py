from cvat.projects.types import ProjectReadRequest
from cvat.projects.adapters import CVATProjectAdapter
from packages.kernel.types import ExtendedRequest


class ProjectQuery:

    def __init__(self):
        self.projects = CVATProjectAdapter()

    def filter(self, request: ExtendedRequest):
        request = ProjectReadRequest(
            page=request.query_params.get("page", 1), page_size=request.query_params.get("page_size", 25)
        )
        return self.projects.find_all(request)

    def get_by_id(self, pk: int):
        return self.projects.find_one(pk)
