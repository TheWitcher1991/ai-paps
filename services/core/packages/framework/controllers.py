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
    authentication_classes_map: Dict[str, List[Type[TAuth]]] = {}
    permission_classes_map: Dict[str, List[Type[TPermission]]] = {}
    serializer_class_map: Dict[str, Type[TSerializer]] = {}

    action_map = None

    def _get_action_or_method(self) -> str:
        return getattr(self, "action", self.request.method).lower()

    def _initialize_authenticators(self, classes: Optional[List[Type[TAuth]]] = None) -> List[TAuth]:
        auth_classes = classes if classes is not None else getattr(self, "authentication_classes", [])
        return [auth() for auth in auth_classes]

    def _initialize_permissions(self, classes: Optional[List[Type[TPermission]]] = None) -> List[TPermission]:
        perm_classes = classes if classes is not None else getattr(self, "permission_classes", [])
        return [perm() for perm in perm_classes]

    def get_authenticators(self) -> list[TAuth]:
        assert self.authentication_classes or self.authentication_classes_map, (
            '"%s" должен либо включать `authentication_classes`, '
            "`authentication_classes_map`, атрибут, либо переопределять "
            "`get_authenticators()` метод." % self.__class__.__name__
        )

        if not self.authentication_classes_map:
            return self._initialize_authenticators()

        action_or_method = self._get_action_or_method()
        auth_classes = self.authentication_classes_map.get(action_or_method)
        return self._initialize_authenticators(auth_classes)

    def get_permissions(self) -> list[TPermission]:
        assert self.permission_classes or self.permission_classes_map, (
            '"%s" должен либо включать `permission_classes`, '
            "`permission_classes_map`, атрибут, либо переопределять "
            "`get_permissions()` метод." % self.__class__.__name__
        )

        if not self.permission_classes_map:
            return self._initialize_permissions()

        action_or_method = self._get_action_or_method()
        permission_classes = self.permission_classes_map.get(action_or_method)
        return self._initialize_permissions(permission_classes)

    def get_serializer_class(self) -> TSerializer:
        assert self.serializer_class or self.serializer_class_map, (
            '"%s" должен либо включать `serializer_class`, '
            "`serializer_class_map`, атрибут, либо переопределять "
            "`get_serializer_class()` метод." % self.__class__.__name__
        )

        if not self.serializer_class_map:
            return self.serializer_class

        action_or_method = self._get_action_or_method()
        return self.serializer_class_map.get(action_or_method) or self.serializer_class

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
    permission_classes = (IsAuthenticated,)
    permission_types = ()


class BaseSetController(APISetController):
    permission_classes = (IsAuthenticated,)
    permission_types = ()


class ReadOnlyModelSetController(mixins.RetrieveModelMixin, mixins.ListModelMixin, BaseSetController):
    pass


class ModelSetBaseSetController(
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
