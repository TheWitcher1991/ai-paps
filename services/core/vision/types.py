from dataclasses import dataclass
from enum import StrEnum
from typing import Dict, List

import torch

ImageTensor = torch.Tensor
Images = List[ImageTensor]

LossDict = Dict[str, torch.Tensor]

DetectionTarget = Dict[str, torch.Tensor]
DetectionTargets = List[DetectionTarget]

DetectionPrediction = Dict[str, torch.Tensor]
DetectionPredictions = List[DetectionPrediction]


class VisionModelBackbone(StrEnum):
    resnet50 = "resnet50"
    resnet101 = "resnet101"
    resnet152 = "resnet152"


class VisionModelType(StrEnum):
    deeplabv3 = "deeplabv3"
    fpn = "fpn"
    unet = "unet"
    yolo = "yolo"
    mask_rcnn = "mask_rcnn"


@dataclass
class BackboneConfig:
    name: VisionModelBackbone
    pretrained: bool = True
