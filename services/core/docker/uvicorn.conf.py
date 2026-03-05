import multiprocessing

name = "paps_asgi"

bind = "0.0.0.0:5001"

loglevel = "warning"

workers = multiprocessing.cpu_count() * 2 + 1
worker_class = "uvicorn.workers.UvicornWorker"

max_requests = 1000
max_requests_jitter = 50

timeout = 30
graceful_timeout = 30

accesslog = "-"
errorlog = "-"

preload_app = True

reload = False
