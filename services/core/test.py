from cvat_sdk.api_client import Configuration

from cvat.sdk import cvat
from cvat.shared.client import CVATClient
from cvat.shared.config import CVATConfig

print(
    CVATClient(Configuration(host=CVATConfig.host, username=CVATConfig.username, password=CVATConfig.password))
    .get_api_instance()
    .requests_api.list()
)
