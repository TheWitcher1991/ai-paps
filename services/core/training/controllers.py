from rest_framework import status
from rest_framework.decorators import action
from rest_framework.parsers import MultiPartParser
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
from training.services.inference_service import InferenceService


class ModelSetController(ModelSetController):
    prefix = "models"

    queryset = model_use_case.optimize()
    serializer_class = ModelSerializer
    filterset_class = ModelFilter


class TrainingSetController(ModelSetController):
    prefix = "trainings"

    queryset = training_use_case.optimize()
    serializer_class = TrainingSerializer
    filterset_class = TrainingFilter

    @action(detail=True, methods=["post"], serializer_class=TrainingRunSerializer)
    def start(self, request, pk=None):
        logger.info(f"Starting training: {pk}")
        training, run = training_use_case.start_training(pk)
        serializer = TrainingSerializer(training)
        data = serializer.data
        data["run"] = TrainingRunSerializer(run).data
        return Response(data)

    @action(detail=True, methods=["get"], serializer_class=TrainingRunSerializer)
    def runs(self, request, pk=None):
        runs = training_run_use_case.all(pk)
        serializer = TrainingRunSerializer(runs, many=True)
        return Response(serializer.data)


class TrainingRunController(BaseSetController):
    prefix = "training/runs"
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

from drf_spectacular.utils import extend_schema, OpenApiParameter, OpenApiExample
from drf_spectacular.types import OpenApiTypes

class InferenceController(BaseSetController):
    prefix = "inferences"
    parser_classes = [MultiPartParser]

    @action(detail=True, methods=["post"])
    def predict(self, request, pk=None):
        model = model_use_case.get(pk)
        if not model:
            return Response({"error": "Model not found"}, status=status.HTTP_404_NOT_FOUND)

        if not model.file:
            return Response({"error": "Model file not found"}, status=status.HTTP_404_NOT_FOUND)

        image_file = request.FILES.get("image")
        if not image_file:
            return Response({"error": "No image provided"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            inference_service = InferenceService(
                model_file=model.file,
                architecture=model.architecture,
                backbone=model.backbone,
            )

            mask = inference_service.predict_mask(image_file)

            return Response({
                "mask": mask.tolist(),
                "shape": mask.shape,
            })
        except Exception as e:
            logger.error(f"Inference failed: {str(e)}")
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @extend_schema(
        request={
            'multipart/form-data': {
                'type': 'object',
                'properties': {
                    'image': {
                        'type': 'string',
                        'format': 'binary',
                        'description': 'Image file for inference'
                    }
                },
                'required': ['image']
            }
        },
        responses={
            200: {
                'type': 'object',
                'properties': {
                    'mask': {
                        'type': 'array',
                        'items': {'type': 'number'},
                        'description': 'Predicted mask'
                    },
                    'confidence': {
                        'type': 'number',
                        'description': 'Confidence score'
                    }
                    # Добавьте другие поля, которые возвращает predict_with_confidence
                }
            },
            400: {'description': 'Bad request - no image provided'},
            404: {'description': 'Model not found'},
            500: {'description': 'Internal server error'}
        },
        description='Predict mask with confidence score for image using specified model'
    )
    @action(detail=True, methods=["post"])
    def predict_with_confidence(self, request, pk=None):
        model = model_use_case.get(pk)
        if not model:
            return Response({"error": "Model not found"}, status=status.HTTP_404_NOT_FOUND)

        if not model.file:
            return Response({"error": "Model file not found"}, status=status.HTTP_404_NOT_FOUND)

        image_file = request.FILES.get("image")
        if not image_file:
            return Response({"error": "No image provided"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            inference_service = InferenceService(
                model_file=model.file,
                architecture=model.architecture,
                backbone=model.backbone,
            )

            result = inference_service.predict_with_confidence(image_file)

            return Response(result)
        except Exception as e:
            logger.error(f"Inference failed: {str(e)}")
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
