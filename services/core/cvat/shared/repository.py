from cvat_sdk.api_client import Configuration

from cvat.shared.client import CVATClient
from cvat.shared.config import CVATConfig


class CVATRepository:

    def __init__(self):
        self.config = CVATConfig()
        self.client = CVATClient(Configuration(
            host=self.config.host,
            username=self.config.username,
            password=self.config.password
        ))

    @property
    def session(self):
        return self.client.get_api_instance()
