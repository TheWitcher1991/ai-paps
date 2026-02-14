from typing import Any, Dict, List, Optional, Type, TypeVar

from rest_framework import generics, mixins, viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK

from .mixins import AllowAnyMixin

TAuth = TypeVar("TAuth")
TPermission = TypeVar("TPermission")
TSerializer = TypeVar("TSerializer")


class Controller:
    prefix: str
    basename: str = None

    def get_response(self, data: Any = None, status: int = HTTP_200_OK, serializer=None) -> Response:
        if serializer:
            if isinstance(data, list):
                return Response(serializer(data, many=True).data, status=status)
            else:
                return Response(serializer(data).data, status=status)
        else:
            return Response(data, status=status)


class APIController(Controller, generics.GenericAPIView):
    pass


class APISetController(Controller, viewsets.ViewSetMixin, generics.GenericAPIView):
    pass


class AnonymousController(AllowAnyMixin, APIController):
    pass


class BaseController(APIController):
    permission_classes = ()
    permission_types = ()


class BaseSetController(APISetController):
    permission_classes = ()
    permission_types = ()


class ReadOnlyModelSetController(mixins.RetrieveModelMixin, mixins.ListModelMixin, BaseSetController):
    pass


class ModelSetController(
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    mixins.ListModelMixin,
    BaseSetController,
):
    pass


class CreateController(mixins.CreateModelMixin, BaseController):
    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class ListController(mixins.ListModelMixin, BaseController):
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)


class RetrieveController(mixins.RetrieveModelMixin, BaseController):
    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)


class DestroyController(mixins.DestroyModelMixin, BaseController):
    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)


class UpdateController(mixins.UpdateModelMixin, BaseController):
    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)


class ListCreateController(mixins.ListModelMixin, mixins.CreateModelMixin, BaseController):
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class RetrieveUpdateController(mixins.RetrieveModelMixin, mixins.UpdateModelMixin, BaseController):
    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)


class RetrieveDestroyController(mixins.RetrieveModelMixin, mixins.DestroyModelMixin, BaseController):
    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)


class RetrieveUpdateDestroyController(
    mixins.RetrieveModelMixin, mixins.UpdateModelMixin, mixins.DestroyModelMixin, BaseController
):
    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)
