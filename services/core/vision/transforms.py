from typing import Sequence

import numpy as np
import torch
from torchvision.transforms import v2 as T


class ComposeTransforms:
    def __init__(self, size: Sequence[int] = (512, 512)):
        self.size = size
        self.t = T.Compose(
            [
                T.ToImage(),
                T.Resize(size),
                T.ToDtype(torch.float32, scale=True),
            ]
        )

    def __call__(self, image, target):
        h0, w0 = image.shape[:2]

        image = self.t(image)

        h1, w1 = self.size
        scale_x = w1 / w0
        scale_y = h1 / h0

        if "boxes" in target:
            boxes = target["boxes"]
            boxes[:, [0, 2]] *= scale_x
            boxes[:, [1, 3]] *= scale_y
            target["boxes"] = boxes

        if "masks" in target:
            target["masks"] = torch.nn.functional.interpolate(
                target["masks"].unsqueeze(1), size=self.size, mode="nearest"
            ).squeeze(1)

        return image, target
