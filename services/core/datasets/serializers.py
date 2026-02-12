from django.db import transaction
from rest_framework.serializers import ModelSerializer

from datasets.models import Dataset, DatasetAnnotation, DatasetAsset, DatasetClass


class DatasetClassSerializer(ModelSerializer):
    class Meta:
        model = DatasetClass
        fields = "__all__"


class DatasetAnnotationSerializer(ModelSerializer):
    cls = DatasetClassSerializer(read_only=True, source="class")

    class Meta:
        model = DatasetAnnotation
        fields = "__all__"


class DatasetAssetSerializer(ModelSerializer):
    annotations = DatasetAnnotationSerializer(many=True, read_only=True)

    class Meta:
        model = DatasetAsset
        fields = "__all__"


class DatasetSerializer(ModelSerializer):
    classes = DatasetClassSerializer(many=True, read_only=True)

    class Meta:
        model = Dataset
        fields = "__all__"

    @transaction.atomic
    def create(self, validated_data):
        return super().create(validated_data)

    @transaction.atomic
    def update(self, instance, validated_data):
        return super().update(instance, validated_data)
