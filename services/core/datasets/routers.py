from datasets.controllers import DatasetAssetSetController, DatasetSetController
from packages.framework.routers import auto_router

app_name = "datasets"

router = auto_router(DatasetSetController, DatasetAssetSetController)

urlpatterns = router.urls
