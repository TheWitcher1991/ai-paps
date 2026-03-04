from cifra.dataset.abstract import DatasetAbstract
from cifra.dataset.repository import CifraDatasetRepository
from cifra.dataset.types import (
    DatasetCollectRequest,
    DatasetCollectResponse,
    DatasetsResponse,
    ImageMetaRequest,
    ImageMetaResponse,
    MarkupClassesRequest,
    MarkupClassesResponse,
)
from cifra.shared.exceptions import CifraApiException, CifraServiceError


class CifraDatasetAdapter(DatasetAbstract):

    def __init__(self):
        self.repo = CifraDatasetRepository()

    def list(self) -> DatasetsResponse:
        try:
            return self.repo.list()
        except CifraApiException as e:
            raise CifraServiceError(e.reason, e.status)

    def collect_dataset(self, request: DatasetCollectRequest) -> DatasetCollectResponse:
        try:
            return self.repo.collect_dataset(request)
        except CifraApiException as e:
            raise CifraServiceError(e.reason, e.status)

    def load_markup_classes(self, request: MarkupClassesRequest) -> MarkupClassesResponse:
        try:
            return self.repo.load_markup_classes(request)
        except CifraApiException as e:
            raise CifraServiceError(e.reason, e.status)

    def load_image_meta(self, request: ImageMetaRequest) -> ImageMetaResponse:
        try:
            return self.repo.load_image_meta(request)
        except CifraApiException as e:
            raise CifraServiceError(e.reason, e.status)
