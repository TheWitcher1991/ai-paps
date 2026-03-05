from packages.kernel.adapters import FilterAdapter
from training.models import Model, Training


class ModelFilter(FilterAdapter):
    class Meta:
        model = Model
        fields = ("subset", "framework", "architecture", "status")


class TrainingFilter(FilterAdapter):
    class Meta:
        model = Training
        fields = ("model",)
