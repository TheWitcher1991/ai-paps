class ProjectAnnotationPort(ABC):

    @abstractmethod
    def find_all(
        self,
        request: Optional[ProjectReadRequest] = None,
    ) -> PaginatedResult[ProjectRead]:
        pass

    @abstractmethod
    def find_one(self, project_id: int) -> Optional[ProjectRead]:
        pass

    @abstractmethod
    def export_dataset(
        self,
        project_id: int,
        format: DatasetFormat,
        **kwargs,
    ) -> RqId:
        pass

    @abstractmethod
    def import_dataset(
        self,
        project_id: int,
        format: DatasetFormat,
        **kwargs,
    ) -> RqId:
        pass

    @abstractmethod
    def export_backup(self, project_id: int, **kwargs) -> RqId:
        pass

    @abstractmethod
    def import_backup(self, **kwargs) -> RqId:
        pass