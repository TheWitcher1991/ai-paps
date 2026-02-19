from pathlib import Path

import torch
from ultralytics import YOLO


class YoloAdapter:
    def __init__(self, model_name="yolo26n-seg.pt", num_classes=None, weights_path=None):
        super().__init__()
        self.model = YOLO(model_name)

        if weights_path and Path(weights_path).exists():
            self.model.load_state_dict(torch.load(weights_path))

        if num_classes is not None:
            self.model.nc = num_classes

    def forward(self, images, targets=None):
        results = self.model(images, verbose=False)
        outputs = []
        for res in results:
            outputs.append(
                {
                    "boxes": res.boxes.xyxy,
                    "scores": res.boxes.conf,
                    "labels": res.boxes.cls,
                    "masks": getattr(res, "masks", None),
                }
            )
        return outputs

    def load_state_dict(self, state_dict, strict=True):
        self.model.load_state_dict(state_dict, strict=strict)

    def state_dict(self, *args, **kwargs):
        return self.model.state_dict(*args, **kwargs)
