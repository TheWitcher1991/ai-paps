from typing import Type

from rest_framework.routers import SimpleRouter

from packages.framework.controllers import Controller


def auto_router(*controllers: Type[Controller]):
    router = SimpleRouter()

    for ctrl in controllers:
        basename = getattr(ctrl, "basename", None)
        if basename is None:
            basename = ctrl.prefix

        router.register(
            ctrl.prefix,
            ctrl,
            basename=basename,
        )

    return router
