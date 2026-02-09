from rest_framework import serializers
from rest_framework.serializers import Serializer

from cvat.shared.serializers import CVATSummarySerializer


class ProjectReadSerializer(Serializer):
    tasks = CVATSummarySerializer(many=True)
    labels = CVATSummarySerializer(many=True)
    url = serializers.URLField()
    id = serializers.IntegerField()
    name = serializers.CharField()
    owner = serializers.DictField()
    assignee = serializers.DictField()
    guide_id = serializers.IntegerField()
    bug_tracker = serializers.CharField()
    tasks_subsets = serializers.ListField()
    created_date = serializers.DateTimeField()
    updated_date = serializers.DateTimeField()
    status = serializers.CharField()
    dimension = serializers.CharField()
    organization_id = serializers.IntegerField()
    target_storage = serializers.DictField()
    source_storage = serializers.DictField()
    assignee_updated_date = serializers.DateTimeField()

