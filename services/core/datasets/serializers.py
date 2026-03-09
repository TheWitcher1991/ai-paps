from django.db import transaction
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer, SerializerMethodField

from datasets.models import Dataset, DatasetAnnotation, DatasetAsset, DatasetClass
from datasets.types import ANNOTATION_CLASSES_DISEASES, ANNOTATION_CLASSES_FOR_AREA, ANNOTATION_CLASSES_PESTS, AnnotationView


class MergeDatasetsSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=255)
    description = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    dataset_ids = serializers.ListField(
        child=serializers.IntegerField(),
        min_length=2,
    )


class DatasetClassSerializer(ModelSerializer):
    class Meta:
        model = DatasetClass
        fields = "__all__"


class DatasetAnnotationSerializer(ModelSerializer):
    cls = DatasetClassSerializer(read_only=True)
    area_mm2 = SerializerMethodField(read_only=True)
    area_cm2 = SerializerMethodField(read_only=True)
    view = SerializerMethodField(read_only=True)

    class Meta:
        model = DatasetAnnotation
        fields = "__all__"

    def _calculate_area_mm2(self, obj: DatasetAnnotation):
        if obj.cls.name not in ANNOTATION_CLASSES_FOR_AREA:
            return None

        Z_mm = 500.0
        sensor_width_mm = 5.0
        focal_length_mm = 2.0

        image_width_px = obj.asset.width
        area_px = obj.area

        mm_per_px = (Z_mm * sensor_width_mm) / (focal_length_mm * image_width_px)

        area_mm2 = area_px * (mm_per_px**2)

        return area_mm2

    def get_area_mm2(self, obj):
        area = self._calculate_area_mm2(obj)
        return round(area, 2) if area else None

    def get_area_cm2(self, obj):
        area = self._calculate_area_mm2(obj)
        if area is None:
            return None
        return round(area / 100.0, 2)

    def get_view(self, obj: DatasetAnnotation):
        cls = obj.cls.name
        
        if cls in ANNOTATION_CLASSES_DISEASES:
            return AnnotationView.DISEASE
        if cls in ANNOTATION_CLASSES_PESTS:
            return AnnotationView.PEST
        else: 
            return AnnotationView.HEALTHY


class DatasetAssetSerializer(ModelSerializer):
    annotations = DatasetAnnotationSerializer(many=True, read_only=True)

    class Meta:
        model = DatasetAsset
        fields = "__all__"


class DatasetSerializer(ModelSerializer):
    classes = DatasetClassSerializer(many=True, read_only=True)
    description = serializers.SerializerMethodField()
    size = serializers.SerializerMethodField()
    count_assets = serializers.SerializerMethodField()
    count_classes = serializers.SerializerMethodField()
    count_annotations = serializers.SerializerMethodField()
    annotated_percent = serializers.SerializerMethodField()

    class Meta:
        model = Dataset
        fields = "__all__"

    @transaction.atomic
    def create(self, validated_data):
        return super().create(validated_data)

    @transaction.atomic
    def update(self, instance, validated_data):
        return super().update(instance, validated_data)

    def get_description(self, obj: Dataset):
        return 'Обучающий набор изображений томатов для семантической сегментации'
    
    def get_size(self, obj: Dataset):
        return obj.count_size()
    
    def get_count_assets(self, obj: Dataset):
        return obj.count_assets()
    
    def get_count_annotations(self, obj: Dataset):
        return obj.count_annotations()
    
    def get_count_classes(self, obj: Dataset):
        return obj.count_classes()

    def get_annotated_percent(self, obj: Dataset):
        return obj.get_annotated_percent()
