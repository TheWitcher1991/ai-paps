# Sprint 3: Training Pipeline & Model Management

**Продолжительность:** 2 недели (14 дней)
**Цель:** Завершить пайплайн обучения моделей и управление моделями

## Overview

Sprint 3 фокусируется на:

- Завершении пайплайна обучения
- Управлении обученными моделями
- Мониторинге процесса обучения
- Экспорте моделей

## Задачи

### 3.1 Training Pipeline — Backend

**Описание:** Завершение пайплайна обучения нейросетей

**Backend:**

| Задача | Описание | Зависимости | Приоритет |
|--------|----------|-------------|-----------|
| TR-001 | Интеграция TrainingService с Celery | - | MUST |
| TR-002 | Реализация DataLoader для Dataset | TR-001 | MUST |
| TR-003 | Реализация аугментаций (albumentations) | - | SHOULD |
| TR-004 | Обучение модели (базовые архитектуры) | TR-002 | MUST |
| TR-005 | Валидация во время обучения | TR-004 | MUST |
| TR-006 | Early stopping и model checkpoint | TR-005 | SHOULD |
| TR-007 | Сохранение метрик обучения (TensorBoard/CSV) | TR-006 | MUST |
| TR-008 | Обработка ошибок и retry логика | TR-007 | SHOULD |
| TR-009 | Уведомления о завершении обучения | TR-008 | SHOULD |

**Frontend:**

| Задача | Описание | Зависимости | Приоритет |
|--------|----------|-------------|-----------|
| TR-101 | UI выбора датасета и параметров | - | MUST |
| TR-102 | UI выбора архитектуры модели | TR-101 | MUST |
| TR-103 | Запуск обучения с UI | TR-102 | MUST |
| TR-104 | Отображение прогресса обучения (реальное время) | TR-103 | MUST |
| TR-105 | Графики метрик (loss, accuracy, etc) | TR-104 | MUST |
| TR-106 | История обучений | - | MUST |

**Критерии приёмки:**
- [ ] Можно запустить обучение из UI
- [ ] Прогресс обучения отображается в реальном времени
- [ ] Графики метрик строятся
- [ ] Модель сохраняется после обучения

---

### 3.2 Model Management

**Описание:** Управление обученными моделями

**Backend:**

| Задача | Описание | Зависимости | Приоритет |
|--------|----------|-------------|-----------|
| M-001 | Версионирование моделей | - | MUST |
| M-002 | Метаданные модели (описание, дата обучения, метрики) | M-001 | MUST |
| M-003 | Экспорт модели (ONNX, TorchScript) | - | SHOULD |
| M-004 | Тестирование модели (inference на тестовой выборке) | - | SHOULD |
| M-005 | Удаление моделей с подтверждением | - | MUST |
| M-006 | Сравнение моделей по метрикам | M-004 | SHOULD |

**Frontend:**

| Задача | Описание | Зависимости | Приоритет |
|--------|----------|-------------|-----------|
| M-101 | Галерея моделей с фильтрами | - | MUST |
| M-102 | Карточка модели с метриками | M-101 | MUST |
| M-103 | UI экспорта модели | M-102 | SHOULD |
| M-104 | UI сравнения моделей | M-103 | SHOULD |

**Критерии приёмки:**
- [ ] Список моделей с фильтрацией
- [ ] Просмотр метаданных модели
- [ ] Удаление модели работает

---

### 3.3 Inference Service Enhancement

| Задача | Описание | Зависимости | Приоритет |
|--------|----------|-------------|-----------|
| INF-001 | Batch inference (несколько изображений) | - | SHOULD |
| INF-002 | Асинхронный inference через Celery | - | MUST |
| INF-003 | Grad-CAM визуализация | - | SHOULD |
| INF-004 | Кэширование результатов | - | SHOULD |

---

## Технические детали

### Training Celery Task

```python
# services/core/training/tasks.py

@shared_task(bind=True, max_retries=3)
def train_model_task(self, training_id: int):
    """Задача обучения модели."""
    from training.services.training_service import TrainingService
    
    training_service = TrainingService()
    
    try:
        # Загрузка конфигурации
        training_config = training_service.get_config(training_id)
        
        # Загрузка датасета
        dataset_loader = DatasetLoader()
        train_loader, val_loader = dataset_loader.load(
            training_config.dataset_ids,
            batch_size=training_config.batch_size,
            image_size=(training_config.image_width, training_config.image_height)
        )
        
        # Создание модели
        model = training_service.create_model(
            training_config.architecture,
            num_classes=training_config.num_classes
        )
        
        # Обучение
        for epoch in range(training_config.epochs):
            # Train epoch
            train_loss, train_metrics = train_epoch(model, train_loader)
            
            # Validation
            val_loss, val_metrics = validate(model, val_loader)
            
            # Обновление прогресса
            training_service.update_run(
                training_id,
                epoch=epoch,
                train_loss=train_loss,
                val_loss=val_loss,
                **val_metrics
            )
            
            # Early stopping check
            if should_stop(val_metrics, training_config):
                break
        
        # Сохранение модели
        model_path = training_service.save_model(training_id, model)
        
        return {"status": "completed", "model_path": model_path}
        
    except Exception as e:
        logger.error(f"Training failed: {e}")
        self.retry(exc=e, countdown=60)
```

### Model Versioning

```python
# services/core/training/models.py

class ModelVersion(ModelAdapter):
    """Версия модели."""
    model = models.ForeignKey(Model, on_delete=models.CASCADE, related_name="versions")
    version = models.CharField(t("Версия"), max_length=32)
    file = S3PrivateFileField(t("Файл модели"), upload_to="models/versions/")
    metrics = models.JSONField(t("Метрики"))
    training_config = models.JSONField(t("Конфигурация обучения"))
    is_active = models.BooleanField(t("Активная"), default=False)
    
    class Meta:
        ordering = ("-created_date",)
        unique_together = [("model", "version")]
```

---

## Definition of Done

- [ ] Обучение запускается из UI
- [ ] Прогресс обучения в реальном времени
- [ ] Графики метрик строятся
- [ ] Модель сохраняется после обучения
- [ ] Управление версиями моделей работает

---

## Ресурсы

**Backend:**
- Разработчики: 2 backend разработчика
- Ожидаемое время: 90 человеко-часов

**Frontend:**
- Разработчики: 1 frontend разработчик
- Ожидаемое время: 60 человеко-часов

**Total:** 150 человеко-часов