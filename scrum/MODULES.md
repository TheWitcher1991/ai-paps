# Модули системы AI-PAPS

## Архитектура системы

```
┌─────────────────────────────────────────────────────────────────┐
│                        Frontend (Next.js)                        │
├─────────────────────────────────────────────────────────────────┤
│  Dashboard │ Diagnosis │ Datasets │ Training │ Models │ Catalog │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      API Gateway (ASP.NET)                       │
├─────────────────────────────────────────────────────────────────┤
│              Auth │ Routing │ Rate Limiting │ CORS              │
└─────────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        ▼                     ▼                     ▼
┌───────────────┐    ┌───────────────┐    ┌───────────────┐
│  Core Service │    │  ML Service   │    │ Storage Svc   │
│   (ASP.NET)   │    │   (Python)    │    │   (ASP.NET)   │
└───────────────┘    └───────────────┘    └───────────────┘
        │                     │                     │
        ▼                     ▼                     ▼
┌───────────────┐    ┌───────────────┐    ┌───────────────┐
│  PostgreSQL   │    │    Redis      │    │   S3/MinIO    │
│   + PostGIS   │    │   (Queue)     │    │  (Objects)    │
└───────────────┘    └───────────────┘    └───────────────┘
```

---

## Модуль 1: Аутентификация и авторизация (Auth Module)

### Описание
Управление пользователями, ролями и правами доступа.

### Компоненты

| Компонент | Описание | Технологии |
|-----------|----------|------------|
| AuthService | JWT аутентификация, refresh tokens | ASP.NET Identity |
| UserService | CRUD операции с пользователями | EF Core |
| RoleService | Управление ролями (admin, agronomist, viewer) | ASP.NET Authorization |
| AuditService | Логирование действий пользователей | Serilog |

### API Endpoints

```
POST   /api/v1/auth/register          # Регистрация
POST   /api/v1/auth/login             # Вход
POST   /api/v1/auth/refresh           # Обновление токена
POST   /api/v1/auth/logout            # Выход
POST   /api/v1/auth/forgot-password   # Восстановление пароля
GET    /api/v1/users                  # Список пользователей
GET    /api/v1/users/{id}             # Профиль пользователя
PUT    /api/v1/users/{id}             # Обновление профиля
DELETE /api/v1/users/{id}             # Удаление пользователя
GET    /api/v1/users/{id}/audit       # Аудит действий
```

### Роли и права

| Роль | Права |
|------|-------|
| admin | Полный доступ ко всем модулям |
| agronomist | Диагностика, просмотр каталогов, ограниченный доступ к ML |
| ml_engineer | Датасеты, модели, обучение, диагностика |
| viewer | Только просмотр результатов |

### Схема данных

```typescript
interface User {
  id: string;
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'agronomist' | 'ml_engineer' | 'viewer';
  avatar?: string;
  organizationId?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;
}
```

---

## Модуль 2: Справочники (Catalog Module)

### Описание
Каталоги растений, болезней и вредителей с научной классификацией.

### Подмодули

#### 2.1 Растения (Plants)

```typescript
interface Plant {
  id: number;
  nameRu: string;           // Томат
  nameLat: string;          // Solanum lycopersicum
  category: string;         // Овощные, Зерновые, Плодовые
  family: string;           // Паслёновые
  description: string;
  cultivationInfo: string;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

#### 2.2 Болезни (Diseases)

```typescript
interface Disease {
  id: number;
  name: string;                    // Фитофтороз
  alias: string;                   // late_blight
  pathogen: string;                // Phytophthora infestans
  type: 'fungal' | 'bacterial' | 'viral' | 'physiological';
  symptoms: string;
  conditions: string;              // Условия развития
  prevention: string;
  treatment: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  images: string[];
  affectedPlants: number[];        // ID растений
  createdAt: Date;
  updatedAt: Date;
}
```

#### 2.3 Вредители (Pests)

```typescript
interface Pest {
  id: number;
  name: string;                    // Колорадский жук
  nameLat: string;                 // Leptinotarsa decemlineata
  type: 'insect' | 'mite' | 'nematode' | 'rodent';
  lifecycle: string;
  damageSymptoms: string;
  controlMethods: string;
  images: string[];
  affectedPlants: number[];
  createdAt: Date;
  updatedAt: Date;
}
```

### API Endpoints

```
# Растения
GET    /api/v1/plants                 # Список растений
GET    /api/v1/plants/{id}            # Детали растения
POST   /api/v1/plants                 # Создание (admin)
PUT    /api/v1/plants/{id}            # Обновление (admin)
DELETE /api/v1/plants/{id}            # Удаление (admin)

