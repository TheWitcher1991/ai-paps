import torch
import torch.nn as nn
from torchvision.models.segmentation import (
    DeepLabV3_ResNet50_Weights,
    deeplabv3_resnet50,
)


class VisionNetAdapter(nn.Module):
    def __init__(
        self,
        num_classes: int = 12,
        pretrained: bool = True,
        **kwargs,
    ):
        super(VisionNetAdapter, self).__init__()

        weights = DeepLabV3_ResNet50_Weights.DEFAULT if pretrained else None
        self.model = deeplabv3_resnet50(weights=weights, **kwargs)

        in_channels = self.model.classifier[4].in_channels
        self.model.classifier[4] = nn.Conv2d(in_channels, num_classes, kernel_size=1)

        self.use_aux_loss = use_aux_loss
        if use_aux_loss and hasattr(self.model, "aux_classifier"):
            in_channels_aux = self.model.aux_classifier[4].in_channels
            self.model.aux_classifier[4] = nn.Conv2d(
                in_channels_aux, num_classes, kernel_size=1
            )

        self.num_classes = num_classes

    def forward(self, x):
        output = self.model(x)

        if isinstance(output, dict):
            logits = output["out"]
        else:
            logits = output

        return logits
