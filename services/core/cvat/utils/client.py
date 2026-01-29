from cvat_sdk import Client, make_client

from cvat.utils.config import CVATConfig

cvat_client: Client = make_client(
    host=CVATConfig.host, credentials=(CVATConfig.login, CVATConfig.password)
)