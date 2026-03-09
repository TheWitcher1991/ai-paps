# Модель AI-PAPS

## Обзор

Модель в системе AI-PAPS представляет собой конфигурацию обученной нейронной сети для задач компьютерного зрения. Модели используются для распознавания болезней и вредителей растений.

## Структура модели

### Источники данных

| Уровень | Файл | Описание |
|---------|------|----------|
| Backend | `services/core/training/models.py` | Django модель |
| Frontend Types | `clients/packages/models/src/model/model.types.ts` | TypeScript типы |
| Frontend Enums | `clients/packages/models/src/model/model.enums.ts` | Перечисления |

### Поля модели

| Поле | Тип | Обязательно | Описание |
|------|-----|-------------|----------|
| `id` | integer | Да | Уникальный идентификатор |
| `name` | string | Да | Название модели |
| `alias` | string | Да | Алиас (краткое имя) |
| `description` | string | Нет | Описание модели |
| `file` | string (URL) | Нет | Ссылка на файл модели в S3 |
| `subset` | enum | Да | Тип задачи |
| `architecture` | enum | Да | Архитектура нейросети |
| `framework` | enum | Да | Фреймворк |
| `backbone` | enum | Да | Бэкбоун сети |
| `status` | enum | Да | Статус модели |
| `created_date` | datetime | Да | Дата создания |
| `updated_date` | datetime | Да | Дата обновления |

---

## Перечисления (Enums)

### ModelSubset — Тип задачи

| Значение | Описание |
|----------|----------|
| `classification` | Классификация |
| `segmentation` | Сегментация |
| `detection` | Обнаружение объектов |

### ModelFramework — Фреймворк

| Значение | Описание |
|----------|----------|
| `tensorflow` | TensorFlow |
| `pytorch` | PyTorch |
| `ultralytics` | Ultralytics (YOLO) |

### ModelArchitecture — Архитектура

| Значение | Описание |
|----------|----------|
| `unet` | U-Net (сегментация) |
| `deeplabv3` | DeepLabV3 (сегментация) |
| `fpn` | Feature Pyramid Network |
| `yolo` | YOLO (детекция) |
| `mask_rcnn` | Mask R-CNN (instance segmentation) |

### ModelBackbone — Бэкбоун

| Значение | Описание |
|----------|----------|
| `resnet50` | ResNet-50 |
| `resnet101` | ResNet-101 |
| `resnet152` | ResNet-152 |

### ModelStatus — Статус модели

| Значение | Описание |
|----------|----------|
| `ready` | Готова |
| `deployed` | Развернута |
| `training` | Обучается |
| `archived` | Архив |

---

## Метрики обучения

Метрики сохраняются в модели `TrainingRun` после каждого запуска обучения.

### Доступные метрики

| Метрика | Тип | Описание |
|---------|-----|----------|
| `train_loss` | float | Функция потерь на обучающей выборке |
| `val_loss` | float | Функция потерь на валидационной выборке |
| `test_loss` | float | Функция потерь на тестовой выборке |
| `current_epoch` | integer | Текущая эпоха обучения |

### Статусы обучения (TrainingRun)

| Статус | Описание |
|--------|----------|
| `pending` | Ожидает |
| `queued` | В очереди |
| `running` | Обучение |
| `validating` | Валидация |
| `finished` | Завершено |
| `failed` | Ошибка |
| `cancelled` | Отменено |

---

## Конфигурация обучения

Параметры обучения хранятся в модели `TrainingConfig`.

### Основные параметры

| Параметр | Тип | По умолчанию | Описание |
|----------|-----|--------------|----------|
| `epochs` | integer | 20 | Количество эпох |
| `learning_rate` | float | 0.0001 | Скорость обучения |
| `train_batch_size` | integer | 4 | Размер батча |
| `valid_batch_size` | integer | 2 | Размер валидационного батча |
| `valid_ratio` | float | 0.2 | Доля валидации |
| `test_ratio` | float | 0.1 | Доля теста |
| `seed` | integer | 42 | Сид для воспроизводимости |
| `early_stopping_patience` | integer | 5 | Ранняя остановка |
| `image_width` | integer | 512 | Ширина изображения |
| `image_height` | integer | 512 | Высота изображения |

