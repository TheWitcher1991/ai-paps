from directory.controllers import DirectorySetController
from packages.framework.routers import auto_router

app_name = "directory"

router = auto_router(DirectorySetController)

urlpatterns = router.urls
