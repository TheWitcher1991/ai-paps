import multiprocessing
import os

WORKERS = int(os.getenv("WORKERS", multiprocessing.cpu_count() * 2 + 1))
THREADS = int(os.getenv("THREADS", multiprocessing.cpu_count()))

name = "paps_wsgi"

bind = "0.0.0.0:5000"

loglevel = "warning"

workers = WORKERS
worker_class = "gthread"

threads = THREADS

max_requests = 1000
max_requests_jitter = 50

timeout = 30
graceful_timeout = 30

accesslog = "-"
errorlog = "-"

preload_app = True

reload = False
