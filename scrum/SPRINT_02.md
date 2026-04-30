# Sprint 2: CVAT Integration & Dataset Management

**Продолжительность:** 2 недели (14 дней)
**Цель:** Завершить интеграцию с CVAT и улучшить управление датасетами

## Overview

Sprint 2 фокусируется на:

- Завершении интеграции с CVAT
- Улучшении управления датасетами
- Импорте/экспорте данных
- Продвинутых операциях с данными

## Задачи

### 2.1 CVAT Integration — Полная реализация

**Описание:** Завершение модуля интеграции с CVAT для разметки изображений

**Backend:**

| Задача | Описание | Зависимости | Приоритет |
|--------|----------|-------------|-----------|
| CVAT-001 | Реализовать полный CVAT SDK wrapper | - | MUST |
| CVAT-002 | Синхронизация проектов CVAT | CVAT-001 | MUST |
| CVAT-003 | Синхронизация задач CVAT | CVAT-002 | SHOULD |
| CVAT-004 | Импорт аннотаций из CVAT (COCO, YOLO, Pascal VOC) | CVAT-001 | MUST |
| CVAT-005 | Экспорт датасетов в форматы CVAT | CVAT-004 | SHOULD |
| CVAT-006 | Реализовать webhooks для обновлений CVAT | CVAT-005 | SHOULD |
| CVAT-007 | Интеграция с модулем Dataset — связь CVAT tasks с DatasetAsset | CVAT-004 | MUST |

**Frontend:**

| Задача | Описание | Зависимости | Приоритет |
|--------|----------|-------------|-----------|
| CVAT-101 | Страница настроек CVAT (API key, URL) | - | MUST |
| CVAT-102 | UI синхронизации проектов | CVAT-101 | MUST |
| CVAT-103 | UI просмотра задач CVAT | CVAT-102 | MUST |
| CVAT-104 | UI статуса разметки | CVAT-103 | MUST |

**Критерии приёмки:**
- [ ] Настройка подключения к CVAT через UI
- [ ] Импорт проектов из CVAT
- [ ] Импорт размеченных данных в Dataset
- [ ] Просмотр статуса разметки задач CVAT

---

### 2.2 Dataset Management — Расширенные функции

**Описание:** Расширенное управление датасетами

**Backend:**

| Задача | Описание | Зависимости | Приоритет |
|--------|----------|-------------|-----------|
| DS-001 | Загрузка файлов через chunks (большие файлы) | - | MUST |
| DS-002 | Bulk загрузка изображений (ZIP архив) | DS-001 | SHOULD |
| DS-003 | Аугментация датасета (базовая) | - | SHOULD |
| DS-004 | Разделение датасета (train/val/test) | - | MUST |
| DS-005 | Валидация качества датасета | - | SHOULD |
| DS-006 | Статистика датасета (распределение классов) | - | MUST |
| DS-007 | Удаление дубликатов изображений | - | SHOULD |

**Frontend:**

| Задача | Описание | Зависимости | Приоритет |
|--------|----------|-------------|-----------|
| DS-101 | Drag-and-drop загрузка файлов | - | MUST |
| DS-102 | UI прогресса загрузки | DS-101 | MUST |
| DS-103 | Визуализация статистики датасета | - | MUST |
| DS-104 | UI разделения датасета | - | MUST |
| DS-105 | Предпросмотр изображений в галерее | - | MUST |

**Критерии приёмки:**
- [ ] Загрузка файлов с прогрессом
- [ ] Статистика по классам отображается
- [ ] Можно разделить датасет на train/val/test
- [ ] Галерея изображений работает

---

### 2.3 Dataset — API Enhancement

| Задача | Описание | Зависимости | Приоритет |
|--------|----------|-------------|-----------|
| DS-API-001 | Добавить эндпоинт для получения изображения по ID | - | MUST |
| DS-API-002 | Добавить эндпоинт для пакетного удаления ассетов | - | MUST |
| DS-API-003 | Оптимизировать запросы списков (select_related, prefetch_related) | - | SHOULD |
| DS-API-004 | Кэширование часто запрашиваемых данных | - | SHOULD |

---

## Технические детали

### CVAT SDK Integration

```python
# services/core/cvat/sdk.py

class CVATClient:
    """Client для работы с CVAT API."""
    
    def __init__(self, base_url: str, api_key: str):
        self.base_url = base_url
        self.api_key = api_key
        self.session = requests.Session()
        self.session.headers.update({"Authorization": f"Token {api_key}"})
    
    def get_projects(self) -> List[dict]:
        """Получить список проектов."""
        response = self.session.get(f"{self.base_url}/api/projects")
        return response.json()["results"]
    
    def get_project(self, project_id: int) -> dict:
        """Получить проект по ID."""
        response = self.session.get(f"{self.base_url}/api/projects/{project_id}")
        return response.json()
    
    def get_tasks(self, project_id: int) -> List[dict]:
        """Получить задачи проекта."""
        response = self.session.get(
            f"{self.base_url}/api/tasks",
            params={"project_id": project_id}
        )
        return response.json()["results"]
    
    def get_annotations(self, task_id: int, format: str = "coco") -> bytes:
        """Получить аннотации задачи."""
        # Запуск экспорта
        response = self.session.post(
            f"{self.base_url}/api/tasks/{task_id}/annotations",
            json={"format": format}
        )
        # Ожидание завершения и получение файла
        ...
```

### Dataset Split Logic

```python
# services/core/datasets/usecases.py

def split_dataset(dataset_id: int, train_ratio: float = 0.7, val_ratio: float = 0.2, test_ratio: float = 0.1):
    """Разделение датасета на train/val/test.
    
    Args:
        dataset_id: ID датасета
        train_ratio: Доля для обучающей выборки
        val_ratio: Доля для валидационной выборки
        test_ratio: Доля для тестовой выборки
    """
    assert abs(train_ratio + val_ratio + test_ratio - 1.0) < 0.001
    
    assets = list(DatasetAsset.objects.filter(dataset_id=dataset_id))
    random.shuffle(assets)
    
    total = len(assets)
    train_end = int(total * train_ratio)
    val_end = train_end + int(total * val_ratio)
    
    train_assets = assets[:train_end]
    val_assets = assets[train_end:val_end]
    test_assets = assets[val_end:]
    
    # Создание под датасетов
    train_dataset = create_subset_dataset(dataset, "train", train_assets)
    val_dataset = create_subset_dataset(dataset, "val", val_assets)
    test_dataset = create_subset_dataset(dataset, "test", test_assets)
    
    return train_dataset, val_dataset, test_dataset
```

---

## Definition of Done

- [ ] CVAT интеграция работает (импорт проектов и аннотаций)
- [ ] Загрузка файлов с прогрессом
- [ ] Статистика датасета отображается
- [ ] Разделение датасета работает
- [ ] Frontend соответствует дизайну

---

## Ресурсы

**Backend:**
- Разработчики: 2 backend разработчика
- Ожидаемое время: 80 человеко-часов

**Frontend:**
- Разработчики: 1 frontend разработчик
- Ожидаемое время: 50 человеко-часов

**Total:** 130 человеко-часов