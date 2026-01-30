from typing import Dict

from config.settings import AUTH_TOKEN_TYPE
from packages.kernel.types import JWTAuthenticated, JWTRefreshSession, JWTSignedSession
from packages.kernel.utils import jwt_decode, jwt_encode, jwt_is_valid
from users.types import UserId
from users.usecases import user
from users.usecases.user import user_use_case


class JWTUseCase:

    def sign(self, user) -> JWTSignedSession:
        access_token, access_token_expires = jwt_encode(user)
        refresh_token, refresh_token_expires = jwt_encode(user, is_refresh=True)

        return {
            "user": user.id,
            "refresh_token": refresh_token,
            "access_token": access_token,
            "session_expires": refresh_token_expires.timestamp(),
            "access_expires": access_token_expires.timestamp(),
            "token_type": AUTH_TOKEN_TYPE,
        }

    def refresh(self, user) -> JWTRefreshSession:
        access_token, access_token_expires = jwt_encode(user)

        return {
            "access_token": access_token,
            "access_expires": access_token_expires.timestamp(),
        }

    def decode(self, token: str) -> dict:
        return jwt_decode(token)

    def verify(self, token: str) -> bool:
        return jwt_is_valid(token)

    def authenticate(self, token: str) -> JWTAuthenticated:
        payload = jwt_decode(token)

        user_id = UserId(payload["user_id"])
        user = user_use_case.get_by_id(user_id)

        return {
            "user": user.id,
            "token": token,
        }


jwt_use_case = JWTUseCase()
