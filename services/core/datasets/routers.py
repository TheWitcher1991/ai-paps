from django.urls import path

from datasets.controllers import (
    DatasetAnnotationSetController,
    DatasetAssetSetController,
    DatasetClassSetController,
    DatasetMergeController,
    DatasetSetController,
)
from packages.framework.routers import auto_router

app_name = "datasets"

router = auto_router(
    DatasetSetController, DatasetAssetSetController, DatasetClassSetController, DatasetAnnotationSetController
)

urlpatterns = router.urls + [
    path("merge/", DatasetMergeController.as_view(), name="merge"),
]
