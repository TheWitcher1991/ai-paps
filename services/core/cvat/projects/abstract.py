from abc import ABC, abstractmethod
from typing import Optional

from cvat.projects.types import PaginatedProjectReadList, ProjectRead, ProjectReadRequest
from cvat.rq.types import RqId
from cvat.shared.types import CVATDatasetFormat


class ProjectAbstract(ABC):

    @abstractmethod
    def find_all(
        self,
        request: Optional[ProjectReadRequest] = None,
    ) -> PaginatedProjectReadList: ...

    @abstractmethod
    def find_one(self, project_id: int) -> Optional[ProjectRead]: ...

    @abstractmethod
    def export_dataset(
        self,
        project_id: int,
        format: CVATDatasetFormat,
        **kwargs,
    ) -> RqId: ...

    @abstractmethod
    def import_dataset(
        self,
        project_id: int,
        format: CVATDatasetFormat,
        **kwargs,
    ) -> RqId: ...

    @abstractmethod
    def export_backup(self, project_id: int, **kwargs) -> RqId: ...

    @abstractmethod
    def import_backup(self, **kwargs) -> RqId: ...
