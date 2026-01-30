from datasets.controllers import DatasetSetController
from packages.framework.routers import auto_router

app_name = "datasets"

router = auto_router(DatasetSetController)

urlpatterns = router.urls
