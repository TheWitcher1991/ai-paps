import json
from typing import Optional

from requests import sessions, Response

from cifra.shared.config import CifraConfig
from cifra.shared.exceptions import CifraApiException


class CifraClient:
    _instance = None

    def __init__(self, configuration: CifraConfig):
        self.configuration = configuration
        self.base_url = configuration.host

    def get_api_instance(self):
        session = sessions.Session()
        session.headers.update({
            'Authorization': f'Bearer {self.configuration.token}',
            'User-Agent': 'paps-python-client',
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        })
        return session

    def get(self, endpoint: str, params: Optional[dict] = None, **kwargs) -> Response:
        return self._request('GET', endpoint, params=params, **kwargs)

    def post(self, endpoint: str, data: Optional[dict] = None, json: Optional[dict] = None, **kwargs) -> Response:
        return self._request('POST', endpoint, data=data, json=json, **kwargs)

    def put(self, endpoint: str, data: Optional[dict] = None, **kwargs) -> Response:
        return self._request('PUT', endpoint, data=data, **kwargs)

    def delete(self, endpoint: str, **kwargs) -> Response:
        return self._request('DELETE', endpoint, **kwargs)

    def _request(self, method: str, endpoint: str, **kwargs) -> Response:
        url = f'{self.base_url}/{endpoint.lstrip("/")}'

        with self.get_api_instance() as session:
            response = session.request(method, url, **kwargs)

            if not response.ok:
                try:
                    error_data = response.json()
                    reason = error_data.get('message', error_data.get('error', 'Unknown error'))
                except (json.JSONDecodeError, AttributeError):
                    reason = response.text or f"HTTP {response.status_code}"

                raise CifraApiException(reason=reason, status=response.status_code)

            return response
