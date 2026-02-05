from cvat.sdk import cvat
from cvat.shared.serializers import CVATPaginatedListSerializer
from cvat.shared.utils import cvat_paginated_list_to_dict
from packages.framework.controllers import APISetController
from packages.kernel.types import ExtendedRequest


class UserSetController(APISetController):
    prefix = "users"

    def list(self, request: ExtendedRequest, *args, **kwargs):
        return self.get_response(CVATPaginatedListSerializer(cvat_paginated_list_to_dict(cvat.users.find_all())).data)
