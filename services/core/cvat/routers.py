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

router = auto_router(
    JobSetController,
    LabelSetController,
    MembershipSetController,
    OrganizationSetController,
    ProjectSetController,
    TaskSetController,
    UserSetController,
)

urlpatterns = router.urls
