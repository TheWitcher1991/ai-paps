from packages.framework.usecases import RepositoryAdapter
from training.models import Model
from training.types import ModelId


class ModelRepository(RepositoryAdapter[Model, ModelId]):
    def __init__(self):
        super().__init__(Model)


model_repository = ModelRepository()
