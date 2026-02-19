from torchvision.models import efficientnet_b5, efficientnet_b6, efficientnet_b7
from torchvision.models.detection.backbone_utils import BackboneWithFPN

from vision.types import BackboneConfig, BackboneType


def efficientnet_backbone(cfg: BackboneConfig):
    if cfg.name == BackboneType.efficientnet_b5:
        model = efficientnet_b5(weights="DEFAULT" if cfg.pretrained else None)
        in_channels_list = [32, 56, 160, 512]
        out_channels = 256
    elif cfg.name == BackboneType.efficientnet_b6:
        model = efficientnet_b6(weights="DEFAULT" if cfg.pretrained else None)
        in_channels_list = [32, 56, 168, 544]
        out_channels = 256
    elif cfg.name == BackboneType.efficientnet_b7:
        model = efficientnet_b7(weights="DEFAULT" if cfg.pretrained else None)
        in_channels_list = [32, 64, 176, 576]
        out_channels = 256
    else:
        raise ValueError(cfg.name)

    return BackboneWithFPN(
        model,
        return_layers={
            "features.2": "0",
            "features.4": "1",
            "features.6": "2",
            "features.8": "3",
        },
        in_channels_list=in_channels_list,
        out_channels=out_channels,
    )
