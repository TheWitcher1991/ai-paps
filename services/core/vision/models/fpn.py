import torch.nn as nn
from torchvision.models import resnet101


class FPNWithResNet101(nn.Module):

    def __init__(self, num_classes, pretrained=True):
        super(FPNWithResNet101, self).__init__()

        resnet = resnet101(pretrained=pretrained)

        self.layer0 = nn.Sequential(resnet.conv1, resnet.bn1, resnet.relu, resnet.maxpool)
        self.layer1 = resnet.layer1
        self.layer2 = resnet.layer2
        self.layer3 = resnet.layer3
        self.layer4 = resnet.layer4

        self.lateral4 = nn.Conv2d(2048, 256, kernel_size=1)
        self.lateral3 = nn.Conv2d(1024, 256, kernel_size=1)
        self.lateral2 = nn.Conv2d(512, 256, kernel_size=1)
        self.lateral1 = nn.Conv2d(256, 256, kernel_size=1)

        self.smooth4 = nn.Conv2d(256, 256, kernel_size=3, padding=1)
        self.smooth3 = nn.Conv2d(256, 256, kernel_size=3, padding=1)
        self.smooth2 = nn.Conv2d(256, 256, kernel_size=3, padding=1)
        self.smooth1 = nn.Conv2d(256, 256, kernel_size=3, padding=1)

        self.classifier = nn.Conv2d(256, num_classes, kernel_size=3, padding=1)

    def forward(self, x):
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

        return output
