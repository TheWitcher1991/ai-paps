from django.urls import include, path
from rest_framework.routers import DefaultRouter

from packages.framework.routers import auto_router
from training.controllers import (
    InferenceController,
    ModelSetController,
    TrainingRunController,
    TrainingSetController,
)

app_name = "models"

router = DefaultRouter()
router.register(r"models", ModelSetController, basename="models")
router.register(r"training", TrainingSetController, basename="training")
router.register(r"training-runs", TrainingRunController, basename="training-runs")
router.register(r"inference", InferenceController, basename="inference")

urlpatterns = [
    path("", include(router.urls)),
]
