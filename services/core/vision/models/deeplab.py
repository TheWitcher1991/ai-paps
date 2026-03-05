import cv2
import numpy as np
import torch
import torch.nn as nn
import torchvision
from torchvision.models.segmentation import deeplabv3_resnet101


class DeepLabV3(nn.Module):

    def __init__(self, num_classes=21, pretrained=True):
        super(DeepLabV3, self).__init__()

        if pretrained:
            self.model = deeplabv3_resnet101(pretrained=True)
            self.model.classifier[4] = nn.Conv2d(256, num_classes, kernel_size=1)
        else:
            self.model = deeplabv3_resnet101(pretrained=False, num_classes=num_classes)

    def forward(self, x):
        return self.model(x)["out"]
