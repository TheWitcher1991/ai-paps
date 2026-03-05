import io

import numpy as np
import torch
import torch.nn as nn
from PIL import Image

from packages.usecases.logging import logger
from vision.models.deeplabv3 import DeepLabV3Adapter
from vision.models.fpn import FPNWithBackboneAdapter
from vision.models.u_net import UNetAdapter
from vision.types import VisionModelBackbone


class InferenceService:
    def __init__(self, model_file, architecture, backbone, num_classes=None, device=None):
        self.device = device or torch.device("cuda" if torch.cuda.is_available() else "cpu")
        self.architecture = architecture
        self.backbone = backbone
        self.num_classes = num_classes

        self.model = self._load_model(model_file)
        self.model.to(self.device)
        self.model.eval()

    def _load_model(self, model_file):
        logger.info(f"Loading model from {model_file}")

        if hasattr(model_file, "read"):
            checkpoint = torch.load(model_file, map_location="cpu")
        else:
            with open(model_file, "rb") as f:
                checkpoint = torch.load(f, map_location="cpu")

        architecture = checkpoint.get("architecture", self.architecture)
        backbone = checkpoint.get("backbone", self.backbone)
        num_classes = checkpoint.get("num_classes", self.num_classes)

        if architecture == "unet":
            model = UNetAdapter(n_channels=3, n_classes=num_classes)
        elif architecture == "deeplabv3":
            model = DeepLabV3Adapter(
                backbone=VisionModelBackbone[backbone.upper()],
                num_classes=num_classes,
            )
        elif architecture == "fpn":
            model = FPNWithBackboneAdapter(
                backbone=VisionModelBackbone[backbone.upper()],
                num_classes=num_classes,
            )
        else:
            raise ValueError(f"Unknown architecture: {architecture}")

        model.load_state_dict(checkpoint["model_state_dict"])
        return model

    def predict(self, image, threshold=0.5):
        if isinstance(image, Image.Image):
            image = np.array(image)

        if isinstance(image, np.ndarray):
            if image.shape[-1] == 4:
                image = image[:, :, :3]
            image = image / 255.0
            image = torch.from_numpy(image).permute(2, 0, 1).float()
        elif isinstance(image, str):
            image = Image.open(image)
            image = np.array(image)
            image = image / 255.0
            image = torch.from_numpy(image).permute(2, 0, 1).float()

        image = image.unsqueeze(0).to(self.device)

        with torch.no_grad():
            output = self.model(image)

        if output.shape[1] > 1:
            prediction = torch.argmax(output, dim=1)
        else:
            prediction = (torch.sigmoid(output) > threshold).squeeze(0).long()

        return prediction.cpu().numpy()

    def predict_mask(self, image, threshold=0.5):
        mask = self.predict(image, threshold)
        return mask[0]

    def predict_with_confidence(self, image):
        if isinstance(image, Image.Image):
            image = np.array(image)

        if isinstance(image, np.ndarray):
            if image.shape[-1] == 4:
                image = image[:, :, :3]
            image = image / 255.0
            image = torch.from_numpy(image).permute(2, 0, 1).float()

        image = image.unsqueeze(0).to(self.device)

        with torch.no_grad():
            output = self.model(image)

        probabilities = torch.softmax(output, dim=1)
        confidence, predictions = torch.max(probabilities, dim=1)

        return {
            "mask": predictions.cpu().numpy()[0],
            "confidence": confidence.cpu().numpy()[0],
            "probabilities": probabilities.cpu().numpy()[0],
        }
