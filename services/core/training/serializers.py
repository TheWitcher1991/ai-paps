from rest_framework import serializers

from datasets.models import Dataset
from training.models import Model, Training, TrainingConfig, TrainingDataset, TrainingRun


class ModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Model
        fields = "__all__"


class TrainingConfigSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrainingConfig
        fields = "__all__"


class TrainingDatasetSerializer(serializers.ModelSerializer):
    dataset = serializers.SerializerMethodField()

    class Meta:
        model = TrainingDataset
        fields = "__all__"

    def get_dataset(self, obj):
        return {
            "id": obj.dataset.id,
            "name": obj.dataset.name,
            "format": obj.dataset.format,
            "subset": obj.dataset.subset,
            "modality": obj.dataset.modality,
            "status": obj.dataset.status,
        }


class TrainingRunSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrainingRun
        fields = "__all__"


class TrainingSerializer(serializers.ModelSerializer):
    config = TrainingConfigSerializer(required=False)
    datasets = TrainingDatasetSerializer(many=True, read_only=True)
    runs = TrainingRunSerializer(many=True, read_only=True)

    class Meta:
        model = Training
        fields = "__all__"

    def create(self, validated_data):
        config_data = validated_data.pop("config", None)
        training = Training.objects.create(**validated_data)
        if config_data:
            TrainingConfig.objects.create(training=training, **config_data)
        return training
