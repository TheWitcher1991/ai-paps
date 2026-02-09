from cvat.jobs.queries import JobQuery
from cvat.jobs.serializers import JobReadSerializer
from cvat.labels.queries import LabelQuery
from cvat.labels.serializers import LabelSerializer
from cvat.memberships.queries import MembershipQuery
from cvat.memberships.serializers import MembershipReadSerializer
from cvat.organizations.queries import OrganizationQuery
from cvat.organizations.serializers import OrganizationReadSerializer
from cvat.projects.queries import ProjectQuery
from cvat.projects.serializers import ProjectReadSerializer
from cvat.rq.queries import RequestQuery
from cvat.rq.serializers import RequestSerializer
from cvat.shared.serializers import CVATPaginatedListSerializer
from cvat.storages.queries import StorageQuery
from cvat.storages.serializers import CloudStorageReadSerializer
from cvat.tasks.queries import TaskQuery
from cvat.tasks.serializers import TaskReadSerializer
from cvat.users.queries import UserQuery
from cvat.users.serializers import MetaUserSerializer
from packages.framework.controllers import APISetController
from packages.kernel.types import ExtendedRequest


class JobSetController(APISetController):
    prefix = "jobs"

    queries = JobQuery()

    def list(self, request: ExtendedRequest, *args, **kwargs):
        queryset = self.queries.filter(request)
        serializer = CVATPaginatedListSerializer(queryset)
        return self.get_response(serializer.data)

    def retrieve(self, pk: int, request: ExtendedRequest, *args, **kwargs):
        instance = self.queries.get_by_id(pk)
        serializer = JobReadSerializer(instance)
        return self.get_response(serializer.data)


class LabelSetController(APISetController):
    prefix = "labels"

    queries = LabelQuery()

    def list(self, request: ExtendedRequest, *args, **kwargs):
        queryset = self.queries.filter(request)
        serializer = CVATPaginatedListSerializer(queryset)
        return self.get_response(serializer.data)

    def retrieve(self, pk: int, request: ExtendedRequest, *args, **kwargs):
        instance = self.queries.get_by_id(pk)
        serializer = LabelSerializer(instance)
        return self.get_response(serializer.data)


class MembershipSetController(APISetController):
    prefix = "memberships"

    queries = MembershipQuery()

    def list(self, request: ExtendedRequest, *args, **kwargs):
        queryset = self.queries.filter(request)
        serializer = CVATPaginatedListSerializer(queryset)
        return self.get_response(serializer.data)

    def retrieve(self, pk: int, request: ExtendedRequest, *args, **kwargs):
        instance = self.queries.get_by_id(pk)
        serializer = MembershipReadSerializer(instance)
        return self.get_response(serializer.data)


class OrganizationSetController(APISetController):
    prefix = "organizations"

    queries = OrganizationQuery()

    def list(self, request: ExtendedRequest, *args, **kwargs):
        queryset = self.queries.filter(request)
        serializer = CVATPaginatedListSerializer(queryset)
        return self.get_response(serializer.data)

    def retrieve(self, pk: int, request: ExtendedRequest, *args, **kwargs):
        instance = self.queries.get_by_id(pk)
        serializer = OrganizationReadSerializer(instance)
        return self.get_response(serializer.data)


class ProjectSetController(APISetController):
    prefix = "projects"

    queries = ProjectQuery()

    def list(self, request: ExtendedRequest, *args, **kwargs):
        queryset = self.queries.filter(request)
        serializer = CVATPaginatedListSerializer(queryset)
        return self.get_response(serializer.data)

    def retrieve(self, pk: int, request: ExtendedRequest, *args, **kwargs):
        instance = self.queries.get_by_id(pk)
        serializer = ProjectReadSerializer(instance)
        return self.get_response(serializer.data)


class RequestSetController(APISetController):
    prefix = "requests"

    queries = RequestQuery()

    def list(self, request: ExtendedRequest, *args, **kwargs):
        queryset = self.queries.filter(request)
        serializer = CVATPaginatedListSerializer(queryset)
        return self.get_response(serializer.data)

    def retrieve(self, pk: int, request: ExtendedRequest, *args, **kwargs):
        instance = self.queries.get_by_id(pk)
        serializer = RequestSerializer(instance)
        return self.get_response(serializer.data)


class StorageSetController(APISetController):
    prefix = "storages"

    queries = StorageQuery()

    def list(self, request: ExtendedRequest, *args, **kwargs):
        queryset = self.queries.filter(request)
        serializer = CVATPaginatedListSerializer(queryset)
        return self.get_response(serializer.data)

    def retrieve(self, pk: int, request: ExtendedRequest, *args, **kwargs):
        instance = self.queries.get_by_id(pk)
        serializer = CloudStorageReadSerializer(instance)
        return self.get_response(serializer.data)


class TaskSetController(APISetController):
    prefix = "tasks"

    queries = TaskQuery()

    def list(self, request: ExtendedRequest, *args, **kwargs):
        queryset = self.queries.filter(request)
        serializer = CVATPaginatedListSerializer(queryset)
        return self.get_response(serializer.data)

    def retrieve(self, pk: int, request: ExtendedRequest, *args, **kwargs):
        instance = self.queries.get_by_id(pk)
        serializer = TaskReadSerializer(instance)
        return self.get_response(serializer.data)


class UserSetController(APISetController):
    prefix = "users"

    queries = UserQuery()

    def list(self, request: ExtendedRequest, *args, **kwargs):
        queryset = self.queries.filter(request)
        serializer = CVATPaginatedListSerializer(queryset)
        return self.get_response(serializer.data)

    def retrieve(self, pk: int, request: ExtendedRequest, *args, **kwargs):
        instance = self.queries.get_by_id(pk)
        serializer = MetaUserSerializer(instance)
        return self.get_response(serializer.data)
