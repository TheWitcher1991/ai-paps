from pathlib import Path

import torch
import torch.nn as nn
from torchvision.models.detection import MaskRCNN
from torchvision.models.detection.faster_rcnn import FastRCNNPredictor
from torchvision.models.detection.mask_rcnn import MaskRCNNPredictor

from vision.backbone import BackboneBuilder
from vision.types import BackboneConfig


class MaskRCNNAdapter(nn.Module):
    def __init__(self, num_classes: int, backbone_cfg: BackboneConfig, weights_path: str = None):
        super().__init__()

        backbone = BackboneBuilder.build(backbone_cfg)

        self.model = MaskRCNN(
            backbone=backbone,
            num_classes=num_classes,
        )

        if weights_path and Path(weights_path).exists():
            self.model.load_state_dict(torch.load(weights_path))

        self._replace_heads(num_classes)

    def _replace_heads(self, num_classes):
        in_features = self.model.roi_heads.box_predictor.cls_score.in_features
        self.model.roi_heads.box_predictor = FastRCNNPredictor(in_features, num_classes)

        in_mask = self.model.roi_heads.mask_predictor.conv5_mask.in_channels
        self.model.roi_heads.mask_predictor = MaskRCNNPredictor(in_mask, 256, num_classes)

    def forward(self, images, targets=None):
        return self.model(images, targets)

    def load_state_dict(self, state_dict, strict=True):
        self.model.load_state_dict(state_dict, strict=strict)

    def state_dict(self, *args, **kwargs):
        return self.model.state_dict(*args, **kwargs)
