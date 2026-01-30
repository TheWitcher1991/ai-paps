from rest_framework import mixins
from rest_framework.permissions import AllowAny
from rest_framework.viewsets import GenericViewSet


class ReadonlyViewSet(mixins.RetrieveModelMixin, mixins.ListModelMixin, GenericViewSet):
    """
    A viewset that provides default `retrieve()`, `list()` actions.
    """

    pass


class ReadUpdateViewSet(mixins.RetrieveModelMixin, mixins.UpdateModelMixin, mixins.ListModelMixin, GenericViewSet):
    """
    A viewset that provides default `retrieve()`, `update()`,
    `partial_update()`, `list()` actions.
    """

    pass


class ListUpdateViewSet(mixins.UpdateModelMixin, mixins.ListModelMixin, GenericViewSet):
    """
    A viewset that provides default `update()`,
    `partial_update()`, `list()` actions.
    """

    pass


class ReadCreateViewSet(mixins.RetrieveModelMixin, mixins.CreateModelMixin, mixins.ListModelMixin, GenericViewSet):
    """
    A viewset that provides default `retrieve()`, `create()`, `list()` actions.
    """

    pass


class AllowAnyMixin(object):
    permission_classes = (AllowAny,)
    authentication_classes = ()
