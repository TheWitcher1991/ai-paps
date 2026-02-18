from django.db import transaction
from rest_framework.serializers import ModelSerializer, SerializerMethodField

from datasets.models import Dataset, DatasetAnnotation, DatasetAsset, DatasetClass
from datasets.types import AnnotationClass


class DatasetClassSerializer(ModelSerializer):
    class Meta:
        model = DatasetClass
        fields = "__all__"


class DatasetAnnotationSerializer(ModelSerializer):
    cls = DatasetClassSerializer(read_only=True)
    area_mm2 = SerializerMethodField(read_only=True)

    class Meta:
        model = DatasetAnnotation
        fields = "__all__"

    def get_area_mm2(self, obj: DatasetAnnotation) -> float:
        if obj.cls.name in [AnnotationClass.TOMATO_LEAF, AnnotationClass.TOMATO_FRUIT]:
            return 0.0

        Z = 500.0
        fx = 615.0
        fy = 615.0

        area_px = obj.area

        area_mm2 = (area_px * Z**2) / (fx * fy)

        return area_mm2


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
