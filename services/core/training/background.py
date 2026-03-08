import os
from concurrent.futures import ProcessPoolExecutor, Future
from typing import Optional

_executor: Optional[ProcessPoolExecutor] = None
_running_tasks: dict[int, Future] = {}


def _init_worker():
    import django
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
    django.setup()


def _run_training_task(training_id: int):
    from django.db import close_old_connections
    from packages.usecases.logging import logger
    from training.services.training_service import TrainingService
    from training.repositories import TrainingRepository

    close_old_connections()

    training = TrainingRepository().get_by_id(training_id)
    if not training:
        logger.error(f"Training not found: {training_id}")
        return None

    service = TrainingService(training)
    service.run()

    return training_id


class TrainingRunner:
    _instance: Optional["TrainingRunner"] = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance._executor = None
            cls._instance._running_tasks = {}
        return cls._instance

    def __init__(self):
        from packages.usecases.logging import logger
        from config.settings import TRAINING_WORKERS

        if self._executor is None:
            max_workers = TRAINING_WORKERS
            self._executor = ProcessPoolExecutor(
                max_workers=max_workers,
                initializer=_init_worker,
            )
            logger.info(f"TrainingRunner initialized with {max_workers} workers")

    def start_async(self, training_id: int) -> int:
        from packages.usecases.logging import logger

        logger.info(f"Scheduling training {training_id} in background")

        future = self._executor.submit(_run_training_task, training_id)
        self._running_tasks[training_id] = future

        return training_id

    def cancel(self, training_id: int) -> bool:
        from packages.usecases.logging import logger

        future = self._running_tasks.get(training_id)
        if future and not future.done():
            cancelled = future.cancel()
            logger.info(f"Training {training_id} cancellation: {cancelled}")
            return cancelled
        return False

    def get_status(self, training_id: int) -> Optional[str]:
        future = self._running_tasks.get(training_id)
        if future:
            if future.done():
                return "finished" if not future.cancelled() else "cancelled"
            return "running"
        return None

    def is_running(self, training_id: int) -> bool:
        future = self._running_tasks.get(training_id)
        return future is not None and not future.done()


def get_training_runner() -> TrainingRunner:
    return TrainingRunner()