# Болезни
GET    /api/v1/diseases               # Список болезней
GET    /api/v1/diseases/{id}          # Детали болезни
POST   /api/v1/diseases               # Создание (admin)
PUT    /api/v1/diseases/{id}          # Обновление (admin)
DELETE /api/v1/diseases/{id}          # Удаление (admin)

# Вредители
GET    /api/v1/pests                  # Список вредителей
GET    /api/v1/pests/{id}             # Детали вредителя
POST   /api/v1/pests                  # Создание (admin)
PUT    /api/v1/pests/{id}             # Обновление (admin)
DELETE /api/v1/pests/{id}             # Удаление (admin)
```

---

## Модуль 3: Управление датасетами (Dataset Module)

### Описание
Полный цикл управления данными для обучения: загрузка, хранение, аннотирование, интеграция с CVAT.

### Компоненты

| Компонент | Описание |
|-----------|----------|
| DatasetService | CRUD операции с датасетами |
| FileUploadService | Загрузка и валидация изображений |
| AnnotationService | Управление аннотациями |
| CVATIntegrationService | Синхронизация с CVAT |
| ExportService | Экспорт в COCO/YOLO/VOC |
| AugmentationService | Применение аугментаций |

### Схема данных

```typescript
interface Dataset {
  id: number;
  name: string;
  description: string;
  taskType: 'classification' | 'segmentation' | 'detection';
  format: 'coco' | 'yolo' | 'voc' | 'custom';
  status: 'draft' | 'annotating' | 'ready' | 'archived';
  imagesCount: number;
  annotatedCount: number;
  totalSize: number;                 // bytes
  classes: DatasetClass[];
  splits: DatasetSplit;
  cvatProjectId?: number;
  cvatTaskId?: number;
  projectId?: number;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

interface DatasetClass {
  id: number;
  name: string;
  color: string;                     // HEX for visualization
  count: number;                     // images with this class
}

interface DatasetSplit {
  train: number;                     // percentage
  valid: number;
  test: number;
}

interface DatasetFile {
  id: number;
  datasetId: number;
  filename: string;
  filepath: string;
  filesize: number;
  width: number;
  height: number;
  mimeType: string;
  hasAnnotation: boolean;
  split: 'train' | 'valid' | 'test' | null;
  uploadedAt: Date;
}

interface Annotation {
  id: number;
  fileId: number;
  classId: number;
  type: 'bbox' | 'polygon' | 'mask';
  data: BBox | Polygon | Mask;
  confidence?: number;
  createdBy: string;
  createdAt: Date;
}

interface BBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface Polygon {
  points: [number, number][];
}

interface Mask {
  rle: string;                       // Run-length encoding
}
```

### API Endpoints

```
# Датасеты
GET    /api/v1/datasets                      # Список датасетов
GET    /api/v1/datasets/{id}                 # Детали датасета
POST   /api/v1/datasets                      # Создание датасета
PUT    /api/v1/datasets/{id}                 # Обновление датасета
DELETE /api/v1/datasets/{id}                 # Удаление датасета
GET    /api/v1/datasets/{id}/stats           # Статистика датасета
POST   /api/v1/datasets/{id}/split           # Разделение на train/valid/test

# Файлы датасета
GET    /api/v1/datasets/{id}/files           # Список файлов
POST   /api/v1/datasets/{id}/files           # Загрузка файлов
DELETE /api/v1/datasets/{id}/files/{fileId}  # Удаление файла
GET    /api/v1/datasets/{id}/files/{fileId}  # Получение файла

# Аннотации
GET    /api/v1/datasets/{id}/files/{fileId}/annotations
POST   /api/v1/datasets/{id}/files/{fileId}/annotations
PUT    /api/v1/annotations/{annotationId}
DELETE /api/v1/annotations/{annotationId}

# CVAT интеграция
POST   /api/v1/datasets/{id}/cvat/sync       # Синхронизация с CVAT
GET    /api/v1/cvat/projects                 # Список проектов CVAT
GET    /api/v1/cvat/tasks                    # Список задач CVAT

# Экспорт
POST   /api/v1/datasets/{id}/export          # Экспорт датасета
GET    /api/v1/datasets/{id}/export/{jobId}  # Статус экспорта
```

### CVAT Integration Flow

```
1. Пользователь создаёт датасет в AI-PAPS
2. Загружает изображения
3. Нажимает "Отправить в CVAT"
   └── AI-PAPS создаёт Task в CVAT
   └── Загружает изображения в CVAT
4. Разметчики работают в CVAT
5. Пользователь нажимает "Синхронизировать"
   └── AI-PAPS получает аннотации из CVAT
   └── Конвертирует в внутренний формат
   └── Сохраняет в БД
6. Датасет готов для обучения
```

---

## Модуль 4: Нейросетевые модели (Models Module)

### Описание
Реестр архитектур нейронных сетей, управление версиями обученных моделей.

### Схема данных

```typescript
interface NeuralNetwork {
  id: number;
  name: string;                      // DeepLabV3+ ResNet101
  alias: string;                     // deeplabv3plus_resnet101
  description: string;
  taskType: 'classification' | 'segmentation' | 'detection';
  framework: 'pytorch' | 'tensorflow' | 'onnx';
  architecture: string;              // deeplabv3plus, unet, yolov8
  backbone: string;                  // resnet50, resnet101, efficientnet
  pretrained: boolean;
  inputSize: [number, number];       // [512, 512]
  outputClasses: number;
  parameters: number;                // количество параметров
  status: 'available' | 'deprecated';
  createdAt: Date;
  updatedAt: Date;
}

interface TrainedModel {
  id: number;
  networkId: number;
  trainingId: number;
  version: string;                   // v1.0.0
  name: string;
  description?: string;
  filepath: string;                  // S3 path to weights
  filesize: number;
  metrics: ModelMetrics;
  isProduction: boolean;
  createdAt: Date;
}

interface ModelMetrics {
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  iou?: number;                      // for segmentation
  mAP?: number;                      // for detection
  confusionMatrix?: number[][];
}
```

### API Endpoints

```
# Архитектуры
GET    /api/v1/networks                      # Список архитектур
GET    /api/v1/networks/{id}                 # Детали архитектуры
POST   /api/v1/networks                      # Добавление архитектуры (admin)
PUT    /api/v1/networks/{id}                 # Обновление (admin)

# Обученные модели
GET    /api/v1/models                        # Список обученных моделей
GET    /api/v1/models/{id}                   # Детали модели
GET    /api/v1/models/{id}/download          # Скачивание весов
POST   /api/v1/models/{id}/set-production    # Установить как production
DELETE /api/v1/models/{id}                   # Удаление модели
GET    /api/v1/models/compare                # Сравнение моделей
```

### Поддерживаемые архитектуры

| Архитектура | Тип задачи | Backbone | Описание |
|-------------|------------|----------|----------|
| UNet | Segmentation | ResNet50/101 | Классическая архитектура для сегментации |
| DeepLabV3+ | Segmentation | ResNet50/101, Xception | ASPP модуль для мультимасштабного анализа |
| FPN | Segmentation | ResNet50/101 | Feature Pyramid Network |
| YOLOv8 | Detection | YOLOv8 | Real-time детекция объектов |
| Mask R-CNN | Instance Seg | ResNet50 | Instance сегментация |
| EfficientNet | Classification | EfficientNet-B0..B7 | Эффективная классификация |
| ViT | Classification | ViT-Base/Large | Vision Transformer |

---

## Модуль 5: Обучение (Training Module)

### Описание
Конфигурирование, запуск и мониторинг обучения нейронных сетей.

### Схема данных

```typescript
interface Training {
  id: number;
  name: string;
  description?: string;
  networkId: number;
  datasetIds: number[];
  config: TrainingConfig;
  status: 'pending' | 'running' | 'completed' | 'failed' | 'cancelled';
  progress: TrainingProgress;
  metrics?: TrainingMetrics;
  startedAt?: Date;
  completedAt?: Date;
  error?: string;
  createdBy: string;
  createdAt: Date;
}

interface TrainingConfig {
  epochs: number;
  batchSize: number;
  learningRate: number;
  optimizer: 'adam' | 'sgd' | 'adamw';
  lossFunction: 'cross_entropy' | 'focal' | 'dice' | 'combined';
  scheduler: 'step' | 'cosine' | 'plateau' | 'none';
  schedulerParams?: Record<string, number>;
  earlyStoppingPatience?: number;
  imageSize: [number, number];
  augmentations: AugmentationConfig;
  validationSplit: number;
  usePretrained: boolean;
  freezeBackbone: boolean;
  freezeEpochs?: number;
}

interface AugmentationConfig {
  horizontalFlip: boolean;
  verticalFlip: boolean;
  rotation: number;              // degrees
  brightness: number;            // 0-1
  contrast: number;              // 0-1
  saturation: number;            // 0-1
  blur: boolean;
  noise: boolean;
}

interface TrainingProgress {
  currentEpoch: number;
  totalEpochs: number;
  currentBatch: number;
  totalBatches: number;
  epochProgress: number;         // 0-100%
  estimatedTimeRemaining?: number; // seconds
}

interface TrainingMetrics {
  trainLoss: number[];           // per epoch
  validLoss: number[];
  trainAccuracy: number[];
  validAccuracy: number[];
  learningRates: number[];
  bestEpoch: number;
  bestMetric: number;
}
```

### API Endpoints

```
# Обучения
GET    /api/v1/trainings                     # Список обучений
GET    /api/v1/trainings/{id}                # Детали обучения
POST   /api/v1/trainings                     # Создание обучения
DELETE /api/v1/trainings/{id}                # Удаление обучения

# Управление процессом
POST   /api/v1/trainings/{id}/start          # Запуск обучения
POST   /api/v1/trainings/{id}/stop           # Остановка
POST   /api/v1/trainings/{id}/pause          # Пауза
POST   /api/v1/trainings/{id}/resume         # Возобновление

# Мониторинг (WebSocket)
WS     /api/v1/trainings/{id}/stream         # Real-time обновления

# Результаты
GET    /api/v1/trainings/{id}/metrics        # Метрики обучения
GET    /api/v1/trainings/{id}/logs           # Логи обучения
GET    /api/v1/trainings/{id}/checkpoints    # Чекпоинты
POST   /api/v1/trainings/{id}/export         # Экспорт модели
```

### ML Service (Python)

```python
# training_service.py
class TrainingService:
    def __init__(self, config: TrainingConfig):
        self.config = config
        self.device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        
    def train(self, model, train_loader, valid_loader):
        optimizer = self._get_optimizer(model)
        scheduler = self._get_scheduler(optimizer)
        criterion = self._get_criterion()
        
