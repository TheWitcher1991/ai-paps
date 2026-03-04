from cifra.dataset.adapters import CifraDatasetAdapter
from cifra.shared.config import CifraConfig


class CifraFacade:
    def __init__(self):
        self.config = CifraConfig()

        self.datasets = CifraDatasetAdapter()


cifra = CifraFacade()
