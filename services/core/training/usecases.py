from packages.framework.usecases import UseCaseAdapter
from packages.usecases.logging import logger
from training.repositories import (
    ModelRepository,
    TrainingConfigRepository,
    TrainingRepository,
    TrainingRunRepository,
)
from training.types import ModelId, TrainingId


class ModelUseCase(UseCaseAdapter):
    def __init__(self):
        self.repo = ModelRepository()

    def optimize(self):
        return self.repo.all()


class TrainingUseCase(UseCaseAdapter):
    def __init__(self):
        self.repo = TrainingRepository()
        self.config_repo = TrainingConfigRepository()
        self.run_repo = TrainingRunRepository()

    def optimize(self):
        return self.repo.all()

    def get(self, training_id: TrainingId):
        return self.repo.get(training_id)

    def create(self, data: dict):
        training = self.repo.create(data)
        logger.info(f"Training created: {training.id}")
        return training

    def update(self, training_id: TrainingId, data: dict):
        training = self.repo.update(training_id, data)
        logger.info(f"Training updated: {training.id}")
        return training

    def delete(self, training_id: TrainingId):
        self.repo.delete(training_id)
        logger.info(f"Training deleted: {training_id}")

    def start_training(self, training_id: TrainingId):
        from training.services.training_service import TrainingService

        training = self.repo.get(training_id)
        logger.info(f"Starting training: {training_id}")

        service = TrainingService(training)
        service.run()

        logger.info(f"Training completed: {training_id}")
        return training

    def cancel_training(self, run_id: int):
        run = self.run_repo.get(run_id)
        run.status = "cancelled"
        run.save()
        logger.info(f"Training run cancelled: {run_id}")
        return run


class TrainingRunUseCase(UseCaseAdapter):
    def __init__(self):
        self.repo = TrainingRunRepository()

    def all(self, training_id: int):
        return self.repo.model.objects.filter(training_id=training_id)

    def get(self, run_id: int):
        return self.repo.get(run_id)


model_use_case = ModelUseCase()
training_use_case = TrainingUseCase()
training_run_use_case = TrainingRunUseCase()
