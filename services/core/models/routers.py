from models.controllers import ModelSetController
from packages.framework.routers import auto_router

app_name = "models"

router = auto_router(ModelSetController)

urlpatterns = router.urls
