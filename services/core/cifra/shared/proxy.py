from cifra.shared.exceptions import CifraServiceError


class CifraApiProxy:
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
            except CifraServiceError as e:
                raise RuntimeError(f"API error in {name}: {e}")

        return wrapper
