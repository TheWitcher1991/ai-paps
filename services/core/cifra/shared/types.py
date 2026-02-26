from dataclasses import dataclass, asdict
from typing import Generic, Mapping, TypeVar

R = TypeVar("R")


@dataclass(frozen=True)
class CifraResponse(Generic[R]):
    """Wrapper для ответа Cifra API"""

    data: R
    status: int
    headers: Mapping[str, str]


@dataclass(frozen=True)
class CifraRequest:
    def to_query(self) -> dict:
        return {k: v for k, v in asdict(self).items() if v is not None}
