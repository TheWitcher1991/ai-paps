import cv2
import numpy as np
from pycocotools import mask as coco_mask
from sklearn.model_selection import train_test_split


def split_ids(ids, train_ratio, val_ratio, test_ratio, seed=42):
    train_ids, temp_ids = train_test_split(ids, test_size=(1 - train_ratio), random_state=seed)

    val_ratio_adjusted = val_ratio / (val_ratio + test_ratio)

    val_ids, test_ids = train_test_split(
        temp_ids,
        test_size=(1 - val_ratio_adjusted),
        random_state=seed,
    )

    return train_ids, val_ids, test_ids


def segmentation_to_mask(segmentation, height, width):
    rles = coco_mask.frPyObjects(segmentation, height, width)
    rle = coco_mask.merge(rles)
    mask = coco_mask.decode(rle)
    return mask.astype(np.uint8)
