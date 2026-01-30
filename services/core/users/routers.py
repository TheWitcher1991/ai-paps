from packages.framework.routers import auto_router
from users.controllers import UserSetController

app_name = "users"

router = auto_router(UserSetController)

urlpatterns = router.urls
