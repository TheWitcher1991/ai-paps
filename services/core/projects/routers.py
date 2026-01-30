from packages.framework.routers import auto_router
from projects.controllers import ProjectSetController

app_name = "projects"

router = auto_router(ProjectSetController)

urlpatterns = router.urls
