import io

import numpy as np
import torch
import torch.nn as nn
from PIL import Image

from packages.usecases.logging import logger
from vision.models.deeplabv3 import DeepLabV3Adapter
from vision.models.fpn import FPNWithBackboneAdapter
from vision.models.u_net import UNetAdapter
from vision.models.vision_net import VisionNetAdapter
from vision.types import VisionModelBackbone
from django.core.files.uploadedfile import InMemoryUploadedFile, TemporaryUploadedFile

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
        
        if num_classes is None:
            if "model_state_dict" in checkpoint:
                state_dict = checkpoint["model_state_dict"]
                for key in state_dict.keys():
                    if key.endswith('weight') and ('classifier' in key or 'head' in key or 'out_conv' in key):
                        num_classes = state_dict[key].shape[0]
                        logger.info(f"Detected num_classes={num_classes} from model state_dict")
                        break
            
            if num_classes is None:
                num_classes = 21
                logger.info(f"Using default num_classes={num_classes}")

        logger.info(f"Creating model with architecture={architecture}, backbone={backbone}, num_classes={num_classes}")

        if architecture == "unet":
            return UNetAdapter(in_channels=3, num_classes=num_classes)
        if architecture == "vision_net":
            return VisionNetAdapter(in_channels=3, num_classes=num_classes)
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

        if "model_state_dict" in checkpoint:
            model.load_state_dict(checkpoint["model_state_dict"])
        else:
            model.load_state_dict(checkpoint)
            
        return model
    
    def _load_image_from_file(self, image_file):
        """Загружает изображение из загруженного файла"""
        try:
            if isinstance(image_file, (InMemoryUploadedFile, TemporaryUploadedFile)):
                image = Image.open(image_file).convert('RGB')
            elif isinstance(image_file, str):
                image = Image.open(image_file).convert('RGB')
            elif isinstance(image_file, bytes):
                image = Image.open(io.BytesIO(image_file)).convert('RGB')
            else:
                image = Image.open(image_file).convert('RGB')
            
            return image
        except Exception as e:
            logger.error(f"Failed to load image: {str(e)}")
            raise ValueError(f"Could not load image: {str(e)}")
    
    def preprocess_image(self, image, target_size=None):
        """Предобработка изображения для модели"""
        if isinstance(image, Image.Image):
            original_size = image.size
            
            if target_size:
                image = image.resize(target_size, Image.BILINEAR)
            
            image = np.array(image)
        elif isinstance(image, np.ndarray):
            original_size = (image.shape[1], image.shape[0])
        else:
            raise ValueError(f"Unsupported image type: {type(image)}")

        if len(image.shape) == 2:
            image = np.stack([image] * 3, axis=-1)
        elif image.shape[-1] == 4:
            image = image[:, :, :3]
        
        image = image.astype(np.float32) / 255.0
        
        # mean = np.array([0.485, 0.456, 0.406])
        # std = np.array([0.229, 0.224, 0.225])
        # image = (image - mean) / std
        
        image = torch.from_numpy(image).permute(2, 0, 1).float()
        
        return image, original_size

    def predict(self, image_file, threshold=0.5, target_size=None):
        image = self._load_image_from_file(image_file)
        
        image_tensor, original_size = self.preprocess_image(image, target_size)
        image_tensor = image_tensor.unsqueeze(0).to(self.device)

        with torch.no_grad():
            output = self.model(image_tensor)

        if output.shape[1] > 1:
            prediction = torch.argmax(output, dim=1)
        else:
            prediction = (torch.sigmoid(output) > threshold).long()

        prediction = prediction.cpu().numpy()
        
        if target_size and original_size != target_size:
            from PIL import Image
            prediction = prediction[0].astype(np.uint8)
            prediction = Image.fromarray(prediction)
            prediction = prediction.resize(original_size, Image.NEAREST)
            prediction = np.array(prediction)
            return prediction
        else:
            return prediction[0]

    def predict_mask(self, image_file, threshold=0.5):
        return self.predict(image_file, threshold)

    def predict_with_confidence(self, image_file, target_size=None):
        image = self._load_image_from_file(image_file)
        
        image_tensor, original_size = self.preprocess_image(image, target_size)
        image_tensor = image_tensor.unsqueeze(0).to(self.device)

        with torch.no_grad():
            output = self.model(image_tensor)

        if output.shape[1] == 1:
            probabilities = torch.sigmoid(output)
            confidence = probabilities
            predictions = (probabilities > 0.5).long()
            probabilities = probabilities.squeeze(1)
        else:
            probabilities = torch.softmax(output, dim=1)
            confidence, predictions = torch.max(probabilities, dim=1)

        mask = predictions.cpu().numpy()[0]
        confidence_map = confidence.cpu().numpy()[0]
        
        if target_size and original_size != target_size:
            from PIL import Image
            mask_pil = Image.fromarray(mask.astype(np.uint8))
            mask_pil = mask_pil.resize(original_size, Image.NEAREST)
            mask = np.array(mask_pil)
            
            confidence_pil = Image.fromarray((confidence_map * 255).astype(np.uint8))
            confidence_pil = confidence_pil.resize(original_size, Image.BILINEAR)
            confidence_map = np.array(confidence_pil).astype(np.float32) / 255.0

        return {
            "mask": mask.tolist(),
            "confidence": confidence_map.tolist(),
            "shape": list(mask.shape),
            "probabilities": probabilities.cpu().numpy()[0].tolist() if output.shape[1] > 1 else None
        }
