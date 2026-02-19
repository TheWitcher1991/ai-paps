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


class BackboneType(StrEnum):
    resnet50 = "resnet50"
    resnet101 = "resnet101"
    resnet152 = "resnet152"
    resnext101 = "resnext101"
    efficientnet_b5 = "efficientnet_b5"
    efficientnet_b6 = "efficientnet_b6"
    efficientnet_b7 = "efficientnet_b7"


@dataclass
class BackboneConfig:
    name: BackboneType
    pretrained: bool = True
