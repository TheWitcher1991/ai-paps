import os

from celery import Celery
from celery.schedules import crontab
from kombu import Exchange, Queue

from config.os import ENV_MODE

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")

app = Celery("config")
app.config_from_object("django.conf:settings", namespace="CELERY")
app.autodiscover_tasks()

DEFAULT_TASK_PRIORITY = 5
MAX_TASK_PRIORITY = 10
DEFAULT_CELERY_RETRY = 3
DEFAULT_CELERY_RETRY_DELAY = 15

app.conf.worker_prefetch_multiplier = 3
app.conf.worker_max_tasks_per_child = 100
# app.conf.worker_max_memory_per_child = 200000
app.conf.task_acks_late = True

app.conf.broker_transport_options = {
    "priority_steps": list(range(10)),
    "queue_order_strategy": "priority",
    "visibility_timeout": 3600,
}


class CeleryQueue:
    DEFAULT = "celery"


def create_celery_queue(name: str, priority=DEFAULT_TASK_PRIORITY):
    return Queue(name, Exchange(name), routing_key=name, queue_arguments={"x-max-priority": priority})


app.conf.task_queues = (create_celery_queue(CeleryQueue.DEFAULT),)

app.conf.task_default_queue = CeleryQueue.DEFAULT
app.conf.task_default_exchange_type = "direct"
app.conf.task_default_routing_key = CeleryQueue.DEFAULT
app.conf.task_queue_max_priority = MAX_TASK_PRIORITY
app.conf.task_default_priority = DEFAULT_TASK_PRIORITY


app.conf.task_routes = {}

app.conf.beat_schedule = {}
