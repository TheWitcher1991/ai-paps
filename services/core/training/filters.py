from models.models import Model

from packages.kernel.adapters import FilterAdapter


class ModelFilter(FilterAdapter):
    class Meta:
        model = Model
        fields = ("subset", "framework")
