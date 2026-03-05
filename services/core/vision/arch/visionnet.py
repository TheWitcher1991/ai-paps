from vision.models.deeplabv3 import DeepLabV3Adapter
from vision.models.fpn import FPNWithBackboneAdapter
from vision.models.mask_rcnn import MaskRCNNAdapter
from vision.models.u_net import UNetAdapter
from vision.models.yolo import YoloAdapter
from vision.types import BackboneConfig, VisionModelBackbone, VisionModelType


def create_visisionnet(
    model_type: VisionModelType, backbone: VisionModelBackbone, num_classes: int = 12, pretrained: bool = True
):

    if model_type == VisionModelType.yolo:
        return YoloAdapter(num_classes=num_classes)

    if model_type == VisionModelType.unet:
        return UNetAdapter(n_channels=3, n_classes=num_classes)

    if model_type == VisionModelType.deeplabv3:
        return DeepLabV3Adapter(backbone=backbone, num_classes=num_classes)

    if model_type == VisionModelType.fpn:
        return FPNWithBackboneAdapter(backbone=backbone, num_classes=num_classes)

    if model_type == VisionModelType.mask_rcnn:
        return MaskRCNNAdapter(
            num_classes=num_classes, backbone_cfg=BackboneConfig(name=backbone, pretrained=pretrained)
        )
