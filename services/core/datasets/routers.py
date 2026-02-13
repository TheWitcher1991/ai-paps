from datasets.controllers import (
    DatasetAnnotationSetController,
    DatasetAssetSetController,
    DatasetClassSetController,
    DatasetSetController,
)
from packages.framework.routers import auto_router

app_name = "datasets"

router = auto_router(
    DatasetSetController, DatasetAssetSetController, DatasetClassSetController, DatasetAnnotationSetController
)

urlpatterns = router.urls
