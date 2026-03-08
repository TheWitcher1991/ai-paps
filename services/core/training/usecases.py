from datetime import datetime
from packages.framework.usecases import UseCaseAdapter
from packages.usecases.logging import logger
from training.repositories import (
    ModelRepository,
    TrainingConfigRepository,
    TrainingRepository,
    TrainingRunRepository,
)
from training.types import TrainingId


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
        return self.repo.get_by_id(training_id)

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
        from training.background import get_training_runner

        training = self.repo.get_by_id(training_id)
        logger.info(f"Scheduling training: {training_id}")

        runner = get_training_runner()
        runner.start_async(training_id)

        run = self.run_repo.model.objects.filter(training_id=training_id).last()

        return training, run

    def cancel_training(self, run_id: int):
        from training.background import get_training_runner

        run = self.run_repo.get_by_id(run_id)

        runner = get_training_runner()
        runner.cancel(run.training_id)

        run.status = "cancelled"
        run.finished_date = datetime.now()
        run.save()
        logger.info(f"Training run cancelled: {run_id}")
        return run


class TrainingRunUseCase(UseCaseAdapter):
    def __init__(self):
        self.repo = TrainingRunRepository()

    def all(self, training_id: int):
        return self.repo.model.objects.filter(training_id=training_id)

    def get(self, run_id: int):
        return self.repo.get_by_id(run_id)


model_use_case = ModelUseCase()
training_use_case = TrainingUseCase()
training_run_use_case = TrainingRunUseCase()
