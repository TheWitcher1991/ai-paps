import torch.nn as nn
from torchvision.models import resnet50, resnet101, resnet152

from vision.types import VisionModelBackbone


class FPNWithBackboneAdapter(nn.Module):

    AVAILABLE_BACKBONES = {
        "resnet50": {
            "function": resnet50,
            "channels": [256, 512, 1024, 2048],
            "description": "ResNet50 backbone",
            "params": "~25.6M",
        },
        "resnet101": {
            "function": resnet101,
            "channels": [256, 512, 1024, 2048],
            "description": "ResNet101 backbone",
            "params": "~44.5M",
        },
        "resnet152": {
            "function": resnet152,
            "channels": [256, 512, 1024, 2048],
            "description": "ResNet152 backbone",
            "params": "~60.2M",
        },
    }

    def __init__(self, backbone: VisionModelBackbone, num_classes: int = 12, pretrained: bool = True, **kwargs):
        super(FPNWithBackboneAdapter, self).__init__()

        backbone_info = self.AVAILABLE_BACKBONES[backbone]
        backbone_fn = backbone_info["function"]
        self.backbone_channels = backbone_info["channels"]

        model = backbone_fn(pretrained=pretrained)

        self.layer0 = nn.Sequential(model.conv1, model.bn1, model.relu, model.maxpool)
        self.layer1 = model.layer1
        self.layer2 = model.layer2
        self.layer3 = model.layer3
        self.layer4 = model.layer4

        self.lateral4 = nn.Conv2d(2048, 256, kernel_size=1)
        self.lateral3 = nn.Conv2d(1024, 256, kernel_size=1)
        self.lateral2 = nn.Conv2d(512, 256, kernel_size=1)
        self.lateral1 = nn.Conv2d(256, 256, kernel_size=1)

        self.smooth4 = nn.Conv2d(256, 256, kernel_size=3, padding=1)
        self.smooth3 = nn.Conv2d(256, 256, kernel_size=3, padding=1)
        self.smooth2 = nn.Conv2d(256, 256, kernel_size=3, padding=1)
        self.smooth1 = nn.Conv2d(256, 256, kernel_size=3, padding=1)

        classifier_layers = [nn.Conv2d(256, 256, kernel_size=3, padding=1), nn.BatchNorm2d(256), nn.ReLU(inplace=True)]

        classifier_layers.append(nn.Conv2d(256, num_classes, kernel_size=1))

        self.classifier = nn.Sequential(*classifier_layers)

    def forward(self, x):
        input_size = x.shape[2:]

        c1 = self.layer0(x)
        c2 = self.layer1(c1)
        c3 = self.layer2(c2)
        c4 = self.layer3(c3)
        c5 = self.layer4(c4)

        p5 = self.lateral4(c5)
        p4 = self.lateral3(c4) + nn.functional.interpolate(p5, size=c4.shape[2:], mode="nearest")
        p3 = self.lateral2(c3) + nn.functional.interpolate(p4, size=c3.shape[2:], mode="nearest")
        p2 = self.lateral1(c2) + nn.functional.interpolate(p3, size=c2.shape[2:], mode="nearest")

        p4 = self.smooth4(p4)
        p3 = self.smooth3(p3)
        p2 = self.smooth2(p2)
        p1 = self.smooth1(p2)

        p4 = nn.functional.interpolate(p4, size=p1.shape[2:], mode="bilinear", align_corners=False)
        p3 = nn.functional.interpolate(p3, size=p1.shape[2:], mode="bilinear", align_corners=False)

        fpn_features = p1 + p2 + p3 + p4

        output = self.classifier(fpn_features)

        if output.shape[2:] != input_size:
            output = nn.functional.interpolate(output, size=input_size, mode="bilinear", align_corners=False)

        return output
