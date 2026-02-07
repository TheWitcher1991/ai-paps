from dataclasses import dataclass


@dataclass(frozen=True)
class AnnotationData:
    total: int
    annotated: int
    not_annotated: int
