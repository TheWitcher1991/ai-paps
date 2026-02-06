from cvat.controllers import (
    JobSetController,
    LabelSetController,
    MembershipSetController,
    OrganizationSetController,
    ProjectSetController,
    TaskSetController,
    UserSetController,
)
from packages.framework.routers import auto_router

app_name = "cvat"

router = auto_router(ProjectSetController)

urlpatterns = router.urls
