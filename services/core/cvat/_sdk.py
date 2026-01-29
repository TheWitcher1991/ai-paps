from cvat.utils.client import cvat_client
from cvat.utils.config import CVATConfig


class CVAT:
    def __init__(self):
        self.config = CVATConfig()
        self.client = cvat_client


cvat = CVAT()