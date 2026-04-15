# AI-PAPS: API документация

## Содержание

1. [Обзор API](#обзор-api)
2. [Аутентификация](#аутентификация)
3. [Endpoints](#endpoints)
   - [Users](#users)
   - [Datasets](#datasets)
   - [Training](#training)
   - [Directory](#directory)
   - [Projects](#projects)
   - [CVAT](#cvat)
4. [Схема данных](#схема-данных)
5. [Ошибки](#ошибки)

---

## Обзор API

**Base URL:** `http://localhost:8000/v1/`

**Версионирование:** API использует версионирование URL `/v1/`

**Документация:** Интерактивная документация доступна по адресу:
- Swagger UI: `/v1/docs/`
- ReDoc: `/v1/redoc/`
- OpenAPI Schema: `/v1/schema/`

### Формат запросов

- **Content-Type:** `application/json`
- **Accept:** `application/json`

---

## Аутентификация

API использует JWT токены для аутентификации.

### Заголовки

```
Authorization: Bearer <access_token>
```

### Токены

| Тип | Описание |
|-----|----------|
| `access_token` | Токен доступа (короткоживущий) |
| `refresh_token` | Токен обновления (долгоживущий) |

### Получение токена

```bash
# Пример запроса (требуется настроить endpoint)
POST /v1/auth/token/
Content-Type: application/json

{
  "username": "user@example.com",
  "password": "password"
}
```

### Обновление токена

```bash
POST /v1/auth/token/refresh/
Content-Type: application/json

{
  "refresh_token": "<refresh_token>"
}
```

---

## Endpoints

### Users

#### Получить текущего пользователя

```
GET /v1/users/me/
```

**Ответ:**
```json
{
  "id": 1,
  "username": "admin",
  "email": "admin@paps.ru",
  "first_name": "Admin",
  "last_name": "User",
  "role": "admin",
  "date_joined": "2024-01-15T10:30:00Z"
}
```

#### Список пользователей

```
GET /v1/users/
```

**Параметры:**
| Параметр | Тип | Описание |
|----------|-----|----------|
| `page` | int | Номер страницы |
| `page_size` | int | Размер страницы |
| `search` | string | Поиск по имени |
| `role` | string | Фильтр по роли |

---

### Datasets

#### Список датасетов

```
GET /v1/datasets/
```

**Параметры:**
| Параметр | Тип | Описание |
|----------|-----|----------|
| `source` | string | Источник (cvat, manual) |
| `status` | string | Статус датасета |
| `subset` | string | Назначение (train, valid, test) |

**Ответ:**
```json
{
  "count": 10,
  "next": "http://localhost:8000/v1/datasets/?page=2",
  "results": [
    {
      "id": 1,
      "name": "Dataset 1",
      "description": "Описание датасета",
      "source": "cvat",
      "status": "uploaded",
      "format": "coco",
      "subset": "train",
      "modality": "rgb",
      "size": 1024000,
      "asset_count": 100,
      "annotation_count": 250,
      "annotated_percent": 85.5,
      "created_date": "2024-01-15T10:30:00Z"
    }
  ]
}
```

#### Создать датасет

```
POST /v1/datasets/
```

**Тело запроса:**
```json
{
  "name": "New Dataset",
  "description": "Описание",
  "source_id": 123,
  "source": "cvat",
  "format": "coco",
  "subset": "train",
  "modality": "rgb"
}
```

#### Получить датасет

```
GET /v1/datasets/{id}/
```

#### Обновить датасет

```
PATCH /v1/datasets/{id}/
```

#### Удалить датасет

```
DELETE /v1/datasets/{id}/
```

#### Ассеты датасета

```
GET /v1/datasets/{id}/assets/
```

#### Классы датасета

```
GET /v1/datasets/{id}/classes/
```

---

### Training

#### Список обучений

```
GET /v1/training/
```

**Параметры:**
| Параметр | Тип | Описание |
|----------|-----|----------|
| `model` | int | ID модели |
| `status` | string | Статус обучения |

**Ответ:**
```json
{
  "count": 5,
  "results": [
    {
      "id": 1,
      "name": "Training 1",
      "description": "Обучение модели сегментации",
      "model": {
        "id": 1,
        "name": "UNet Model",
        "architecture": "unet",
        "status": "ready"
      },
      "config": {
        "epochs": 20,
        "learning_rate": 0.0001,
        "train_batch_size": 4,
        "image_width": 512,
        "image_height": 512
      },
      "datasets": [
        {
          "dataset": {
            "id": 1,
            "name": "Dataset 1"
          }
        }
      ],
      "runs": [
        {
          "id": 1,
          "status": "finished",
          "current_epoch": 20,
          "iou": 0.85,
          "precision": 0.88,
          "recall": 0.82
        }
      ]
    }
  ]
}
```

#### Создать обучение

```
POST /v1/training/
```

**Тело запроса:**
```json
{
  "name": "New Training",
  "description": "Описание обучения",
  "model_id": 1,
  "config": {
    "epochs": 20,
    "learning_rate": 0.0001,
    "optimizer": "adam",
    "loss_function": "CrossEntropy",
    "train_batch_size": 4,
    "valid_batch_size": 2,
    "image_width": 512,
    "image_height": 512,
    "lr_scheduler": "plateau"
  },
  "datasets": [
    {"dataset_id": 1}
  ]
}
```

#### Запустить обучение

```
POST /v1/training/{id}/start/
```

**Ответ:**
```json
{
  "training_id": 1,
  "run_id": 1,
  "status": "running"
}
```

#### Статус обучения

```
GET /v1/training/{id}/runs/
```

**Ответ:**
```json
{
  "count": 1,
  "results": [
    {
      "id": 1,
      "training": 1,
      "status": "running",
      "current_epoch": 5,
      "train_loss": 0.15,
      "val_loss": 0.22,
      "iou": 0.75,
      "precision": 0.78,
      "recall": 0.72,
      "f1_score": 0.75,
      "accuracy": 0.90,
      "started_date": "2024-01-15T10:30:00Z"
    }
  ]
}
```

#### Отменить обучение

```
POST /v1/training/{id}/cancel/
```

---

### Models

#### Список моделей

```
GET /v1/models/
```

**Параметры:**
| Параметр | Тип | Описание |
|----------|-----|----------|
| `architecture` | string | Архитектура |
| `status` | string | Статус модели |

**Ответ:**
```json
{
  "count": 3,
  "results": [
    {
      "id": 1,
      "name": "UNet Model",
      "alias": "unet_v1",
      "description": "UNet для сегментации",
      "subset": "segmentation",
      "framework": "pytorch",
      "architecture": "unet",
      "backbone": "resnet50",
      "status": "ready",
      "metrics": {
        "iou": 0.85,
        "precision": 0.88,
        "recall": 0.82,
        "f1_score": 0.85
      },
      "classes": [
        {"id": 1, "name": "healthy", "source_id": 1},
        {"id": 2, "name": "disease", "source_id": 2}
      ],
      "training_count": 3
    }
  ]
}
```

#### Создать модель

```
POST /v1/models/
```

**Тело запроса:**
```json
{
  "name": "New Model",
  "alias": "model_v1",
  "description": "Описание модели",
  "subset": "segmentation",
  "framework": "pytorch",
  "architecture": "unet",
  "backbone": "resnet50"
}
```

---

### Directory

#### Справочник растений

```
GET /v1/directory/plants/
```

#### Справочник болезней

```
GET /v1/directory/diseases/
```

#### Справочник вредителей

```
GET /v1/directory/pests/
```

---

### Projects

#### Список проектов

```
GET /v1/projects/
```

#### Создать проект

```
POST /v1/projects/
```

---

### CVAT

#### Синхронизация проектов

```
GET /v1/cvat/projects/
```

#### Импорт датасета из CVAT

```
POST /v1/cvat/datasets/{id}/import/
```

---

## Схема данных

### PaginatiedResponse

```typescript
interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
```

### Error Response

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": {
      "field_name": ["Error message"]
    }
  }
}
```

---

## Ошибки

### HTTP Status Codes

| Код | Описание |
|-----|----------|
| 200 | Успешный запрос |
| 201 | Создан |
| 204 | Нет содержимого |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 422 | Validation Error |
| 500 | Internal Server Error |

### Коды ошибок

| Код | Описание |
|-----|----------|
| `VALIDATION_ERROR` | Ошибка валидации |
| `AUTHENTICATION_FAILED` | Ошибка аутентификации |
| `PERMISSION_DENIED` | Нет прав доступа |
| `NOT_FOUND` | Ресурс не найден |
| `CONFLICT` | Конфликт данных |
| `INTERNAL_ERROR` | Внутренняя ошибка |

---

## Примеры использования

### Python

```python
import requests

API_URL = "http://localhost:8000/v1"

# Получить список датасетов
response = requests.get(
    f"{API_URL}/datasets/",
    headers={"Authorization": "Bearer <token>"}
)
datasets = response.json()

# Запустить обучение
response = requests.post(
    f"{API_URL}/training/1/start/",
    headers={"Authorization": "Bearer <token>"}
)
```

### JavaScript

```javascript
const API_URL = "http://localhost:8000/v1";

// Получить список датасетов
const response = await fetch(`${API_URL}/datasets/`, {
  headers: { Authorization: `Bearer ${token}` }
});
const datasets = await response.json();

// Запустить обучение
await fetch(`${API_URL}/training/1/start/`, {
  method: "POST",
  headers: { Authorization: `Bearer ${token}` }
});
```

### cURL

```bash
# Получить список датасетов
curl -X GET http://localhost:8000/v1/datasets/ \
  -H "Authorization: Bearer <token>"

# Запустить обучение
curl -X POST http://localhost:8000/v1/training/1/start/ \
  -H "Authorization: Bearer <token>"
```
