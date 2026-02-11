from datasets.controllers import DatasetSetController, DatasetAssetSetController
from packages.framework.routers import auto_router

app_name = "datasets"

router = auto_router(DatasetSetController, DatasetAssetSetController)

urlpatterns = router.urls
