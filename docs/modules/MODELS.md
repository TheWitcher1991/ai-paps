# AI-PAPS: Модели данных

## Содержание

1. [Обзор](#обзор)
2. [Базовые модели](#базовые-модели)
3. [Модуль Users](#users---пользователи)
4. [Модуль Datasets](#datasets---датасеты)
5. [Модуль Training](#training---обучение)
6. [Модуль Directory](#directory---справочник)
7. [Модуль Projects](#projects---проекты)
8. [Модуль Recognitions](#recognitions---распознавание)
9. [Типы и Enum](#типы-и-enum)

---

## Обзор

Все модели наследуются от базового класса `ModelAdapter`, который добавляет поля:
- `id` — первичный ключ
- `created_date` — дата создания (auto_now_add)
- `updated_date` — дата обновления (auto_now)

### Диаграмма связей

```
User
  │
  ├── Project ─────────────── Dataset ─── DatasetAsset
  │                              │              │
  │                              │              └── DatasetAnnotation
  │                              │
  │                              └── DatasetClass
  │
  ├── Training ── Model ── TrainingRun
  │     │
  │     └── TrainingConfig
  │
  └── TrainingDataset
```

---

## Базовые модели

### ModelAdapter

```python
from packages.kernel.adapters import ModelAdapter

class Model(ModelAdapter):
    """Базовый класс для всех моделей"""
    
    class Meta:
        abstract = True
    
    # Добавляемые поля:
    created_date = models.DateTimeField("Дата создания", auto_now_add=True)
    updated_date = models.DateTimeField("Дата обновления", auto_now=True)
```

### UserModelAdapter

```python
from packages.kernel.adapters import UserModelAdapter

class User(UserModelAdapter):
    """Базовая модель пользователя"""
    
    class Meta:
        abstract = True
```

---

## Users — Пользователи

### User

```python
class User(UserModelAdapter):
    """Модель пользователя системы"""
    
    # Аутентификация
    cvat_id = models.IntegerField("CVAT Id", unique=True)
    email = models.EmailField("Email", max_length=255, unique=True)
    username = models.CharField("Username", max_length=150, unique=True)
    
    # Персональные данные
    first_name = models.CharField("Имя", max_length=255)
    last_name = models.CharField("Фамилия", max_length=255)
    surname = models.CharField("Отчество", max_length=255, blank=True, null=True)
    
    # Метаданные
    date_joined = models.DateTimeField("Дата регистрации", auto_now_add=True)
    last_synced_at = models.DateTimeField("Дата последней синхронизации", null=True, blank=True)
    
    # Роль и доступы
    role = models.CharField("Роль", max_length=20, choices=UserRole.choices, default=UserRole.USER)
    has_analytics_access = models.BooleanField(default=False)
    
    # Профиль
    url = models.URLField(blank=True, null=True)
```

**Поля:**
| Поле | Тип | Обязательное | Описание |
|------|-----|--------------|----------|
| `cvat_id` | int | Да | ID пользователя в CVAT |
| `email` | string | Да | Email (уникальный) |
| `username` | string | Да | Имя пользователя (уникальное) |
| `first_name` | string | Да | Имя |
| `last_name` | string | Да | Фамилия |
| `surname` | string | Нет | Отчество |
| `role` | enum | Нет | Роль (по умолчанию: user) |
| `has_analytics_access` | bool | Нет | Доступ к аналитике |
| `url` | url | Нет | Ссылка на профиль |

---

## Datasets — Датасеты

### Dataset

```python
class Dataset(ModelAdapter):
    """Модель датасета для обучения"""
    
    name = models.CharField("Название", max_length=255)
    description = models.TextField("Описание", blank=True, null=True)
    source_id = models.IntegerField("Source ID")
    source = models.CharField("Источник", choices=DatasetSource.choices, max_length=32)
    status = models.CharField("Статус", choices=DatasetStatus.choices, max_length=32)
    format = models.CharField("Формат", choices=DatasetFormat.choices, max_length=128)
    subset = models.CharField("Для чего", choices=DatasetSubset.choices, max_length=32)
    modality = models.CharField("Модальность", choices=DatasetModality.choices, max_length=32)
    size = models.BigIntegerField("Общий размер", blank=True, null=True)
    
    # Связи
    assets = models.ReverseRelation("DatasetAsset")
    classes = models.ReverseRelation("DatasetClass")
    annotations = models.ReverseRelation("DatasetAnnotation")
```

**Методы:**
- `count_size()` — общий размер файлов
- `count_assets()` — количество ассетов
- `count_classes()` — количество классов
- `count_annotations()` — количество аннотаций
- `count_annotated_assets()` — количество размеченных ассетов
- `get_annotated_percent()` — процент разметки
- `update_size()` — обновить размер

### DatasetAsset

```python
class DatasetAsset(ModelAdapter):
    """Изображение в датасете"""
    
    dataset = models.ForeignKey(Dataset, on_delete=models.CASCADE)
    file = S3PrivateFileField(upload_to="datasets/images")
    file_name = models.CharField("Имя файла", max_length=255)
    file_size = models.BigIntegerField("Размер файла")
    file_format = models.CharField("Формат", max_length=32)
    width = models.IntegerField("Ширина")
    height = models.IntegerField("Высота")
    source_id = models.IntegerField("Source ID")
    
    annotations = models.ReverseRelation("DatasetAnnotation")
```

### DatasetClass

```python
class DatasetClass(ModelAdapter):
    """Класс (метка) в датасете"""
    
    dataset = models.ForeignKey(Dataset, on_delete=models.CASCADE)
    name = models.CharField("Название", max_length=255)
    source_id = models.IntegerField("Source ID")
```

### DatasetAnnotation

```python
class DatasetAnnotation(models.Model):
    """Аннотация (разметка) изображения"""
    
    dataset = models.ForeignKey(Dataset, on_delete=models.CASCADE)
    asset = models.ForeignKey(DatasetAsset, on_delete=models.CASCADE)
    cls = models.ForeignKey(DatasetClass, on_delete=models.CASCADE)
    segmentation = models.JSONField("Сегментация")
    bbox = models.JSONField("Бокс")
    area = models.FloatField("Площадь")
    iscrowd = models.BooleanField("Скульптура", default=False)
```

---

## Training — Обучение

### Model

```python
class Model(ModelAdapter):
    """Конфигурация AI модели"""
    
    name = models.CharField("Название", max_length=255)
    alias = models.CharField("Алиас", max_length=255)
    description = models.TextField("Описание", blank=True, null=True)
    file = S3PrivateFileField(upload_to="models/")
    
    # Архитектура
    subset = models.CharField("Задача", choices=ModelSubset.choices, max_length=32)
    framework = models.CharField("Фреймворк", choices=ModelFramework.choices, max_length=32)
    architecture = models.CharField("Архитектура", choices=ModelArchitecture.choices, max_length=32)
    backbone = models.CharField("Backbone", choices=ModelBackbone.choices, max_length=32)
    
    status = models.CharField("Статус", choices=ModelStatus.choices, max_length=32)
    
    training = models.ReverseRelation("Training")
```

### Training

```python
class Training(ModelAdapter):
    """Конфигурация обучения"""
    
    name = models.CharField("Название", max_length=255)
    description = models.TextField("Описание", blank=True, null=True)
    model = models.ForeignKey(Model, on_delete=models.CASCADE)
    
    # Связи
    config = models.OneToOneRelation("TrainingConfig")
    datasets = models.ReverseRelation("TrainingDataset")
    runs = models.ReverseRelation("TrainingRun")
```

### TrainingConfig

```python
class TrainingConfig(ModelAdapter):
    """Параметры обучения"""
    
    # Схема обучения
    lr_scheduler = models.CharField("Схема обучения", choices=TrainingScheduler.choices, max_length=32)
    optimizer = models.CharField("Оптимизатор", choices=TrainingOptimizer, max_length=32)
    loss_function = models.CharField("Функция потерь", choices=TrainingLossFunction.choices, max_length=32)
    
    # Гиперпараметры
    epochs = models.IntegerField("Эпох", default=20)
    learning_rate = models.FloatField("Скорость обучения", default=0.0001)
    early_stopping_patience = models.IntegerField("Патейнс", default=5)
    
    # Размеры батчей
    train_batch_size = models.IntegerField("Размер батча", default=4)
    valid_batch_size = models.IntegerField("Размер валидационного батча", default=2)
    
    # Разделение данных
    valid_ratio = models.FloatField("Размер валидационного набора", default=0.2)
    test_ratio = models.FloatField("Размер тестового набора", default=0.1)
    
    # Размер изображений
    image_width = models.IntegerField("Ширина изображения", default=512)
    image_height = models.IntegerField("Высота изображения", default=512)
    in_channels = models.IntegerField("Количество каналов", default=3)
    
    # Аугментация
    seed = models.IntegerField("Сид", default=42)
    use_flip = models.BooleanField("Использовать поворот", default=False)
    rotation_degrees = models.IntegerField("Поворот", default=0)
    hsv_v = models.IntegerField("Яркость", default=0)
    hsv_s = models.IntegerField("Насыщенность", default=0)
    hsv_h = models.IntegerField("Оттенок", default=0)
    
    training = models.OneToOneField(Training, on_delete=models.SET_NULL, null=True)
```

### TrainingDataset

```python
class TrainingDataset(ModelAdapter):
    """Связь обучения с датасетами"""
    
    training = models.ForeignKey(Training, on_delete=models.CASCADE)
    dataset = models.ForeignKey("datasets.Dataset", on_delete=models.CASCADE)
```

### TrainingRun

```python
class TrainingRun(ModelAdapter):
    """Запуск обучения (история)"""
    
    training = models.ForeignKey(Training, on_delete=models.CASCADE)
    
    status = models.CharField(max_length=32, choices=TrainingStatus.choices)
    
    # Прогресс
    current_epoch = models.IntegerField(default=0)
    
    # Потери
    train_loss = models.FloatField(null=True, blank=True)
    val_loss = models.FloatField(null=True, blank=True)
    test_loss = models.FloatField(null=True, blank=True)
    
    # Метрики
    iou = models.FloatField(null=True, blank=True)
    precision = models.FloatField(null=True, blank=True)
    recall = models.FloatField(null=True, blank=True)
    f1_score = models.FloatField(null=True, blank=True)
    accuracy = models.FloatField(null=True, blank=True)
    
    # Временные метки
    started_date = models.DateTimeField(null=True, blank=True)
    finished_date = models.DateTimeField(null=True, blank=True)
```

---

## Directory — Справочник

*(Структура моделей зависит от реализации)*

### Plant

```python
# Пример структуры
class Plant(ModelAdapter):
    name = models.CharField("Название", max_length=255)
    latin_name = models.CharField("Латинское название", max_length=255)
    description = models.TextField("Описание")
```

### Disease

```python
# Пример структуры
class Disease(ModelAdapter):
    name = models.CharField("Название", max_length=255)
    description = models.TextField("Описание")
    symptoms = models.TextField("Симптомы")
    treatment = models.TextField("Методы лечения")
```

### Pest

```python
# Пример структуры
class Pest(ModelAdapter):
    name = models.CharField("Название", max_length=255)
    description = models.TextField("Описание")
    lifecycle = models.TextField("Жизненный цикл")
    control_methods = models.TextField("Методы борьбы")
```

---

## Projects — Проекты

```python
class Project(ModelAdapter):
    """Проект (рабочее пространство)"""
    
    name = models.CharField("Название", max_length=255)
    description = models.TextField("Описание")
    # ... дополнительные поля
```

---

## Recognitions — Распознавание

```python
# Структура зависит от реализации
class Recognition(ModelAdapter):
    """Результат распознавания"""
    
    image = models.ImageField("Изображение")
    result = models.JSONField("Результат")
    confidence = models.FloatField("Уверенность")
```

---

## Типы и Enum

### UserRole

```python
class UserRole(StrEnum):
    ADMIN = "admin"
    USER = "user"
    VIEWER = "viewer"
```

### DatasetSource

```python
class DatasetSource(StrEnum):
    CVAT = "cvat"
    MANUAL = "manual"
```

### DatasetStatus

```python
class DatasetStatus(StrEnum):
    UPLOADED = "uploaded"
    PROCESSING = "processing"
    READY = "ready"
    ERROR = "error"
```

### DatasetFormat

```python
class DatasetFormat(StrEnum):
    COCO = "coco"
    YOLO = "yolo"
    VOC = "voc"
    CUSTOM = "custom"
```

### DatasetSubset

```python
class DatasetSubset(StrEnum):
    TRAIN = "train"
    VALID = "valid"
    TEST = "test"
```

### DatasetModality

```python
class DatasetModality(StrEnum):
    RGB = "rgb"
    MULTISPECTRAL = "multispectral"
    THERMAL = "thermal"
```

### ModelArchitecture

```python
class ModelArchitecture(StrEnum):
    UNET = "unet"
    DEEPLABV3 = "deeplabv3"
    FPN = "fpn"
    YOLO = "yolo"
    MASK_RCNN = "mask_rcnn"
    VISION_NET = "vision_net"
```

### ModelBackbone

```python
class ModelBackbone(StrEnum):
    RESNET50 = "resnet50"
    RESNET101 = "resnet101"
    RESNET152 = "resnet152"
    EFFICIENTNET = "efficientnet"
```

### TrainingStatus

```python
class TrainingStatus(StrEnum):
    PENDING = "pending"
    QUEUED = "queued"
    RUNNING = "running"
    VALIDATING = "validating"
    FINISHED = "finished"
    FAILED = "failed"
    CANCELLED = "cancelled"
```

### TrainingOptimizer

```python
class TrainingOptimizer(StrEnum):
    ADAM = "adam"
    ADAMW = "adamw"
    SGD = "sgd"
    RMSPROP = "rmsprop"
```

### TrainingScheduler

```python
class TrainingScheduler(StrEnum):
    STEP = "step"
    EXPONENTIAL = "exponential"
    PLATEAU = "plateau"
    COSINE = "cosine"
```

### TrainingLossFunction

```python
class TrainingLossFunction(StrEnum):
    BCE = "BCE"
    BCEWithLogits = "BCEWithLogits"
    CrossEntropy = "CrossEntropy"
    MSE = "MSE"
```

---

## Связи между моделями

```
User (1) ──────< (M) Project
  │
  └──< (M) TrainingRun

Project (1) ──────< (M) Dataset
  │
  └──< (M) Training

Model (1) ──────< (M) Training
  │
  └──< TrainingRun

Training (1) ──1:1── TrainingConfig
  │
  ├─────< (M) TrainingDataset ──> Dataset (1)
  │
  └─────< (M) TrainingRun

Dataset (1) ──< (M) DatasetAsset
  │            │
  │            └─────< (M) DatasetAnnotation
  │
  ├─────< (M) DatasetClass
  │
  └─────< (M) TrainingDataset
```