### Оптимизатор

| Значение | Описание |
|----------|----------|
| `adam` | Adam |
| `adamw` | AdamW |
| `sgd` | SGD |
| `rmsprop` | RMSprop |

### Функция потерь

| Значение | Описание |
|----------|----------|
| `BCE` | Binary Cross-Entropy |
| `BCEWithLogits` | BCE With Logits |
| `CrossEntropy` | Cross Entropy |
| `DICE` | DICE Loss |
| `BinaryCrossEntropy` | Binary Cross-Entropy (альтернатива) |
| `MSE` | Mean Squared Error |

### Планировщик LR

| Значение | Описание |
|----------|----------|
| `StepLR` | Step Learning Rate |
| `ExponentialLR` | Exponential LR |
| `ReduceLROnPlateau` | Reduce LR On Plateau |
| `CosineAnnealingLR` | Cosine Annealing LR |
| `CosineAnnealingWarmRestarts` | Cosine Annealing with Warm Restarts |

### Аугментация

| Параметр | Тип | По умолчанию | Описание |
|----------|-----|--------------|----------|
| `use_flip` | boolean | false | Использовать отражение |
| `rotation_degrees` | integer | 0 | Угол поворота |
| `hsv_h` | integer | 0 | Оттенок (Hue) |
| `hsv_s` | integer | 0 | Насыщенность (Saturation) |
| `hsv_v` | integer | 0 | Яркость (Value) |

---

## API Endpoints

### Модели

| Метод | URL | Описание |
|-------|-----|----------|
| GET | `/api/models/` | Список моделей |
| POST | `/api/models/` | Создать модель |
| GET | `/api/models/{id}/` | Получить модель |
| PUT | `/api/models/{id}/` | Обновить модель |
| DELETE | `/api/models/{id}/` | Удалить модель |

### Обучение

| Метод | URL | Описание |
|-------|-----|----------|
| GET | `/api/training/` | Список обучений |
| POST | `/api/training/` | Создать обучение |
| GET | `/api/training/{id}/` | Получить обучение |
| POST | `/api/training/{id}/start/` | Запустить обучение |
| GET | `/api/training/{id}/runs/` | Получить запуски |

### Запуски обучения

| Метод | URL | Описание |
|-------|-----|----------|
| GET | `/api/training-runs/{id}/` | Получить статус |
| POST | `/api/training-runs/{id}/cancel/` | Отменить |

---

## UI Компоненты

Компоненты находятся в `clients/apps/web/src/models/model/ui/`:

| Компонент | Назначение |
|-----------|------------|
| `ModelCard` | Карточка модели с основной информацией |
| `ModelCell` | Ячейка модели для списков |
| `ModelSelect` | Выпадающий список моделей |
| `OptimizerSelect` | Выбор оптимизатора |
| `LossFunctionSelect` | Выбор функции потерь |
| `SchedulerSelect` | Выбор планировщика LR |

---

## Пример использования

### Создание модели

```http
POST /api/models/
Content-Type: application/json

{
  "name": "Tomato Disease Detector",
  "alias": "tomato-detector-v1",
  "description": "Модель для определения болезней томатов",
  "subset": "segmentation",
  "framework": "pytorch",
  "architecture": "deeplabv3",
  "backbone": "resnet101"
}
```

### Запуск обучения

```http
POST /api/training/
Content-Type: application/json

{
  "name": "First Training",
  "model": 1,
  "config": {
    "epochs": 20,
    "learning_rate": 0.0001,
    "optimizer": "adam",
    "loss_function": "CrossEntropy",
    "lr_scheduler": "plateau",
    "train_batch_size": 4,
    "image_width": 512,
    "image_height": 512
  }
}
```

### Ответ с метриками

```json
{
  "id": 1,
  "training": 1,
  "status": "finished",
  "current_epoch": 20,
  "train_loss": 0.123,
  "val_loss": 0.234,
  "test_loss": 0.256,
  "started_date": "2024-01-15T10:00:00Z",
  "finished_date": "2024-01-16T14:00:00Z"
}
```

---

## Связанные документы

- [Пайплайн обучения](training_pipeline.md)
- [Продуктовая документация](PRODUCT.md)
