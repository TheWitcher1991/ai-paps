from rest_framework.decorators import action

from cvat.sdk import cvat
from cvat.shared.serializers import CVATPaginatedListSerializer
from cvat.shared.utils import cvat_paginated_list_to_dict
from packages.framework.controllers import APISetController
from packages.kernel.types import ExtendedRequest


class DirectorySetController(APISetController):
    prefix = "directory"

    @action(detail=False, methods=["get"])
    def labels(self, request: ExtendedRequest, *args, **kwargs):
        return self.get_response(CVATPaginatedListSerializer(cvat_paginated_list_to_dict(cvat.labels.find_all())).data)
