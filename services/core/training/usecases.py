from packages.framework.usecases import UseCaseAdapter
from training.repositories import ModelRepository


class ModelUseCase(UseCaseAdapter):
    def __init__(self):
        self.repo = ModelRepository()

    def optimize(self):
        return self.repo.all()


model_use_case = ModelUseCase()
