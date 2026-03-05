from packages.framework.usecases import RepositoryAdapter
from training.models import Model, Training, TrainingConfig, TrainingRun
from training.types import ModelId, TrainingId


class ModelRepository(RepositoryAdapter[Model, ModelId]):
    def __init__(self):
        super().__init__(Model)


class TrainingRepository(RepositoryAdapter[Training, TrainingId]):
    def __init__(self):
        super().__init__(Training)


class TrainingConfigRepository(RepositoryAdapter[TrainingConfig, int]):
    def __init__(self):
        super().__init__(TrainingConfig)


class TrainingRunRepository(RepositoryAdapter[TrainingRun, int]):
    def __init__(self):
        super().__init__(TrainingRun)


model_repository = ModelRepository()
training_repository = TrainingRepository()
training_config_repository = TrainingConfigRepository()
training_run_repository = TrainingRunRepository()
