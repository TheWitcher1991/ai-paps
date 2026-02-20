from packages.kernel.adapters import FilterAdapter
from training.models import Model


class ModelFilter(FilterAdapter):
    class Meta:
        model = Model
        fields = ("subset", "framework")
