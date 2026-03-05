import io

import numpy as np
import torch
from PIL import Image
from torch.utils.data import Dataset

from datasets.models import DatasetAnnotation, DatasetAsset, DatasetClass
from packages.usecases.logging import logger


class DatasetLoader:
    def __init__(self, training_datasets):
        self.training_datasets = training_datasets

    def load_dataset(self, subset="train"):
        assets = []
        annotations_by_asset = {}

        for td in self.training_datasets:
            dataset = td.dataset
            dataset_assets = DatasetAsset.objects.filter(dataset=dataset).select_related()

            for asset in dataset_assets:
                assets.append(asset)
                annotations = DatasetAnnotation.objects.filter(asset=asset).select_related("cls")
                annotations_by_asset[asset.id] = list(annotations)

        logger.info(f"Loaded {len(assets)} assets for training")

        return assets, annotations_by_asset

    def create_dataset(self, subset="train", image_size=(512, 512)):
        assets, annotations_by_asset = self.load_dataset(subset)

        return TorchDataset(assets, annotations_by_asset, image_size)


class TorchDataset(Dataset):
    def __init__(self, assets, annotations_by_asset, image_size=(512, 512)):
        self.assets = assets
        self.annotations_by_asset = annotations_by_asset
        self.image_size = image_size

    def __len__(self):
        return len(self.assets)

    def __getitem__(self, idx):
        asset = self.assets[idx]
        annotations = self.annotations_by_asset.get(asset.id, [])

        image = Image.open(asset.file)
        image = image.resize(self.image_size)
        image = np.array(image) / 255.0
        image = torch.from_numpy(image).permute(2, 0, 1).float()

        mask = np.zeros((self.image_size[1], self.image_size[0]), dtype=np.int64)

        for ann in annotations:
            if ann.segmentation:
                seg = ann.segmentation
                if isinstance(seg, list) and len(seg) > 0:
                    for poly in seg:
                        poly_array = np.array(poly).reshape(-1, 2)
                        poly_array[:, 0] = np.clip(
                            poly_array[:, 0] * self.image_size[0] / asset.width, 0, self.image_size[0] - 1
                        )
                        poly_array[:, 1] = np.clip(
                            poly_array[:, 1] * self.image_size[1] / asset.height, 0, self.image_size[1] - 1
                        )
                        from PIL import ImageDraw

                        temp_mask = Image.new("L", self.image_size, 0)
                        draw = ImageDraw.Draw(temp_mask)
                        draw.polygon([tuple(p) for p in poly_array], fill=ann.cls.source_id)
                        mask = np.maximum(mask, np.array(temp_mask))

        mask = torch.from_numpy(mask).long()

        return image, mask
