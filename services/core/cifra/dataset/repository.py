from cifra.dataset.types import (
    DatasetCollectRequest,
    DatasetCollectResponse,
    DatasetsResponse,
    ImageMetaRequest,
    ImageMetaResponse,
    MarkupClassesRequest,
    MarkupClassesResponse,
)
from cifra.shared.repository import CifraRepository


class CifraDatasetRepository(CifraRepository):

    def __init__(self):
        super().__init__()

    def list(self) -> DatasetsResponse:
        return self.execute(self.client.get, "datasets/list/").data

    def collect_dataset(self, request: DatasetCollectRequest) -> DatasetCollectResponse:
        return self.execute(self.client.get, "datasets/collect_dataset/", request).data

    def load_markup_classes(self, request: MarkupClassesRequest) -> MarkupClassesResponse:
        return self.execute(self.client.get, "datasets/load_markup_classes/", request).data

    def load_image_meta(self, request: ImageMetaRequest) -> ImageMetaResponse:
        return self.execute(self.client.get, "datasets/load_image_meta/", request).data
