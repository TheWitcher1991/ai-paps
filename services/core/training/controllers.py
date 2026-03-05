from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response

from packages.framework.controllers import BaseSetController, ModelSetController
from packages.usecases.logging import logger
from training.filters import ModelFilter, TrainingFilter
from training.serializers import (
    ModelSerializer,
    TrainingRunSerializer,
    TrainingSerializer,
)
from training.usecases import model_use_case, training_run_use_case, training_use_case


class ModelSetController(ModelSetController):
    prefix = "models"

    queryset = model_use_case.optimize()
    serializer_class = ModelSerializer
    filterset_class = ModelFilter


class TrainingSetController(BaseSetController):
    prefix = "training"
    queryset = training_use_case.all()
    serializer_class = TrainingSerializer
    filterset_class = TrainingFilter

    def list(self, request, *args, **kwargs):
        queryset = training_use_case.all()
        serializer = TrainingSerializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        data = request.data
        training = training_use_case.create(data)
        serializer = TrainingSerializer(training)
        logger.info(f"Training created: {training.id}")
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def retrieve(self, request, *args, **kwargs):
        pk = kwargs.get("pk")
        training = training_use_case.get(pk)
        if not training:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = TrainingSerializer(training)
        return Response(serializer.data)

    def update(self, request, *args, **kwargs):
        pk = kwargs.get("pk")
        data = request.data
        training = training_use_case.update(pk, data)
        serializer = TrainingSerializer(training)
        return Response(serializer.data)

    def partial_update(self, request, *args, **kwargs):
        pk = kwargs.get("pk")
        data = request.data
        training = training_use_case.update(pk, data)
        serializer = TrainingSerializer(training)
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        pk = kwargs.get("pk")
        training_use_case.delete(pk)
        return Response(status=status.HTTP_204_NO_CONTENT)

    @action(detail=True, methods=["post"])
    def start(self, request, pk=None):
        logger.info(f"Starting training: {pk}")
        training = training_use_case.start_training(pk)
        serializer = TrainingSerializer(training)
        return Response(serializer.data)

    @action(detail=True, methods=["get"])
    def runs(self, request, pk=None):
        runs = training_run_use_case.all(pk)
        serializer = TrainingRunSerializer(runs, many=True)
        return Response(serializer.data)


class TrainingRunController(BaseSetController):
    prefix = "training-runs"
    queryset = training_run_use_case.all(0)
    serializer_class = TrainingRunSerializer

    def retrieve(self, request, *args, **kwargs):
        pk = kwargs.get("pk")
        run = training_run_use_case.get(pk)
        if not run:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = TrainingRunSerializer(run)
        return Response(serializer.data)

    @action(detail=True, methods=["post"])
    def cancel(self, request, pk=None):
        logger.info(f"Cancelling training run: {pk}")
        run = training_use_case.cancel_training(pk)
        serializer = TrainingRunSerializer(run)
        return Response(serializer.data)
