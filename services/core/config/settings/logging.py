from config.settings.base import BASE_DIR

BASE_LOGGING_HANDLER_CONF = {
    "level": "INFO",
    "class": "logging.handlers.RotatingFileHandler",
    "maxBytes": 1024 * 1024 * 10,
    "backupCount": 3,
    "encoding": "utf-8",
}

BASE_LOGGING_LOGGER_CONF = {
    "level": "INFO",
    "propagate": False,
}


def create_file_handler(log_file_path):
    return {
        **BASE_LOGGING_HANDLER_CONF,
        "filename": BASE_DIR / log_file_path,
    }


def create_logger(handler_name):
    return {
        **BASE_LOGGING_LOGGER_CONF,
        "handlers": [handler_name],
    }


LOG_PATHS = {
    "file": "config/logs/server.log",
}

for _path in LOG_PATHS.values():
    (BASE_DIR / _path).parent.mkdir(parents=True, exist_ok=True)

LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "root": {
        "level": "ERROR",
        "handlers": ["console"],
    },
    "formatters": {
        "standard": {
            "format": "[%(asctime)s] %(levelname)s [%(name)s:%(lineno)s] %(message)s",
        }
    },
    "handlers": {
        "console": {
            "class": "logging.StreamHandler",
        },
        **{
            name: {
                **BASE_LOGGING_HANDLER_CONF,
                "filename": BASE_DIR / path,
            }
            for name, path in LOG_PATHS.items()
        },
    },
    "loggers": {
        "django": {
            "level": "ERROR",
            "handlers": ["file", "console"],
            "propagate": True,
        },
        **{
            key: {
                **BASE_LOGGING_LOGGER_CONF,
                "handlers": [key],
            }
            for key in LOG_PATHS
            if key != "file"
        },
    },
}
