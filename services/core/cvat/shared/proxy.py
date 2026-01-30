from cvat_sdk.api_client import exceptions


class CVATApiProxy:
    def __init__(self, api):
        self._api = api

    def __getattr__(self, name):
        api_method = getattr(self._api, name)

        def wrapper(*args, **kwargs):
            try:
                result = api_method(*args, **kwargs)
                if isinstance(result, tuple):
                    return result[0]
                return result
            except exceptions.ApiException as e:
                raise RuntimeError(f"API error in {name}: {e}")

        return wrapper
