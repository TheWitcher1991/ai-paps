# AI-PAPS: AI/ML компоненты

## Содержание

1. [Обзор](#обзор)
2. [Архитектуры моделей](#архитектуры-моделей)
3. [Backbones](#backbones)
4. [Inference](#inference)
5. [Training](#training)
6. [Dataset Loading](#dataset-loading)
7. [Метрики](#метрики)
8. [Аугментации](#аугментации)
9. [Типы данных](#типы-данных)

---

## Обзор

Модуль `vision` содержит реализации нейросетей для компьютерного зрения, ориентированных на задачи сегментации и детекции растений, болезней и вредителей.

### Структура

```
services/core/vision/
├── models/                    # Реализации моделей
│   ├── u_net.py              # U-Net
│   ├── deeplabv3.py          # DeepLabV3
│   ├── fpn.py                # FPN
│   ├── mask_rcnn.py          # Mask R-CNN
│   ├── yolo.py               # YOLO
│   └── vision_net.py         # Custom VisionNet
├── inference.py              # InferenceService
├── training.py               # Training utilities
├── transforms.py             # Аугментации
├── metrics.py                # Метрики качества
├── dataset/                  # Dataset loaders
├── arch/                     # Архитектурные блоки
├── backbone.py              # Backbone networks
├── types.py                 # Типы
└── utils.py                 # Утилиты
```

---

## Архитектуры моделей

### U-Net

Классическая архитектура для семантической сегментации с encoder-decoder структурой и skip connections.

```python
# vision/models/u_net.py
from vision.models.u_net import UNetAdapter

model = UNetAdapter(in_channels=3, num_classes=21)
```

**Особенности:**
- Симметричный encoder-decoder
- Skip connections между encoder и decoder
- Подходит для медицинской и agricultural сегментации
- Хорошо работает с небольшими датасетами

### DeepLabV3

Современная архитектура с Atrous Spatial Pyramid Pooling (ASPP).

```python
# vision/models/deeplabv3.py
from vision.models.deeplabv3 import DeepLabV3Adapter
from vision.types import VisionModelBackbone

model = DeepLabV3Adapter(
    backbone=VisionModelBackbone.RESNET50,
    num_classes=21
)
```

**Особенности:**
- ASPP модуль для multi-scale контекста
- ResNet backbone
- Dilated convolutions
- Отлично для объектов разного масштаба

### FPN (Feature Pyramid Network)

Архитектура с пирамидой признаков для multi-scale детекции.

```python
# vision/models/fpn.py
from vision.models.fpn import FPNWithBackboneAdapter
from vision.types import VisionModelBackbone

model = FPNWithBackboneAdapter(
    backbone=VisionModelBackbone.RESNET101,
    num_classes=21
)
```

**Особенности:**
- Top-down pathway
- Lateral connections
- Multi-scale feature maps
- Подходит для instance segmentation

### Mask R-CNN

Двухэтапная архитектура для instance segmentation.

```python
# vision/models/mask_rcnn.py
from vision.models.mask_rcnn import MaskRCNNAdapter

model = MaskRCNNAdapter(
    num_classes=21,
    pretrained=True
)
```

**Особенности:**
- RPN + ROI Align
- Classification + Bounding Box + Mask heads
- Instance-level сегментация
- torchvision реализация

### YOLO

Одномоментная архитектура для object detection.

```python
# vision/models/yolo.py
from vision.models.yolo import YOLOAdapter

model = YOLOAdapter(
    model_size='n',  # nano
    num_classes=21
)
```

**Особенности:**
- Real-time inference
- Bounding box + classification
- Ultralytics библиотека
- Efficient

### VisionNet

Кастомная архитектура проекта.

```python
# vision/models/vision_net.py
from vision.models.vision_net import VisionNetAdapter

model = VisionNetAdapter(
    in_channels=3,
    num_classes=21
)
```

---

## Backbones

### Доступные Backbones

| Backbone | Описание | Используется в |
|----------|----------|----------------|
| `resnet50` | ResNet 50 слоёв | DeepLabV3, FPN |
| `resnet101` | ResNet 101 слоёв | DeepLabV3, FPN |
| `resnet152` | ResNet 152 слоёв | FPN |
| `efficientnet` | EfficientNet-B0 | DeepLabV3 |
| `visionnet` | Кастомный | VisionNet |

### Использование

```python
from vision.types import VisionModelBackbone

# Пример с ResNet50
backbone = VisionModelBackbone.RESNET50
```

---

## Inference

### InferenceService

```python
# vision/inference.py
from vision.inference import InferenceService

# Инициализация
service = InferenceService(
    model_file="path/to/model.pth",
    architecture="unet",
    backbone="resnet50",
    num_classes=21
)

# Предсказание
result = service.predict(image_file, threshold=0.5)

# Предсказание с уверенностью
result = service.predict_with_confidence(image_file, target_size=(512, 512))
```

### Методы

#### predict()

```python
mask = service.predict(image_file, threshold=0.5)
# Returns: numpy.ndarray shape (H, W)
```

#### predict_mask()

```python
mask = service.predict_mask(image_file, threshold=0.5)
# Returns: numpy.ndarray
```

#### predict_with_confidence()

```python
result = service.predict_with_confidence(image_file)
# Returns: {
#     "mask": [[0, 1, 2, ...]],  # numpy array
#     "confidence": [[0.9, 0.1, ...]],  # confidence map
#     "shape": [512, 512],
#     "probabilities": [[...]]  # per-class probabilities
# }
```

### Загрузка изображения

```python
# Поддерживаемые форматы:
# - Django UploadedFile
# - str (путь к файлу)
# - bytes
# - PIL.Image

image = service._load_image_from_file(image_file)
```

### Предобработка

```python
image_tensor, original_size = service.preprocess_image(
    image, 
    target_size=(512, 512)
)
# Returns: (torch.Tensor, (width, height))
```

---

## Training

### TrainingService

```python
# training/services/training_service.py
from training.models import Training
from training.services import TrainingService

training = Training.objects.get(id=1)
service = TrainingService(training)
service.run()
```

### Процесс обучения

1. **Инициализация**
   - Загрузка конфигурации
   - Создание модели
   - Загрузка датасета

2. **Подготовка данных**
   ```python
   dataset_loader = DatasetLoader(datasets)
   train_dataset = dataset_loader.create_dataset(
       subset="train",
       image_size=(512, 512),
       valid_ratio=0.2,
       test_ratio=0.1
   )
   ```

3. **Обучение epoch**
   ```python
   for epoch in range(epochs):
       # Forward pass
       outputs = model(images)
       loss = criterion(outputs, masks)
       
       # Backward pass
       loss.backward()
       optimizer.step()
       optimizer.zero_grad()
   ```

4. **Валидация**
   ```python
   val_loss, metrics = self._validate(model, val_loader)
   # metrics: {iou, precision, recall, f1, accuracy}
   ```

5. **Сохранение модели**
   ```python
   torch.save({
       "model_state_dict": model.state_dict(),
       "architecture": "unet",
       "backbone": "resnet50",
       "num_classes": 21
   }, "model.pth")
   ```

### Параметры обучения

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| `epochs` | 20 | Количество эпох |
| `learning_rate` | 0.0001 | Скорость обучения |
| `train_batch_size` | 4 | Размер батча |
| `valid_batch_size` | 2 | Размер валидационного батча |
| `optimizer` | adam | Оптимизатор |
| `lr_scheduler` | plateau | Планировщик LR |
| `loss_function` | CrossEntropy | Функция потерь |
| `image_width` | 512 | Ширина изображения |
| `image_height` | 512 | Высота изображения |
| `seed` | 42 | Сид для воспроизводимости |

### Оптимизаторы

| Оптимизатор | Код | Описание |
|-------------|-----|----------|
| Adam | `adam` | Adaptive Moment Estimation |
| AdamW | `adamw` | Adam with weight decay |
| SGD | `sgd` | Stochastic Gradient Descent |
| RMSprop | `rmsprop` | Root Mean Square Propagation |

### Schedulers

| Scheduler | Код | Описание |
|-----------|-----|----------|
| Step LR | `step` | Decrease LR every N epochs |
| Exponential | `exponential` | Exponential decay |
| Reduce on Plateau | `plateau` | Reduce on val loss plateau |
| Cosine Annealing | `cosine` | Cosine annealing |

### Loss Functions

| Loss | Код | Описание |
|------|-----|----------|
| Cross Entropy | `CrossEntropy` | Стандартный CE loss |
| BCE | `BCE` | Binary Cross Entropy |
| BCE With Logits | `BCEWithLogits` | BCE + sigmoid |
| MSE | `MSE` | Mean Squared Error |

---

## Dataset Loading

### DatasetLoader

```python
# training/services/dataset_loader.py
from training.services import DatasetLoader

loader = DatasetLoader(training_datasets)
dataset = loader.create_dataset(
    subset="train",  # train, val, test
    image_size=(512, 512)
)
```

### TorchDataset

```python
from torch.utils.data import DataLoader

dataset = loader.create_dataset(...)
dataloader = DataLoader(
    dataset, 
    batch_size=4, 
    shuffle=True
)

for images, masks in dataloader:
    # images: torch.Tensor [B, 3, H, W]
    # masks: torch.Tensor [B, H, W]
    ...
```

### Формат масок

Маски хранятся как numpy arrays с индексами классов:
- Формат: (H, W)
- Значения: 0, 1, 2, ... (индексы классов)

### COCO формат аннотаций

```python
# Аннотация из CVAT
{
    "segmentation": [[x1, y1, x2, y2, ...]],  # Polygons
    "bbox": [x, y, width, height],
    "area": 1234.5,
    "iscrowd": False
}
```

---

## Метрики

### SegmentationMetrics

```python
# vision/metrics.py
from vision.metrics import SegmentationMetrics

metrics = SegmentationMetrics(num_classes=21)

# Обновление на батче
metrics.update(outputs, targets)

# Получение метрик
result = metrics.compute()
# {
#     "iou": 0.85,
#     "precision": 0.88,
#     "recall": 0.82,
#     "f1": 0.85,
#     "accuracy": 0.95
# }
```

### Метрики

| Метрика | Описание |
|---------|----------|
| IoU | Intersection over Union |
| Precision | Точность предсказаний |
| Recall | Полнота предсказаний |
| F1 | Гармоническое среднее precision/recall |
| Accuracy | Точность пикселей |

### IoU Calculation

```python
def calculate_iou(pred, target, num_classes):
    iou_per_class = []
    
    for cls in range(num_classes):
        pred_cls = (pred == cls)
        target_cls = (target == cls)
        
        intersection = (pred_cls & target_cls).sum()
        union = (pred_cls | target_cls).sum()
        
        if union == 0:
            iou = 1.0  # Empty class
        else:
            iou = intersection / union
        
        iou_per_class.append(iou)
    
    return mean(iou_per_class)
```

---

## Аугментации

### Доступные аугментации

```python
# В TrainingConfig
use_flip = True           # Горизонтальный flip
rotation_degrees = 15     # Случайный поворот
hsv_v = 20               # Brightness variation
hsv_s = 20               # Saturation variation
hsv_h = 10               # Hue variation
```

### transforms.py

```python
# vision/transforms.py
import albumentations as A

train_transform = A.Compose([
    A.HorizontalFlip(p=0.5),
    A.Rotate(limit=15, p=0.5),
    A.RandomBrightnessContrast(
        brightness_limit=0.2,
        contrast_limit=0.2,
        p=0.5
    ),
    A.HueSaturationValue(
        hue_shift_limit=10,
        sat_shift_limit=20,
        val_shift_limit=20,
        p=0.5
    ),
])

val_transform = A.Compose([
    # Только resize для валидации
])
```

---

## Типы данных

### Vision Types

```python
# vision/types.py
from dataclasses import dataclass
from enum import StrEnum
import torch

# Типы данных
ImageTensor = torch.Tensor
Images = List[ImageTensor]
LossDict = Dict[str, torch.Tensor]

# Типы целей и предсказаний
DetectionTarget = Dict[str, torch.Tensor]
DetectionTargets = List[DetectionTarget]

DetectionPrediction = Dict[str, torch.Tensor]
DetectionPredictions = List[DetectionPrediction]

# Backbone enum
class VisionModelBackbone(StrEnum):
    resnet50 = "resnet50"
    resnet101 = "resnet101"
    resnet152 = "resnet152"

# Architecture enum
class VisionModelType(StrEnum):
    deeplabv3 = "deeplabv3"
    fpn = "fpn"
    unet = "unet"
    yolo = "yolo"
    mask_rcnn = "mask_rcnn"

# Backbone config
@dataclass
class BackboneConfig:
    name: VisionModelBackbone
    pretrained: bool = True
```

### Training Types

```python
# training/types.py
from training.types import (
    ModelArchitecture,
    ModelBackbone,
    ModelFramework,
    ModelSubset,
    ModelStatus,
    TrainingStatus,
    TrainingOptimizer,
    TrainingScheduler,
    TrainingLossFunction,
)
```

---

## Использование GPU/CPU

```python
# vision/cuda.py
import torch

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = model.to(device)
```

### Проверка CUDA

```python
# vision/cuda.py
def is_cuda_available():
    return torch.cuda.is_available()

def get_device():
    return torch.device("cuda" if is_cuda_available() else "cpu")
```

---

## Чеклист для добавления новой модели

1. Создать файл `vision/models/<model_name>.py`
2. Реализовать класс `<ModelName>Adapter(nn.Module)`
3. Реализовать `__init__()`, `forward()`
4. Добавить в `vision/types.py` enum значение
5. Обновить `InferenceService._load_model()` в `vision/inference.py`
6. Обновить `TrainingService._create_model()` в `training/services/training_service.py`
7. Добавить тесты
