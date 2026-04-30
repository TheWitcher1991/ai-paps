# Sprint 7: Testing, Performance & Optimization

**Продолжительность:** 2 недели (14 дней)
**Цель:** Тестирование, оптимизация производительности и исправление багов

## Overview

Sprint 7 фокусируется на:

- Unit и интеграционных тестах
- E2E тестировании
- Оптимизации производительности
- Bug fixing

## Задачи

### 7.1 Unit Tests

**Описание:** Написание unit тестов

**Backend:**

| Задача | Описание | Зависимости | Приоритет |
|--------|----------|-------------|-----------|
| TEST-001 | Тесты для моделей (directory, projects, datasets) | - | MUST |
| TEST-002 | Тесты для serializers | TEST-001 | MUST |
| TEST-003 | Тесты для controllers (CRUD) | TEST-002 | MUST |
| TEST-004 | Тесты для use cases | TEST-003 | MUST |
| TEST-005 | Тесты для vision/inference | TEST-004 | SHOULD |
| TEST-006 | Тесты для training pipeline | TEST-005 | SHOULD |
| TEST-007 | Тесты для permissions | TEST-006 | MUST |
| TEST-008 | Тесты для CVAT интеграции | TEST-007 | SHOULD |

**Frontend:**

| Задача | Описание | Зависимости | Приоритет |
|--------|----------|-------------|-----------|
| TEST-101 | Unit тесты для компонентов | - | SHOULD |
| TEST-102 | Unit тесты для hooks | TEST-101 | SHOULD |
| TEST-103 | Unit тесты для utils | TEST-102 | SHOULD |

---

### 7.2 Integration Tests

**Описание:** Интеграционное тестирование

**Backend:**

| Задача | Описание | Зависимости | Приоритет |
|--------|----------|-------------|-----------|
| TEST-INT-001 | API integration tests | - | MUST |
| TEST-INT-002 | Celery tasks integration tests | TEST-INT-001 | SHOULD |
| TEST-INT-003 | Database transaction tests | TEST-INT-002 | SHOULD |

---

### 7.3 E2E Tests

**Описание:** End-to-end тестирование

**Frontend:**

| Задача | Описание | Зависимости | Приоритет |
|--------|----------|-------------|-----------|
| TEST-E2E-001 | Playwright настройка | - | MUST |
| TEST-E2E-002 | Тесты авторизации | TEST-E2E-001 | MUST |
| TEST-E2E-003 | Тесты создания датасета | TEST-E2E-002 | MUST |
| TEST-E2E-004 | Тесты обучения модели | TEST-E2E-003 | MUST |
| TEST-E2E-005 | Тесты распознавания | TEST-E2E-004 | MUST |

---

### 7.4 Performance Optimization

**Описание:** Оптимизация производительности

**Backend:**

| Задача | Описание | Зависимости | Приоритет |
|--------|----------|-------------|-----------|
| PERF-001 | Database query optimization (N+1) | - | MUST |
| PERF-002 | Redis caching strategy | PERF-001 | MUST |
| PERF-003 | Image processing optimization | PERF-002 | SHOULD |
| PERF-004 | Async operations optimization | PERF-003 | SHOULD |
| PERF-005 | Database indexes | PERF-004 | MUST |

**Frontend:**

| Задача | Описание | Зависимости | Приоритет |
|--------|----------|-------------|-----------|
| PERF-101 | Code splitting | - | MUST |
| PERF-102 | Image lazy loading | PERF-101 | MUST |
| PERF-103 | API request batching | PERF-102 | SHOULD |
| PERF-104 | Bundle size optimization | PERF-103 | MUST |

---

### 7.5 Bug Fixes

**Описание:** Исправление накопившихся багов

| Задача | Описание | Зависимости | Приоритет |
|--------|----------|-------------|-----------|
| BUG-001 | Сбор и категоризация багов | - | MUST |
| BUG-002 | Исправление критических багов | BUG-001 | MUST |
| BUG-003 | Исправление major багов | BUG-002 | MUST |
| BUG-004 | Исправление minor багов | BUG-003 | SHOULD |

---

## Технические детали

### Test Coverage Requirements

```python
# pytest.ini
[pytest]
DJANGO_SETTINGS_MODULE = config.settings
python_files = tests.py test_*.py *_tests.py

# Minimal coverage
[coverage:run]
source = .
omit =
    */migrations/*
    */tests/*
    */__pycache__/*
    */config/*

[coverage:report]
precision = 2
show_missing = True
skip_covered = False
```

### Database Indexes

```python
# services/core/datasets/models.py

class DatasetAsset(ModelAdapter):
    dataset = models.ForeignKey(Dataset, on_delete=models.CASCADE, related_name="assets")
    file = S3PrivateFileField(upload_to="datasets/images")
    file_name = models.CharField(t("Имя файла"), max_length=255, db_index=True)
    file_format = models.CharField(t("Формат"), max_length=32, db_index=True)
    width = models.IntegerField(t("Ширина"))
    height = models.IntegerField(t("Высота"))
    source_id = models.IntegerField(db_index=True)
    
    class Meta:
        indexes = [
            models.Index(fields=["dataset", "file_format"]),
            models.Index(fields=["created_date"]),
        ]
```

---

## Definition of Done

- [ ] Unit тесты покрывают 80% кода
- [ ] E2E тесты проходят для основных сценариев
- [ ] Нет N+1 запросов
- [ ] Кэширование работает
- [ ] Все критические баги исправлены

---

## Ресурсы

**Backend:**
- Разработчики: 2 backend разработчика
- Ожидаемое время: 80 человеко-часов

**Frontend:**
- Разработчики: 1 frontend разработчик
- Ожидаемое время: 40 человеко-часов

**QA:**
- Тестировщик: 1
- Ожидаемое время: 40 человеко-часов

**Total:** 160 человеко-часов