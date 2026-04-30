# Sprint 1: Core Infrastructure & Foundation

**Продолжительность:** 2 недели (14 дней)
**Цель:** Завершить базовую инфраструктуру и функциональность для всех модулей

## Overview

Sprint 1 направлен на завершение core-модулей системы и обеспечение базовой функциональности для всех основных сущностей. На данном этапе мы фокусируемся на:

- Завершении моделей данных
- Базовых CRUD операциях
- Базовая интеграция frontend-backend
- Настройка Docker и инфраструктуры

## Задачи

### 1.1 Directory Module — Полная реализация

**Описание:** Завершение справочного модуля для хранения растений, болезней и вредителей

**Backend:**

| Задача | Описание | Зависимости | Приоритет |
|--------|----------|-------------|-----------|
| D-001 | Создать модели: Plant, Disease, Pest, Symptom | - | MUST |
| D-002 | Реализовать serializers для всех моделей | D-001 | MUST |
| D-003 | Реализовать controllers с базовым CRUD | D-002 | MUST |
| D-004 | Добавить фильтры для поиска растений/болезней | D-003 | SHOULD |
| D-005 | Настроить роутеры и URL | D-003 | MUST |

**Frontend:**

| Задача | Описание | Зависимости | Приоритет |
|--------|----------|-------------|-----------|
| D-101 | Создать UI страницы справочника | - | MUST |
| D-102 | Реализовать компоненты списков (растения, болезни, вредители) | D-101 | MUST |
| D-103 | Создать формы создания/редактирования | D-102 | MUST |
| D-104 | Добавить поиск и фильтрацию | D-103 | SHOULD |

**Критерии приёмки:**
- [ ] Можно создавать/редактировать/удалять растения
- [ ] Можно создавать/редактировать/удалять болезни
- [ ] Можно создавать/редактировать/удалять вредителей
- [ ] Работает поиск по названию
- [ ] Frontend отображает списки и формы

---

### 1.2 Projects Module — Полная реализация

**Описание:** Модуль проектов для организации работы с датасетами и моделями

**Backend:**

| Задача | Описание | Зависимости | Приоритет |
|--------|----------|-------------|-----------|
| P-001 | Создать модели: Project, ProjectMember, ProjectDataset, ProjectModel | - | MUST |
| P-002 | Реализовать serializers | P-001 | MUST |
| P-003 | Реализовать controllers с CRUD | P-002 | MUST |
| P-004 | Добавить систему приглашений в проекты | P-003 | SHOULD |
| P-005 | Настроить права доступа к проектам | P-004 | SHOULD |

**Frontend:**

| Задача | Описание | Зависимости | Приоритет |
|--------|----------|-------------|-----------|
| P-101 | Создать страницу списка проектов | - | MUST |
| P-102 | Реализовать карточку проекта | P-101 | MUST |
| P-103 | Создать страницу детального просмотра проекта | P-102 | MUST |
| P-104 | Добавить управление участниками проекта | P-103 | SHOULD |
| P-105 | Интеграция с датасетами и моделями в проекте | P-103 | MUST |

**Критерии приёмки:**
- [ ] Можно создавать проекты
- [ ] Можно добавлять датасеты в проект
- [ ] Можно добавлять модели в проект
- [ ] Можно управлять участниками проекта
- [ ] Dashboard проекта показывает связанные данные

---

### 1.3 Recognition Module — Backend Core

**Описание:** Ядро модуля распознавания болезней растений

**Backend:**

| Задача | Описание | Зависимости | Приоритет |
|--------|----------|-------------|-----------|
| R-001 | Создать модели: RecognitionRequest, RecognitionResult, RecognitionHistory | - | MUST |
| R-002 | Создать serializers для распознавания | R-001 | MUST |
| R-003 | Реализовать RecognitionController с endpoints | R-002 | MUST |
| R-004 | Интегрировать InferenceService из vision модуля | R-003 | MUST |
| R-005 | Добавить очередь задач через Celery | R-004 | SHOULD |
| R-006 | Реализовать сохранение истории распознаваний | R-003 | MUST |

**Критерии приёмки:**
- [ ] API endpoint для загрузки изображения
- [ ] API endpoint для получения результата
- [ ] Сохранение результатов в БД
- [ ] Интеграция с vision/inference.py

---

### 1.4 System Improvements & Bug Fixes

| Задача | Описание | Зависимости | Приоритет |
|--------|----------|-------------|-----------|
| S-001 | Исправить миграции для существующих моделей | - | MUST |
| S-002 | Настроить CORS для frontend | - | MUST |
| S-003 | Добавить базовую аутентификацию (JWT) | - | MUST |
| S-004 | Настроить логирование | - | SHOULD |
| S-005 | Добавить пагинацию для всех list endpoints | - | SHOULD |

---

## Технические детали

### Directory Models Structure