        for epoch in range(self.config.epochs):
            # Training phase
            model.train()
            train_loss = self._train_epoch(model, train_loader, optimizer, criterion)
            
            # Validation phase
            model.eval()
            valid_loss, metrics = self._validate(model, valid_loader, criterion)
            
            # Learning rate scheduling
            scheduler.step(valid_loss)
            
            # Report progress via Redis
            self._report_progress(epoch, train_loss, valid_loss, metrics)
            
            # Early stopping check
            if self._should_stop_early():
                break
                
        return self._get_best_model()
```

---

## Модуль 6: Диагностика (Inference Module)

### Описание
Распознавание болезней растений по изображениям с визуализацией результатов.

### Схема данных

```typescript
interface DiagnosisRequest {
  imageFile: File;
  modelId: number;
  projectId?: number;
}

interface DiagnosisResult {
  id: number;
  imageUrl: string;
  modelId: number;
  status: 'processing' | 'completed' | 'failed';
  processingTime: number;           // milliseconds
  predictions: Prediction[];
  segmentation?: SegmentationResult;
  recommendations: string[];
  createdAt: Date;
}

interface Prediction {
  classId: number;
  className: string;
  confidence: number;               // 0-1
  severity?: 'healthy' | 'low' | 'medium' | 'high' | 'critical';
}

interface SegmentationResult {
  maskUrl: string;                  // URL to segmentation mask
  overlayUrl: string;               // URL to image with overlay
  regions: SegmentationRegion[];
}

interface SegmentationRegion {
  classId: number;
  className: string;
  area: number;                     // pixels
  areaPercent: number;              // % of image
  bbox: BBox;
  confidence: number;
}

interface DiagnosisHistory {
  id: number;
  userId: string;
  results: DiagnosisResult[];
  totalCount: number;
  filters: {
    dateFrom?: Date;
    dateTo?: Date;
    diseaseId?: number;
    severity?: string;
  };
}
```

### API Endpoints

```
# Диагностика
POST   /api/v1/diagnosis                     # Запуск распознавания
GET    /api/v1/diagnosis/{id}                # Результат распознавания
GET    /api/v1/diagnosis/{id}/overlay        # Изображение с наложением
GET    /api/v1/diagnosis/{id}/mask           # Маска сегментации
GET    /api/v1/diagnosis/{id}/heatmap        # Тепловая карта (Grad-CAM)

# История
GET    /api/v1/diagnosis/history             # История распознаваний
GET    /api/v1/diagnosis/history/export      # Экспорт истории

# Batch обработка
POST   /api/v1/diagnosis/batch               # Пакетная обработка
GET    /api/v1/diagnosis/batch/{jobId}       # Статус пакетной обработки

# Feedback
POST   /api/v1/diagnosis/{id}/feedback       # Оценка результата
```

### Inference Pipeline

```
1. Загрузка изображения
   └── Валидация формата (JPEG, PNG, WEBP)
   └── Проверка размера (max 10MB)
   
2. Предобработка
   └── Resize к размеру модели
   └── Нормализация (ImageNet mean/std)
   └── Конвертация в тензор
   
3. Инференс модели
   └── Загрузка весов из кэша
   └── Forward pass
   └── Softmax / Sigmoid
   
4. Постобработка
   └── Threshold для сегментации
   └── NMS для детекции
   └── Конвертация масок в RLE
   
5. Визуализация
   └── Создание overlay изображения
   └── Генерация Grad-CAM тепловой карты
   
6. Формирование результата
   └── Сохранение в БД
   └── Загрузка артефактов в S3
   └── Возврат ответа клиенту
```

---

## Модуль 7: Проекты (Projects Module)

### Описание
Организация работы команд, управление доступом к ресурсам.

### Схема данных

```typescript
interface Project {
  id: number;
  name: string;
  description?: string;
  status: 'active' | 'archived';
  ownerId: string;
  members: ProjectMember[];
  datasets: number[];
  models: number[];
  settings: ProjectSettings;
  createdAt: Date;
  updatedAt: Date;
}

interface ProjectMember {
  userId: string;
  role: 'owner' | 'editor' | 'viewer';
  joinedAt: Date;
}

interface ProjectSettings {
  defaultModelId?: number;
  notificationsEnabled: boolean;
  autoSyncCVAT: boolean;
}

interface ProjectActivity {
  id: number;
  projectId: number;
  userId: string;
  action: string;
  details: Record<string, any>;
  createdAt: Date;
}
```

### API Endpoints

```
GET    /api/v1/projects                      # Список проектов
GET    /api/v1/projects/{id}                 # Детали проекта
POST   /api/v1/projects                      # Создание проекта
PUT    /api/v1/projects/{id}                 # Обновление проекта
DELETE /api/v1/projects/{id}                 # Удаление проекта

# Участники
GET    /api/v1/projects/{id}/members         # Список участников
POST   /api/v1/projects/{id}/members         # Добавление участника
PUT    /api/v1/projects/{id}/members/{userId} # Изменение роли
DELETE /api/v1/projects/{id}/members/{userId} # Удаление участника

# Ресурсы
POST   /api/v1/projects/{id}/datasets        # Привязка датасета
DELETE /api/v1/projects/{id}/datasets/{datasetId}
POST   /api/v1/projects/{id}/models          # Привязка модели
DELETE /api/v1/projects/{id}/models/{modelId}

# Активность
GET    /api/v1/projects/{id}/activity        # История активности
```

---

## Модуль 8: Аналитика (Analytics Module)

### Описание
Дашборды, метрики и отчётность.

### Компоненты

| Компонент | Метрики |
|-----------|---------|
| DiagnosisStats | Количество распознаваний, распределение по болезням |
| ModelStats | Точность моделей, время обработки |
| DatasetStats | Объём данных, покрытие классов |
| UserStats | Активность пользователей |
| SystemStats | Нагрузка, latency, ошибки |

### API Endpoints

```
GET    /api/v1/analytics/dashboard           # Сводный дашборд
GET    /api/v1/analytics/diagnosis           # Статистика диагностики
GET    /api/v1/analytics/models              # Статистика моделей
GET    /api/v1/analytics/datasets            # Статистика датасетов
GET    /api/v1/analytics/users               # Активность пользователей
GET    /api/v1/analytics/system              # Системные метрики

# Экспорт
POST   /api/v1/analytics/export/pdf          # Экспорт в PDF
POST   /api/v1/analytics/export/excel        # Экспорт в Excel
```

---

## Frontend структура

```
src/
├── app/
│   ├── page.tsx                    # Dashboard
│   ├── diagnosis/
│   │   ├── page.tsx                # Распознавание
│   │   └── history/page.tsx        # История
│   ├── datasets/
│   │   ├── page.tsx                # Список датасетов
│   │   ├── [id]/page.tsx           # Детали датасета
│   │   └── new/page.tsx            # Создание датасета
│   ├── models/
│   │   ├── page.tsx                # Реестр моделей
│   │   └── [id]/page.tsx           # Детали модели
│   ├── training/
│   │   ├── page.tsx                # Список обучений
│   │   ├── [id]/page.tsx           # Детали обучения
│   │   └── new/page.tsx            # Новое обучение
│   ├── catalog/
│   │   ├── plants/page.tsx         # Растения
│   │   ├── diseases/page.tsx       # Болезни
│   │   └── pests/page.tsx          # Вредители
│   ├── projects/
│   │   ├── page.tsx                # Проекты
│   │   └── [id]/page.tsx           # Детали проекта
│   └── settings/
│       ├── page.tsx                # Настройки
│       ├── profile/page.tsx        # Профиль
│       └── cvat/page.tsx           # Настройки CVAT
├── components/
│   ├── ui/                         # shadcn/ui компоненты
│   ├── app-shell.tsx               # Layout с sidebar
│   ├── app-sidebar.tsx             # Навигация
│   ├── app-header.tsx              # Верхняя панель
│   ├── dashboard.tsx               # Дашборд
│   ├── diagnosis-interface.tsx     # Интерфейс диагностики
│   ├── dataset-card.tsx            # Карточка датасета
│   ├── model-card.tsx              # Карточка модели
│   ├── training-card.tsx           # Карточка обучения
│   └── ...
├── lib/
│   ├── api.ts                      # API клиент
│   ├── auth.ts                     # Аутентификация
│   └── utils.ts                    # Утилиты
└── hooks/
    ├── use-auth.ts
    ├── use-datasets.ts
    └── ...
```
