from typing import NewType

from django.db import models

from packages.kernel.utils import t

DatasetId = NewType("DatasetId", int)
DatasetAssetId = NewType("DatasetAssetId", int)
DatasetClassId = NewType("DatasetClassId", int)
DatasetAnnotationId = NewType("DatasetAnnotationId", int)


class DatasetSource(models.TextChoices):
    PROJECTS = "projects", t("Проекты")
    TASKS = "tasks", t("Задачи")
    JOBS = "jobs", t("Работы")
    USERS = "users", t("Пользователи")


class DatasetStatus(models.TextChoices):
    UPLOADED = (
        "uploaded",
        t("Загружен"),
    )
    ANNOTATION = "annotation", t("Размечается")
    COMPLETED = "completed", t("Завершен")


class AnnotationStatus(models.TextChoices):
    NOT_ANNOTATED = "not_annotated", t("Не размечен")
    IN_PROGRESS = "in_progress", t("В работе")
    ANNOTATION = "annotation", t("Размечается")
    ANNOTATED = "annotated", t("Размечен")
    VALIDATION = "validation", t("Проверяется")
    REVIEWED = "reviewed", t("Проверен")
    COMPLETED = "completed", t("Завершен")


class AnnotationDimension(models.TextChoices):
    D2 = "2d", t("2d")
    D3 = "3d", t("3d")


class AnnotationType(models.TextChoices):
    VIDEO = "video", t("Видео")
    IMAGESET = "imageset", t("Набор изображений")
    LIST = "list", t("Список")


class DatasetFormat(models.TextChoices):
    CAMVID = "CamVid 1.0", t("CamVid 1.0")
    CITYSPACES = "Cityscapes 1.0", t("Cityscapes 1.0")
    COCO = "COCO 1.0", t("COCO 1.0")
    COCO_KEYPOINTS = "COCO Keypoints 1.0", t("COCO Keypoints 1.0")
    CVAT_FOR_IMAGES = "CVAT for images 1.1", t("CVAT for images 1.1")
    CVAT_FOR_VIDEO = "CVAT for video 1.1", t("CVAT for video 1.1")
    DATUMARO = "Datumaro 1.0", t("Datumaro 1.0")
    ICDAR = "ICDAR", t("ICDAR")
    IMAGENET = "ImageNet 1.0", t("ImageNet 1.0")
    KITTI = "KITTI 1.0", t("KITTI 1.0")
    LABELME = "LabelMe 3.0", t("LabelMe 3.0")
    LFM = "LFW 1.0", t("LFW 1.0")
    MARKER1501 = "Market-1501 1.0", t("Market-1501 1.0")
    MOT = "MOT 1.0", t("MOT 1.0")
    MOTS = "MOTS PNG 1.0", t("MOTS PNG 1.0")
    OPEN_IMAGES = "Open Images 1.0", t("Open Images 1.0")
    PASCAL_VOL = "PASCAL VOC 1.0", t("PASCAL VOC 1.0")
    SEGMENTATION_MASK = "Segmentation Mask 1.0", t("Segmentation Mask 1.0")
    VGGFACE = "VGGFace2 1.0", t("VGGFace2 1.0")
    WIDET_FACE = "WIDER Face 1.0", t("WIDER Face 1.0")
    YOLO = "YOLO 1.0", t("YOLO 1.0")
    YOLO_DETECTION = "Ultralytics YOLO Detection 1.0", t("Ultralytics YOLO Detection 1.0")
    YOLO_SEGMENTATION = "Ultralytics YOLO Segmentation 1.0", t("Ultralytics YOLO Segmentation 1.0")
    YOLO_POSE = "Ultralytics YOLO Pose 1.0", t("Ultralytics YOLO Pose 1.0")
    YOLO_ORIENTED = "Ultralytics YOLO Oriented Bounding Boxes 1.0", t("Ultralytics YOLO Oriented Bounding Boxes 1.0")
    YOLO_CLASSIFIACTION = "Ultralytics YOLO Classification 1.0", t("Ultralytics YOLO Classification 1.0")
