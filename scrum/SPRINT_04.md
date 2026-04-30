# Sprint 4: Recognition & Visualization

**Продолжительность:** 2 недели (14 дней)
**Цель:** Завершить модуль распознавания и визуализации результатов

## Overview

Sprint 4 фокусируется на:

- Распознавании болезней по изображениям
- Визуализации результатов
- UI для загрузки и обработки изображений
- Истории и статистике распознаваний

## Задачи

### 4.1 Recognition UI

**Описание:** Пользовательский интерфейс для распознавания

**Frontend:**

| Задача | Описание | Зависимости | Приоритет |
|--------|----------|-------------|-----------|
| REC-101 | Drag-and-drop загрузка изображения | - | MUST |
| REC-102 | Выбор модели для распознавания | REC-101 | MUST |
| REC-103 | UI процесса распознавания (loading state) | REC-102 | MUST |
| REC-104 | Отображение результатов (класс, уверенность) | REC-103 | MUST |
| REC-105 | Визуализация heatmap (Grad-CAM) | REC-104 | MUST |
| REC-106 | Рекомендации по лечению | REC-105 | MUST |
| REC-107 | Сохранение результата в историю | REC-106 | MUST |

**Критерии приёмки:**
- [ ] Загрузка изображения работает
- [ ] Выбор модели работает
- [ ] Результат отображается с уверенностью
- [ ] Heatmap визуализируется

---

### 4.2 Recognition Backend Enhancement

**Backend:**

| Задача | Описание | Зависимости | Приоритет |
|--------|----------|-------------|-----------|
| REC-001 | Интеграция InferenceService с RecognitionController | - | MUST |
| REC-002 | Асинхронная обработка через Celery | REC-001 | MUST |
| REC-003 | Multi-class классификация | REC-002 | MUST |
| REC-004 | Сегментация пораженных областей | REC-003 | SHOULD |
| REC-005 | Grad-CAM генерация | REC-004 | SHOULD |
| REC-006 | Генерация рекомендаций на основе результата | REC-005 | MUST |
| REC-007 | Кэширование результатов для повторных запросов | REC-006 | SHOULD |

---

### 4.3 History & Statistics

**Описание:** История распознаваний и статистика

**Backend:**

| Задача | Описание | Зависимости | Приоритет |
|--------|----------|-------------|-----------|
| HIST-001 | Сохранение полной истории распознаваний | - | MUST |
| HIST-002 | API для истории пользователя | HIST-001 | MUST |
| HIST-003 | Статистика по распознаваниям (по дням, культурам) | HIST-002 | SHOULD |

**Frontend:**

| Задача | Описание | Зависимости | Приоритет |
|--------|----------|-------------|-----------|
| HIST-101 | История распознаваний (список) | - | MUST |
| HIST-102 | Детальный просмотр результата | HIST-101 | MUST |
| HIST-103 | Статистический дашборд | HIST-102 | SHOULD |
| HIST-104 | Фильтры в истории (дата, модель, результат) | HIST-101 | SHOULD |

**Критерии приёмки:**
- [ ] История сохраняется
- [ ] Просмотр деталей работает
- [ ] Статистика отображается

---

### 4.4 Visualization Components

**Описание:** Компоненты визуализации для UI

**Frontend:**

| Задача | Описание | Зависимости | Приоритет |
|--------|----------|-------------|-----------|
| VIS-101 | Компонент heatmap overlay | - | MUST |
| VIS-102 | Компонент confidence gauge | VIS-101 | MUST |
| VIS-103 | Компонент результатов (карточки) | VIS-102 | MUST |
| VIS-104 | Графики статистики (Chart.js) | VIS-103 | SHOULD |

---

## Технические детали

### Recognition Flow

```
1. User uploads image
2. Select model
3. POST /api/v1/recognitions/
4. Celery task created
5. Image preprocessed
6. Inference run
7. Result generated with Grad-CAM
8. Recommendations fetched
9. Result saved to history
10. WebSocket/Polling notifies client
11. Result displayed with visualization
```

### Grad-CAM Implementation

```python
# services/core/vision/gradcam.py

class GradCAM:
    """Gradient-weighted Class Activation Mapping."""
    
    def __init__(self, model, target_layer):
        self.model = model
        self.target_layer = target_layer
        self.gradients = None
        self.activations = None
    
    def generate_cam(self, input_tensor, target_class):
        """Генерация heatmap."""
        # Forward pass
        output = self.model(input_tensor)
        
        # Backward pass
        self.model.zero_grad()
        target = output[0, target_class]
        target.backward()
        
        # Get gradients and activations
        gradients = self.gradients.cpu().data.numpy()[0]
        activations = self.activations.cpu().data.numpy()[0]
        
        # Weight activations
        weights = np.mean(gradients, axis=(1, 2))
        cam = np.zeros(activations.shape[1:], dtype=np.float32)
        
        for i, w in enumerate(weights):
            cam += w * activations[i]
        
        # ReLU and normalize
        cam = np.maximum(cam, 0)
        cam = cv2.resize(cam, (input_tensor.shape[3], input_tensor.shape[2]))
        cam = (cam - cam.min()) / (cam.max() - cam.min() + 1e-8)
        
        return cam
```

---

## Definition of Done

- [ ] Распознавание работает из UI
- [ ] Heatmap визуализируется
- [ ] Рекомендации отображаются
- [ ] История сохраняется и отображается
- [ ] Статистика строится

---

## Ресурсы

**Backend:**
- Разработчики: 1 backend разработчик
- Ожидаемое время: 50 человеко-часов

**Frontend:**
- Разработчики: 2 frontend разработчика
- Ожидаемое время: 80 человеко-часов

**Total:** 130 человеко-часов