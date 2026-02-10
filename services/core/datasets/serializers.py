from django.db import transaction
from rest_framework.serializers import ModelSerializer

from datasets.models import Dataset, DatasetFile


class DatasetFileSerializer(ModelSerializer):
    class Meta:
        model = DatasetFile
        fields = '__all__'

    @transaction.atomic
    def create(self, validated_data):
        return super().create(validated_data)

    @transaction.atomic
    def update(self, instance, validated_data):
        return super().update(instance, validated_data)


class DatasetSerializer(ModelSerializer):

    class Meta:
        model = Dataset
        fields = '__all__'

    @transaction.atomic
    def create(self, validated_data):
        return super().create(validated_data)

    @transaction.atomic
    def update(self, instance, validated_data):
        return super().update(instance, validated_data)
