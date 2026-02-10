from cvat.projects.adapters import CVATProjectAdapter
from cvat.projects.types import ProjectReadRequest
from cvat.shared.utils import cvat_paginated_list_to_dict
from packages.kernel.types import ExtendedRequest


class ProjectQuery:

    def __init__(self):
        self.projects = CVATProjectAdapter()

    def filter(self, request: ExtendedRequest):
        page = int(request.query_params.get("page", 1))
        page_size = int(request.query_params.get("page_size", 25))

        request = ProjectReadRequest(
            page=page,
            page_size=page_size,
        )

        return cvat_paginated_list_to_dict(self.projects.find_all(request))

    def get_by_id(self, pk: int):
        return self.projects.find_one(pk)
