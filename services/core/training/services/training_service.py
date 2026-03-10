import io
import os
import random
from datetime import datetime

import numpy as np
import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader
from tqdm import tqdm

from packages.usecases.logging import logger
from training.models import Model, Training, TrainingRun
from training.services.dataset_loader import DatasetLoader
from training.types import TrainingStatus
from vision.metrics import SegmentationMetrics
from vision.models.deeplabv3 import DeepLabV3Adapter
from vision.models.fpn import FPNWithBackboneAdapter
from vision.models.u_net import UNetAdapter
from vision.models.vision_net import VisionNetAdapter


class TrainingService:
    def __init__(self, training: Training):
        self.training = training
        self.config = training.config
        self.model = training.model
        self.datasets = training.datasets.all()

    def _set_seed(self):
        seed = self.config.seed if self.config else 42
        random.seed(seed)
        np.random.seed(seed)
        torch.manual_seed(seed)
        if torch.cuda.is_available():
            torch.cuda.manual_seed_all(seed)

    def _create_model(self, num_classes: int):
        architecture = self.model.architecture
        backbone = self.model.backbone

        logger.info(f"Creating model: {architecture} with backbone: {backbone}")

        if architecture == "unet":
            return UNetAdapter(in_channels=3, num_classes=num_classes)
        if architecture == "vision_net":
            return VisionNetAdapter(in_channels=3, num_classes=num_classes)
        elif architecture == "deeplabv3":
            from vision.types import VisionModelBackbone

            return DeepLabV3Adapter(
                backbone=VisionModelBackbone[backbone.upper()],
                num_classes=num_classes,
            )
        elif architecture == "fpn":
            from vision.types import VisionModelBackbone

            return FPNWithBackboneAdapter(
                backbone=VisionModelBackbone[backbone.upper()],
                num_classes=num_classes,
            )
        else:
            raise ValueError(f"Unknown architecture: {architecture}")

    def _create_optimizer(self, model):
        opt_name = self.config.optimizer if self.config else "adam"
        lr = self.config.learning_rate if self.config else 0.0001

        logger.info(f"Creating optimizer: {opt_name} with lr: {lr}")

        if opt_name == "adam":
            return optim.Adam(model.parameters(), lr=lr)
        elif opt_name == "adamw":
            return optim.AdamW(model.parameters(), lr=lr)
        elif opt_name == "sgd":
            return optim.SGD(model.parameters(), lr=lr, momentum=0.9)
        elif opt_name == "rmsprop":
            return optim.RMSprop(model.parameters(), lr=lr)
        else:
            return optim.Adam(model.parameters(), lr=lr)

    def _create_scheduler(self, optimizer):
        scheduler_name = self.config.lr_scheduler if self.config else "plateau"

        logger.info(f"Creating scheduler: {scheduler_name}")

        if scheduler_name == "step":
            return optim.lr_scheduler.StepLR(optimizer, step_size=5, gamma=0.1)
        elif scheduler_name == "exponential":
            return optim.lr_scheduler.ExponentialLR(optimizer, gamma=0.95)
        elif scheduler_name == "plateau":
            return optim.lr_scheduler.ReduceLROnPlateau(optimizer, mode="min", patience=3, factor=0.1)
        elif scheduler_name == "cosine":
            return optim.lr_scheduler.CosineAnnealingLR(optimizer, T_max=50)
        else:
            return optim.lr_scheduler.ReduceLROnPlateau(optimizer, mode="min", patience=3, factor=0.1)

    def _create_loss_function(self):
        loss_name = self.config.loss_function if self.config else "CrossEntropy"

        logger.info(f"Creating loss function: {loss_name}")

        if loss_name == "BCE":
            return nn.BCELoss()
        elif loss_name == "BCEWithLogits":
            return nn.BCEWithLogitsLoss()
        elif loss_name == "CrossEntropy":
            return nn.CrossEntropyLoss()
        elif loss_name == "MSE":
            return nn.MSELoss()
        else:
            return nn.CrossEntropyLoss()

    def _validate(self, model, val_loader, criterion, device, num_classes):
        model.eval()
        val_loss = 0.0
        metrics = SegmentationMetrics(num_classes)

        with torch.no_grad():
            for images, masks in val_loader:
                images = images.to(device)
                masks = masks.to(device)

                outputs = model(images)
                loss = criterion(outputs, masks)
                val_loss += loss.item()

                metrics.update(outputs, masks)

        avg_val_loss = val_loss / len(val_loader)
        computed_metrics = metrics.compute()

        return avg_val_loss, computed_metrics

    def run(self):
        from datasets.models import DatasetClass

        logger.info(f"Starting training: {self.training.id}")

        self._set_seed()

        num_classes = DatasetClass.objects.filter(dataset__in=[td.dataset for td in self.datasets]).count()
        num_classes = max(num_classes, 2)

        run = TrainingRun.objects.create(
            training=self.training,
            status=TrainingStatus.RUNNING,
            started_date=datetime.now(),
        )

        try:
            model = self._create_model(num_classes)

            device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
            model = model.to(device)

            optimizer = self._create_optimizer(model)
            scheduler = self._create_scheduler(optimizer)
            criterion = self._create_loss_function()

            batch_size = self.config.train_batch_size if self.config else 4
            valid_batch_size = self.config.valid_batch_size if self.config else 2
            epochs = self.config.epochs if self.config else 20
            valid_ratio = self.config.valid_ratio if self.config else 0.2
            test_ratio = self.config.test_ratio if self.config else 0.1

            image_size = (self.config.image_width, self.config.image_height) if self.config else (512, 512)

            dataset_loader = DatasetLoader(self.datasets)
            train_dataset = dataset_loader.create_dataset(subset="train", image_size=image_size, valid_ratio=valid_ratio, test_ratio=test_ratio)
            val_dataset = dataset_loader.create_dataset(subset="val", image_size=image_size, valid_ratio=valid_ratio, test_ratio=test_ratio)

            train_loader = DataLoader(train_dataset, batch_size=batch_size, shuffle=True)
            val_loader = DataLoader(val_dataset, batch_size=valid_batch_size, shuffle=False)

            logger.info(f"Training on {len(train_loader)} batches, validating on {len(val_loader)} batches for {epochs} epochs")
            
            for epoch in range(epochs):
                run.current_epoch = epoch + 1
                run.save()

                model.train()
                epoch_loss = 0.0

                progress_bar = tqdm(train_loader, desc=f'Epoch {epoch+1}/{epochs}')
                
                for batch_idx, (images, masks) in enumerate(progress_bar):
                    images = images.to(device)
                    masks = masks.to(device)

                    optimizer.zero_grad()
                    outputs = model(images)
                    loss = criterion(outputs, masks)
                    loss.backward()
                    optimizer.step()

                    epoch_loss += loss.item()
                    
                    progress_bar.set_postfix({'loss': f'{loss.item():.4f}'})

                    if batch_idx % 10 == 0:
                        logger.info(
                            f"Epoch [{epoch+1}/{epochs}] Batch [{batch_idx}/{len(train_loader)}] Loss: {loss.item():.4f}"
                        )

                avg_loss = epoch_loss / len(train_loader)
                run.train_loss = avg_loss

                avg_val_loss, val_metrics = self._validate(model, val_loader, criterion, device, num_classes)
                run.val_loss = avg_val_loss
                run.iou = val_metrics["iou"]
                run.precision = val_metrics["precision"]
                run.recall = val_metrics["recall"]
                run.f1_score = val_metrics["f1"]
                run.accuracy = val_metrics["accuracy"]

                run.save()

                scheduler.step(avg_val_loss)

                logger.info(f"Epoch {epoch+1}/{epochs} completed. Train Loss: {avg_loss:.4f}, Val Loss: {avg_val_loss:.4f}")

            run.status = TrainingStatus.FINISHED
            run.finished_date = datetime.now()
            run.save()

            self._save_model(model, num_classes)

            self.model.status = "ready"
            self.model.save()

            logger.info(f"Training completed successfully: {run.id}")

        except Exception as e:
            logger.error(f"Training failed: {str(e)}")
            run.status = TrainingStatus.FAILED
            run.save()
            raise

    def _save_model(self, model, num_classes):
        logger.info(f"Saving model to file")

        buffer = io.BytesIO()
        torch.save(
            {
                "model_state_dict": model.state_dict(),
                "architecture": self.model.architecture,
                "backbone": self.model.backbone,
                "num_classes": num_classes,
            },
            buffer,
        )
        buffer.seek(0)

        filename = f"{self.model.alias or self.model.name}_{self.training.id}.pth"
        self.model.file.save(filename, buffer, save=True)

        logger.info(f"Model saved: {filename}")
