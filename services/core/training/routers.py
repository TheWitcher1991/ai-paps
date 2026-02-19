from packages.framework.routers import auto_router
from training.controllers import ModelSetController

app_name = "models"

router = auto_router(ModelSetController)

urlpatterns = router.urls
