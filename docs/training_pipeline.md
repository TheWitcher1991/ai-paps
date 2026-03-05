# Пайплайн обучения ИИ

## Обзор

Сервис обучения ИИ находится в `services/core/training/`. Он использует датасеты из `services/core/datasets/` и модели из `services/core/vision/models/`.

## Основной процесс

```
1. Создание Model (готовая модель в БД)
        ↓
2. Создание Training (обучение с конфигом)
        ↓
3. Добавление TrainingDataset (связь с датасетами)
        ↓
4. POST /api/training/{id}/start/ - запуск обучения
        ↓
5. Мониторинг: GET /api/training/{id}/runs/
```

## API Endpoints

### Training

| Method | URL | Описание |
|--------|-----|----------|
| GET | `/api/training/` | Список всех обучений |
| POST | `/api/training/` | Создать новое обучение |
| GET | `/api/training/{id}/` | Получить детали обучения |
| PUT | `/api/training/{id}/` | Обновить обучение |
| DELETE | `/api/training/{id}/` | Удалить обучение |
| POST | `/api/training/{id}/start/` | Запустить обучение |
| GET | `/api/training/{id}/runs/` | Получить список запусков |

### Training Runs

| Method | URL | Описание |
|--------|-----|----------|
| GET | `/api/training-runs/{id}/` | Получить статус запуска |
| POST | `/api/training-runs/{id}/cancel/` | Отменить запуск |

## Пример использования

### 1. Создание обучения (Training)

```http
POST /api/training/
Content-Type: application/json

{
  "name": "Segment Tomatoes",
  "description": "Обучение сегментации томатов",
  "model": 1,
  "config": {
    "epochs": 20,
    "learning_rate": 0.0001,
    "optimizer": "adam",
    "loss_function": "CrossEntropy",
    "lr_scheduler": "plateau",
    "train_batch_size": 4,
    "valid_batch_size": 2,
    "image_width": 512,
    "image_height": 512,
    "early_stopping_patience": 5
  }
}
```

### 2. Добавление датасетов

```python
from training.models import TrainingDataset

TrainingDataset.objects.create(
    training_id=1,
    dataset_id=5
)
```

### 3. Запуск обучения

```http
POST /api/training/1/start/
```

### 4. Мониторинг статуса

```http
GET /api/training/1/runs/
```

Ответ:
```json
[
  {
    "id": 1,
    "training": 1,
    "status": "running",
    "current_epoch": 5,
    "train_loss": 0.234,
    "val_loss": 0.456,
    "started_date": "2024-01-15T10:00:00Z"
  }
]
```

### 5. Отмена обучения

```http
POST /api/training-runs/1/cancel/
```

## Доступные модели (vision/models)

| Архитектура | Класс | Backbone |
|-------------|-------|----------|
| UNet | `UNetAdapter` | - |
| DeepLabV3 | `DeepLabV3Adapter` | resnet50, resnet101 |
| FPN | `FPNWithBackboneAdapter` | resnet50, resnet101, resnet152 |

## Конфигурация обучения (TrainingConfig)

| Параметр | Тип | По умолчанию | Описание |
|----------|-----|--------------|----------|
| `epochs` | int | 20 | Количество эпох |
| `learning_rate` | float | 0.0001 | Скорость обучения |
| `optimizer` | str | adam | Оптимизатор (adam, adamw, sgd, rmsprop) |
| `loss_function` | str | BCEWithLogits | Функция потерь (BCE, BCEWithLogits, CrossEntropy, MSE) |
| `lr_scheduler` | str | plateau | Планировщик (step, exponential, plateau, cosine) |
| `train_batch_size` | int | 4 | Размер батча |
| `image_width` | int | 512 | Ширина изображения |
| `image_height` | int | 512 | Высота изображения |
| `early_stopping_patience` | int | 5 | Ранняя остановка |

## Статусы обучения (TrainingRun)

| Статус | Описание |
|--------|----------|
| `pending` | Ожидает |
| `queued` | В очереди |
| `running` | Обучение |
| `validating` | Валидация |
| `finished` | Завершено |
| `failed` | Ошибка |
| `cancelled` | Отменено |

## Внутренний процесс (TrainingService.run())

1. **Инициализация**: Установка сида для воспроизводимости
2. **Загрузка датасетов**: Через `DatasetLoader` из `DatasetAsset` + `DatasetAnnotation`
3. **Создание модели**: Выбор архитектуры (UNet/DeepLabV3/FPN)
4. **Обучение по эпохам**:
   - Forward pass
   - Backward pass
   - Логирование каждые 10 батчей
   - Сохранение `train_loss` после каждой эпохи
5. **Завершение**: Обновление статуса модели на `ready`

## Логирование

Используется `packages.usecases.logging.logger`:
- INFO: Основные события (старт/завершение/ошибки)
- DEBUG: Детали батчей

Пример:
```python
from packages.usecases.logging import logger

logger.info(f"Starting training: {training_id}")
logger.info(f"Epoch [{epoch+1}/{epochs}] Batch [{batch_idx}/{len(train_loader)}] Loss: {loss.item():.4f}")
```

## Структура файлов

```
training/
├── models.py           # Django модели
├── serializers.py      # DRF сериализаторы
├── repositories.py      # Репозитории
├── usecases.py         # Бизнес-логика
├── controllers.py       # API контроллеры
├── routers.py          # URL роутеры
├── filters.py          # Фильтры
└── services/
    ├── dataset_loader.py    # Загрузка датасетов
    └── training_service.py  # Основной сервис обучения
```
