import cv2
import numpy as np
import torch
from django.db.models import QuerySet
from torch.utils.data import Dataset as TorchDataset

from datasets.models import Dataset, DatasetAnnotation, DatasetAsset, DatasetClass
from datasets.usecases import dataset_annotation_use_case
from vision.transforms import ComposeTransforms
from vision.types import DetectionTarget
from vision.utils import segmentation_to_mask


class CocoDataset(TorchDataset):

    def __init__(self, dataset: Dataset, transforms: ComposeTransforms = None):
        self.dataset: Dataset = dataset
        self.transforms: ComposeTransforms = transforms

        self.assets: QuerySet[DatasetAsset] = dataset.assets.all()
        self.classes: QuerySet[DatasetClass] = dataset.classes.all()

        self.category_map = {cls.id: i + 1 for i, cls in enumerate(self.classes)}

        self.num_classes = len(self.category_map) + 1

    def __len__(self):
        return self.assets.count()

    def __getitem__(self, idx):
        asset = self.assets[idx]

        image = self.imread_unicode(asset.file.path)
        image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

        annotations: QuerySet[DatasetAnnotation] = dataset_annotation_use_case.optimize().filter(asset=asset)

        boxes, labels, masks = [], [], []

        for ann in annotations:
            x, y, w, h = ann.bbox

            boxes.append([x, y, x + w, y + h])

            labels.append(self.category_map[ann.cls.id])

            mask = segmentation_to_mask(ann.segmentation, asset.height, asset.width)

            if mask.sum() == 0:
                continue

            masks.append(mask)

        target: DetectionTarget = {
            "boxes": torch.tensor(boxes, dtype=torch.float32),
            "labels": torch.tensor(labels, dtype=torch.int64),
            "masks": torch.tensor(np.stack(masks, axis=0), dtype=torch.float32),
        }

        if self.transforms:
            image, target = self.transforms(image, target)

        return image, target

    def imread_unicode(self, path: str):
        try:
            with open(path, "rb") as f:
                data = np.frombuffer(f.read(), dtype=np.uint8)
            img = cv2.imdecode(data, cv2.IMREAD_COLOR)
            return img
        except Exception:
            return None
