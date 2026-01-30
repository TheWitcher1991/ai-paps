from cvat_sdk.api_client import ApiClient, Configuration


class CVATClient:
    _instance = None

    def __init__(self, configuration: Configuration):
        self.configuration = configuration

    def get_api_instance(self):
        return ApiClient(self.configuration)
