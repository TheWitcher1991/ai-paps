from packages.framework.controllers import ReadOnlyModelSetController
from training.filters import ModelFilter
from training.serializers import ModelSerializer
from training.usecases import model_use_case


class ModelSetController(ReadOnlyModelSetController):
    prefix = "models"

    queryset = model_use_case.optimize()
    serializer_class = ModelSerializer
    filterset_class = ModelFilter
