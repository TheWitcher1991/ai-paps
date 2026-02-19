from torch import nn

from vision.arch.efficientnet import efficientnet_backbone
from vision.arch.resnet import resnet_backbone
from vision.types import BackboneAdapter, BackboneConfig


class BackboneBuilder:

    @staticmethod
    def build(cfg: BackboneConfig) -> nn.Module:
        if cfg.name.startswith("resnet"):
            return resnet_backbone(cfg)

        if cfg.name.startswith("efficientnet"):
            return efficientnet_backbone(cfg)

        raise ValueError(f"Unknown backbone: {cfg.name}")
