from rest_framework import serializers

from datasets.models import Dataset, DatasetClass
from training.models import Model, Training, TrainingConfig, TrainingDataset, TrainingRun


class TrainingRunMetricsSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrainingRun
        fields = ["iou", "precision", "recall", "f1_score", "accuracy", "train_loss", "val_loss", "current_epoch", "status"]


class ModelSerializer(serializers.ModelSerializer):
    metrics = serializers.SerializerMethodField()
    classes = serializers.SerializerMethodField()
    training_count = serializers.SerializerMethodField()

    class Meta:
        model = Model
        fields = "__all__"

    def get_metrics(self, obj):
        latest_run = TrainingRun.objects.filter(training__model=obj).order_by("-created_date").first()
        if latest_run:
            return TrainingRunMetricsSerializer(latest_run).data
        return None

    def get_classes(self, obj):
        dataset_ids = TrainingDataset.objects.filter(
            training__model=obj
        ).values_list("dataset_id", flat=True).distinct()
        
        classes = DatasetClass.objects.filter(dataset_id__in=dataset_ids).values(
            "id", "name", "source_id"
        ).distinct()
        
        return list(classes)

    def get_training_count(self, obj):
        return TrainingRun.objects.filter(training__model=obj).count()


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
    config = TrainingConfigSerializer()
    datasets = TrainingDatasetSerializer(many=True, read_only=True)
    runs = TrainingRunSerializer(many=True, read_only=True)
    model = ModelSerializer(read_only=True)

    class Meta:
        model = Training
        fields = "__all__"

    def create(self, validated_data):
        config_data = validated_data.pop("config", None)
        training = Training.objects.create(**validated_data)
        if config_data:
            TrainingConfig.objects.create(training=training, **config_data)
        return training
