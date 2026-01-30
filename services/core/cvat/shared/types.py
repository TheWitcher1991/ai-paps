from dataclasses import dataclass
from enum import StrEnum
from typing import Optional

import urllib3
from cvat_sdk.api_client.model.rq_id import RqId

RqResponse = tuple[Optional[RqId], urllib3.HTTPResponse]


@dataclass(frozen=True)
class PaginatedRequest:
    page: Optional[str] = None
    page_size: Optional[str] = None
    search: Optional[str] = None
    sort: Optional[str] = None


class CVATDatasetFormat(StrEnum):
    CAMVID = "CamVid 1.0"
    CITYSPACES = "Cityscapes 1.0"
    COCO = "COCO 1.0"
    COCO_KEYPOINTS = "COCO Keypoints 1.0"
    CVAT_FOR_IMAGES = "CVAT for images 1.1"
    CVAT_FOR_VIDEO = "CVAT for video 1.1"
    DATUMARO = "Datumaro 1.0"
    ICDAR = "ICDAR"
    IMAGENET = "ImageNet 1.0"
    KITTI = "KITTI 1.0"
    LABELME = "LabelMe 3.0"
    LFM = "LFW 1.0"
    MARKER1501 = "Market-1501 1.0"
    MOT = "MOT 1.0"
    MOTS = "MOTS PNG 1.0"
    OPEN_IMAGES = "Open Images 1.0"
    PASCAL_VOL = "PASCAL VOC 1.0"
    SEGMENTATION_MASK = "Segmentation Mask 1.0"
    VGGFACE = "VGGFace2 1.0"
    WIDET_FACE = "WIDER Face 1.0"
    YOLO = "YOLO 1.0"
    YOLO_DETECTION = "Ultralytics YOLO Detection 1.0"
    YOLO_SEGMENTATION = "Ultralytics YOLO Segmentation 1.0"
    YOLO_POSE = "Ultralytics YOLO Pose 1.0"
    YOLO_ORIENTED = "Ultralytics YOLO Oriented Bounding Boxes 1.0"
    YOLO_CLASSIFIACTION = "Ultralytics YOLO Classification 1.0"
