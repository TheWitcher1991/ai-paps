from django.conf import settings

from packages.kernel.types import LoggerResource


class LoggerUseCase:

    def __init__(self):
        pass

    def logger(self, resource_type: LoggerResource = LoggerResource.kernel, **kwargs):
        raise NotImplementedError

    def _log(self, level: str, message: str, resource_type: LoggerResource = LoggerResource.kernel, **kwargs):
        level = level.upper()
        print(f"[{level}] {message}")

    def info(self, message, resource_type: LoggerResource = LoggerResource.kernel, **kwargs):
        self._log("INFO", message, resource_type=resource_type, **kwargs)

    def warning(self, message, resource_type: LoggerResource = LoggerResource.kernel, **kwargs):
        self._log("WARNING", message, resource_type=resource_type, **kwargs)

    def error(self, message, resource_type: LoggerResource = LoggerResource.kernel, **kwargs):
        self._log("ERROR", message, resource_type=resource_type, **kwargs)

    def debug(self, message, resource_type: LoggerResource = LoggerResource.kernel, **kwargs):
        if settings.DEBUG:
            print(f"DEBUG: {message} {kwargs}")
        else:
            self._log("DEBUG", message, resource_type=resource_type, **kwargs)

    def critical(self, message, resource_type: LoggerResource = LoggerResource.kernel, **kwargs):
        self._log("CRITICAL", message, resource_type=resource_type, **kwargs)


logger = LoggerUseCase()
