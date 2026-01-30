from packages.framework.routers import auto_router
from recognitions.controllers import RecognitionSetController

app_name = "recognitions"

router = auto_router(RecognitionSetController)

urlpatterns = router.urls
