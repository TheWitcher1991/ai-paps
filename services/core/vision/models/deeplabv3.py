import cv2
import numpy as np
import torch
import torch.nn as nn
import torchvision
from torchvision.models.segmentation import deeplabv3_resnet50, deeplabv3_resnet101

from vision.types import VisionModelBackbone


class DeepLabV3Adapter(nn.Module):

    AVAILABLE_BACKBONES = {
        "resnet50": {"function": deeplabv3_resnet50, "channels": 2048, "description": "ResNet50 backbone"},
        "resnet101": {"function": deeplabv3_resnet101, "channels": 2048, "description": "ResNet101 backbone"},
    }

    def __init__(self, backbone: VisionModelBackbone, num_classes: int = 12, pretrained: bool = True, **kwargs):
        super(DeepLabV3Adapter, self).__init__()

        backbone_info = self.AVAILABLE_BACKBONES[backbone]
        model_fn = backbone_info["function"]

        if pretrained:
            self.model = model_fn(pretrained=True, **kwargs)
            in_channels = self.model.classifier[4].in_channels
            self.model.classifier[4] = nn.Conv2d(in_channels, num_classes, kernel_size=1)
        else:
            self.model = model_fn(pretrained=False, num_classes=num_classes, **kwargs)

    def forward(self, x):
        return self.model(x)["out"]
