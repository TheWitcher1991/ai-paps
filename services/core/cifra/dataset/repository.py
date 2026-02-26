from cifra.dataset.types import DatasetsResponse, DatasetCollectRequest, DatasetCollectResponse
from cifra.shared.repository import CifraRepository
from cifra.shared.types import CifraResponse


class DatasetRepository(CifraRepository):

    def __init__(self):
        super().__init__()

    def list(self) -> CifraResponse[DatasetsResponse]:
        return self.execute(self.client.get, "datasets/list/").data

    def collect_dataset(self, request: DatasetCollectRequest) -> CifraResponse[DatasetCollectResponse]:
        return self.execute(self.client.get, "datasets/collect_dataset/", request).data

    def load_markup_classes(self):
        pass

    def load_image_meta(self):
        pass
