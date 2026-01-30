from rest_framework.authentication import TokenAuthentication

from packages.kernel.types import ExtendedRequest


class BaseAPIAuthentication(TokenAuthentication):
    keyword = "Bearer"
    model = None

    def authenticate(self, request: ExtendedRequest):
        return super().authenticate(request)

    def authenticate_credentials(self, key: str):
        return super().authenticate_credentials(key)

    def authenticate_header(self, request: ExtendedRequest):
        return super().authenticate_header(request)

    def get_auth_header(self, request: ExtendedRequest) -> str:
        auth_header = request.headers.get("Authorization", b"")
        return auth_header

    def get_token(self, auth_header) -> str | None:
        try:
            prefix, token = auth_header.split()
            return token
        except (ValueError, AttributeError):
            return None

    def get_prefix_and_token(self, auth_header) -> tuple[str, str] | tuple[None, None]:
        try:
            prefix, token = auth_header.split()
            return prefix, token
        except (ValueError, AttributeError):
            return None, None

    def get_user(self, user_id: int):
        raise NotImplementedError()
