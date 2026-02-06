from cvat.jobs.queries import JobsQuery
from cvat.jobs.serializers import JobReadSerializer
from cvat.labels.queries import LabelsQuery
from cvat.labels.serializers import LabelSerializer
from cvat.memberships.queries import MembershipsQuery
from cvat.memberships.serializers import MembershipReadSerializer
from cvat.organizations.queries import OrganizationsQuery
from cvat.organizations.serializers import OrganizationReadSerializer
from cvat.projects.queries import ProjectsQuery
from cvat.projects.serializers import ProjectReadSerializer
from cvat.shared.serializers import CVATPaginatedListSerializer
from cvat.tasks.queries import TasksQuery
from cvat.tasks.serializers import TaskReadSerializer
from cvat.users.queries import UsersQuery
from cvat.users.serializers import MetaUserSerializer
from packages.framework.controllers import APISetController
from packages.kernel.types import ExtendedRequest


class JobSetController(APISetController):
    prefix = "jobs"

    queries = JobsQuery()

    def list(self, request: ExtendedRequest, *args, **kwargs):
        queryset = self.queries.filter(request)
        serializer = CVATPaginatedListSerializer(queryset)
        return self.get_response(serializer.data)

    def get(self, pk: int, request: ExtendedRequest, *args, **kwargs):
        instance = self.queries.get_by_id(pk)
        serializer = JobReadSerializer(instance)
        return self.get_response(serializer.data)


class LabelSetController(APISetController):
    prefix = "labels"

    queries = LabelsQuery()

    def list(self, request: ExtendedRequest, *args, **kwargs):
        queryset = self.queries.filter(request)
        serializer = CVATPaginatedListSerializer(queryset)
        return self.get_response(serializer.data)

    def get(self, pk: int, request: ExtendedRequest, *args, **kwargs):
        instance = self.queries.get_by_id(pk)
        serializer = LabelSerializer(instance)
        return self.get_response(serializer.data)


class MembershipSetController(APISetController):
    prefix = "memberships"

    queries = MembershipsQuery()

    def list(self, request: ExtendedRequest, *args, **kwargs):
        queryset = self.queries.filter(request)
        serializer = CVATPaginatedListSerializer(queryset)
        return self.get_response(serializer.data)

    def get(self, pk: int, request: ExtendedRequest, *args, **kwargs):
        instance = self.queries.get_by_id(pk)
        serializer = MembershipReadSerializer(instance)
        return self.get_response(serializer.data)


class OrganizationSetController(APISetController):
    prefix = "organizations"

    queries = OrganizationsQuery()

    def list(self, request: ExtendedRequest, *args, **kwargs):
        queryset = self.queries.filter(request)
        serializer = CVATPaginatedListSerializer(queryset)
        return self.get_response(serializer.data)

    def get(self, pk: int, request: ExtendedRequest, *args, **kwargs):
        instance = self.queries.get_by_id(pk)
        serializer = OrganizationReadSerializer(instance)
        return self.get_response(serializer.data)


class ProjectSetController(APISetController):
    prefix = "projects"

    queries = ProjectsQuery()

    def list(self, request: ExtendedRequest, *args, **kwargs):
        queryset = self.queries.filter(request)
        serializer = CVATPaginatedListSerializer(queryset)
        return self.get_response(serializer.data)

    def get(self, pk: int, request: ExtendedRequest, *args, **kwargs):
        instance = self.queries.get_by_id(pk)
        serializer = ProjectReadSerializer(instance)
        return self.get_response(serializer.data)


class TaskSetController(APISetController):
    prefix = "tasks"

    queries = TasksQuery()

    def list(self, request: ExtendedRequest, *args, **kwargs):
        queryset = self.queries.filter(request)
        serializer = CVATPaginatedListSerializer(queryset)
        return self.get_response(serializer.data)

    def get(self, pk: int, request: ExtendedRequest, *args, **kwargs):
        instance = self.queries.get_by_id(pk)
        serializer = TaskReadSerializer(instance)
        return self.get_response(serializer.data)


class UserSetController(APISetController):
    prefix = "users"

    queries = UsersQuery()

    def list(self, request: ExtendedRequest, *args, **kwargs):
        queryset = self.queries.filter(request)
        serializer = CVATPaginatedListSerializer(queryset)
        return self.get_response(serializer.data)

    def get(self, pk: int, request: ExtendedRequest, *args, **kwargs):
        instance = self.queries.get_by_id(pk)
        serializer = MetaUserSerializer(instance)
        return self.get_response(serializer.data)