```python
# services/core/directory/models.py

class Plant(ModelAdapter):
    """Модель растения."""
    name = models.CharField(t("Название"), max_length=255)
    latin_name = models.CharField(t("Латинское название"), max_length=255)
    species = models.CharField(t("Вид"), max_length=255)
    description = models.TextField(t("Описание"), blank=True)
    image = S3PrivateFileField(t("Изображение"), upload_to="plants/", null=True)

class Disease(ModelAdapter):
    """Модель болезни."""
    name = models.CharField(t("Название"), max_length=255)
    description = models.TextField(t("Описание"))
    symptoms = models.TextField(t("Симптомы"))
    pathogen = models.CharField(t("Возбудитель"), max_length=255)
    conditions = models.TextField(t("Условия развития"))
    treatment = models.TextField(t("Методы лечения"))
    prevention = models.TextField(t("Профилактика"))
    affected_plants = models.ManyToManyField(Plant, related_name="diseases")

class Pest(ModelAdapter):
    """Модель вредителя."""
    name = models.CharField(t("Название"), max_length=255)
    description = models.TextField(t("Описание"))
    lifecycle = models.TextField(t("Жизненный цикл"))
    damage_signs = models.TextField(t("Признаки поражения"))
    control_methods = models.TextField(t("Методы борьбы"))
    affected_plants = models.ManyToManyField(Plant, related_name="pests")

class Symptom(ModelAdapter):
    """Модель симптома."""
    name = models.CharField(t("Название"), max_length=255)
    description = models.TextField(t("Описание"))
    image = S3PrivateFileField(t("Изображение"), upload_to="symptoms/", null=True)
    diseases = models.ManyToManyField(Disease, related_name="symptoms")
```

### Projects Models Structure

```python
# services/core/projects/models.py

class Project(ModelAdapter):
    """Модель проекта."""
    name = models.CharField(t("Название"), max_length=255)
    description = models.TextField(t("Описание"), blank=True)
    owner = models.ForeignKey("users.User", on_delete=models.CASCADE, related_name="owned_projects")
    is_public = models.BooleanField(t("Публичный"), default=False)

class ProjectMember(ModelAdapter):
    """Участник проекта."""
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="members")
    user = models.ForeignKey("users.User", on_delete=models.CASCADE, related_name="project_memberships")
    role = models.CharField(t("Роль"), choices=ProjectRole.choices, max_length=32)

class ProjectDataset(ModelAdapter):
    """Датасет в проекте."""
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="datasets")
    dataset = models.ForeignKey("datasets.Dataset", on_delete=models.CASCADE)

class ProjectModel(ModelAdapter):
    """Модель в проекте."""
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="models")
    model = models.ForeignKey("training.Model", on_delete=models.CASCADE)
```

### Recognition Models Structure

```python
# services/core/recognitions/models.py

class RecognitionRequest(ModelAdapter):
    """Запрос на распознавание."""
    image = S3PrivateFileField(t("Изображение"), upload_to="recognitions/")
    model = models.ForeignKey("training.Model", on_delete=models.SET_NULL, null=True)
    status = models.CharField(t("Статус"), choices=RecognitionStatus.choices, max_length=32)
    user = models.ForeignKey("users.User", on_delete=models.CASCADE, related_name="recognitions")

class RecognitionResult(ModelAdapter):
    """Результат распознавания."""
    request = models.ForeignKey(RecognitionRequest, on_delete=models.CASCADE, related_name="results")
    disease = models.ForeignKey("directory.Disease", on_delete=models.SET_NULL, null=True)
    pest = models.ForeignKey("directory.Pest", on_length=32)
    confidence = models.FloatField(t("Уверенность"))
    segmentation = models.JSONField(t("Сегментация"), null=True)
    bbox = models.JSONField(t("Ограничивающий прямоугольник"), null=True)
    recommendations = models.TextField(t("Рекомендации"), blank=True)

class RecognitionHistory(ModelAdapter):
    """История распознаваний."""
    user = models.ForeignKey("users.User", on_delete=models.CASCADE, related_name="recognition_history")
    image = S3PrivateFileField(t("Изображение"), upload_to="history/")
    result = models.JSONField(t("Результат"))
```

---

## Definition of Done

- [ ] Все backend модели созданы и миграции применены
- [ ] Все CRUD endpoints работают и возвращают корректные данные
- [ ] Frontend страницы отображают данные и позволяют редактирование
- [ ] JWT аутентификация работает
- [ ] CORS настроен для frontend
- [ ] Нет критических ошибок в логах

---

## Ресурсы

**Backend:**
- Разработчики: 2 backend разработчика
- Ожидаемое время: 80 человеко-часов

**Frontend:**
- Разработчики: 1 frontend разработчик
- Ожидаемое время: 60 человеко-часов

**Total:** 140 человеко-часов