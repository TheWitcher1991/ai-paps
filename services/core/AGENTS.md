# AI Developer Guide: Backend (services/core)

## Содержание

1. [Архитектура Backend](#архитектура-backend)
2. [Структура Django App](#структура-django-app)
3. [Внутренний Фреймворк](#внутренний-фреймворк)
4. [Соглашения по коду](#соглашения-по-коду)
5. [Создание нового модуля](#создание-нового-модуля)
6. [Controllers и Routers](#controllers-и-routers)
7. [Models и Serializers](#models-и-serializers)
8. [Use Cases и Repositories](#use-cases-и-repositories)
9. [Celery Tasks](#celery-tasks)
10. [Vision/AI модуль](#visionai-модуль)
11. [CVAT интеграция](#cvat-интеграция)

---

## Архитектура Backend

### Общая схема

```
services/core/
├── config/              # Django settings (НЕ ИЗМЕНЯТЬ СТРУКТУРУ)
├── packages/           # Внутренний фреймворк (НЕ ИЗМЕНЯТЬ)
├── users/              # Django app: пользователи
├── datasets/           # Django app: датасеты
├── training/           # Django app: обучение
├── directory/          # Django app: справочник
├── projects/           # Django app: проекты
├── recognitions/      # Django app: распознавание
├── cvat/              # Django app: CVAT интеграция
└── vision/             # AI/ML модуль
```

### Паттерн архитектуры

Backend следует паттерну **Layered Architecture** с разделением на:

```
┌─────────────────────────────────────┐
│     Controllers (API Endpoints)     │  ← HTTP layer
├─────────────────────────────────────┤
│         Use Cases (Business Logic)   │  ← Business layer
├─────────────────────────────────────┤
│        Repositories (Data Access)    │  ← Data layer
├─────────────────────────────────────┤
│         Models (Database)            │  ← ORM layer
└─────────────────────────────────────┘
```

### Поток запроса

```
Request → Controller → UseCase → Repository → Model → DB
                ↓
            Serializer (для Response)
```

---

## Структура Django App

### Обязательная структура каждого app

```
myapp/
├── __init__.py
├── apps.py           # Django app config
├── models.py         # Модели (наследовать от ModelAdapter)
├── serializers.py     # DRF serializers
├── routers.py        # URL routes
├── controllers.py    # API controllers
├── usecases.py      # Business logic
├── repositories.py  # Data access
├── filters.py       # django-filter
├── types.py         # Enums и типы
├── exceptions.py    # Custom exceptions
├── signals.py       # Django signals
├── tasks.py         # Celery tasks
├── admin.py         # Django admin
└── migrations/
    └── __init__.py
```

### Пример apps.py

```python
# myapp/apps.py
from django.apps import AppConfig


class MyappConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "myapp"
    verbose_name = "Мой модуль"
```

---

## Внутренний Фреймворк

### packages/kernel/adapters.py

**ОБЯЗАТЕЛЬНО используй эти базовые классы:**

```python
from packages.kernel.adapters import ModelAdapter

class MyModel(ModelAdapter):
    """ВСЕ модели должны наследоваться от ModelAdapter"""
    name = models.CharField("Название", max_length=255)
    
    class Meta:
        verbose_name = t("Моя модель")
        verbose_name_plural = t("Мои модели")
```

**Что даёт ModelAdapter:**
- `id` — AutoField primary key
- `created_date` — auto_now_add DateTimeField
- `updated_date` — auto_now DateTimeField

### packages/framework/controllers.py

**Базовые Controller классы:**

```python
from packages.framework.controllers import (
    Controller,           # Базовый
    BaseController,       # С базовыми методами
    ModelSetController,    # CRUD (создание, чтение, обновление, удаление)
    ReadOnlyModelSetController,  # Только чтение
)

# Controller для API endpoints
class MyEntityController(ModelSetController):
    prefix = "my-entities"  # URL prefix (например /v1/my-entities/)
    queryset = MyModel.objects.all()
    serializer_class = MyEntitySerializer
```

### packages/framework/routers.py

**Автоматическая регистрация роутов:**

```python
# myapp/routers.py
from packages.framework.routers import auto_router
from myapp.controllers import MyEntityController

router = auto_router(MyEntityController)
```

**Это создаст endpoints:**
```
GET     /v1/my-entities/         — list
POST    /v1/my-entities/         — create
GET     /v1/my-entities/{id}/    — retrieve
PATCH   /v1/my-entities/{id}/    — partial_update
DELETE  /v1/my-entities/{id}/    — destroy
```

---

## Соглашения по коду

### Именование

| Сущность | Соглашение | Пример |
|----------|-----------|--------|
| Модель | PascalCase | `DatasetAsset` |
| Serializer | PascalCase | `DatasetSerializer` |
| Controller | PascalCase | `DatasetController` |
| Repository | PascalCase | `DatasetRepository` |
| UseCase | PascalCase | `DatasetUseCase` |
| Файл | snake_case | `dataset_service.py` |
| Метод | snake_case | `get_or_create` |
| Поле модели | snake_case | `file_name` |
| URL prefix | kebab-case | `dataset-assets` |

### Комментарии и документация

```python
from packages.kernel.utils import t

class MyModel(ModelAdapter):
    """Модель для хранения данных.
    
    Используется для:
    - Цели 1
    - Цели 2
    
    Наследует: ModelAdapter
    """
    name = models.CharField(t("Название"), max_length=255)
    # t() — для переводимых строк в админке
```

### Типы

```python
# myapp/types.py
from enum import StrEnum
from typing import TypedDict

class MyStatus(StrEnum):
    """Статусы сущности."""
    PENDING = "pending"
    ACTIVE = "active"
    COMPLETED = "completed"


class MyResult(TypedDict):
    """Результат операции."""
    id: int
    name: str
    status: str
```

### Exceptions

```python
# myapp/exceptions.py
class MyAppException(Exception):
    """Базовое исключение модуля."""
    pass


class EntityNotFound(MyAppException):
    """Сущность не найдена."""
    pass


class ValidationError(MyAppException):
    """Ошибка валидации."""
    pass
```

---

## Создание нового модуля

### Шаг 1: Создание Django App

```bash
cd services/core
python manage.py startapp mymodule
```

### Шаг 2: Регистрация в settings

```python
# config/settings/apps.py
INSTALLED_APPS = [
    # ... existing apps
    'mymodule',
]
```

### Шаг 3: Создание модели

```python
# mymodule/models.py
from django.db import models
from packages.kernel.adapters import ModelAdapter
from packages.kernel.utils import t


class MyEntity(ModelAdapter):
    """Описание сущности."""
    
    # Поля
    name = models.CharField(t("Название"), max_length=255)
    status = models.CharField(
        t("Статус"), 
        max_length=32, 
        choices=[
            ("pending", t("Ожидает")),
            ("active", t("Активный")),
        ]
    )
    
    class Meta:
        ordering = ("-created_date",)
        verbose_name = t("Моя сущность")
        verbose_name_plural = t("Мои сущности")
    
    def __str__(self):
        return self.name
```

### Шаг 4: Создание Serializer

```python
# mymodule/serializers.py
from rest_framework import serializers
from mymodule.models import MyEntity


class MyEntitySerializer(serializers.ModelSerializer):
    """Serializer для MyEntity."""
    
    class Meta:
        model = MyEntity
        fields = "__all__"  # Или список полей
```

### Шаг 5: Создание Controller

```python
# mymodule/controllers.py
from packages.framework.controllers import ModelSetController
from mymodule.models import MyEntity
from mymodule.serializers import MyEntitySerializer


class MyEntityController(ModelSetController):
    """API контроллер для MyEntity."""
    
    prefix = "my-entities"  # URL prefix
    queryset = MyEntity.objects.all()
    serializer_class = MyEntitySerializer
```

### Шаг 6: Создание Router

```python
# mymodule/routers.py
from packages.framework.routers import auto_router
from mymodule.controllers import MyEntityController

router = auto_router(MyEntityController)
```

### Шаг 7: Регистрация в urls

```python
# config/urls.py
urlpatterns = [
    # ... existing
    path("v1/", include("mymodule.routers", namespace="mymodule")),
]
```

### Шаг 8: Миграция

```bash
python manage.py makemigrations mymodule
python manage.py migrate
```

---

## Controllers и Routers

### Базовые Controller классы

```python
# Для ViewSet (CRUD)
class MyController(ModelSetController):
    prefix = "my"
    queryset = MyModel.objects.all()
    serializer_class = MySerializer

# Только чтение
class MyReadOnlyController(ReadOnlyModelSetController):
    prefix = "my"
    queryset = MyModel.objects.all()
    serializer_class = MySerializer

# Кастомные endpoints
class MyCustomController(BaseController):
    prefix = "my"
    
    def custom_action(self, request, pk=None):
        """Кастомный endpoint."""
        obj = self.get_object()
        # Логика
        return Response({"status": "ok"})
```

### Добавление кастомных методов

```python
class TrainingController(ModelSetController):
    prefix = "training"
    queryset = Training.objects.all()
    serializer_class = TrainingSerializer
    
    def start_training(self, request, pk=None):
        """POST /v1/training/{id}/start/"""
        training = self.get_object()
        
        # Логика запуска
        use_case = TrainingUseCase()
        use_case.start_training(training.id)
        
        return Response({"status": "started"})
    
    def get_runs(self, request, pk=None):
        """GET /v1/training/{id}/runs/"""
        training = self.get_object()
        runs = TrainingRun.objects.filter(training=training)
        
        return Response(TrainingRunSerializer(runs, many=True).data)
```

### Nested Routes (дочерние ресурсы)

```python
# datasets/routers.py
class DatasetAssetController(ModelSetController):
    prefix = "datasets-assets"
    queryset = DatasetAsset.objects.all()
    serializer_class = DatasetAssetSerializer

router = auto_router(DatasetAssetController)
```

```python
# Для вложенных routes используй параметры в URL
# GET /v1/datasets/{dataset_id}/assets/
```

---

## Models и Serializers

### Расширенные Serializers

```python
class MyEntitySerializer(serializers.ModelSerializer):
    """Serializer с дополнительными полями."""
    
    computed_field = serializers.SerializerMethodField()
    related_count = serializers.IntegerField(read_only=True)
    
    class Meta:
        model = MyEntity
        fields = ["id", "name", "status", "computed_field", "related_count"]
    
    def get_computed_field(self, obj):
        """Вычисляемое поле."""
        return obj.calculate_something()
```

### Вложенные Serializers

```python
class TrainingSerializer(serializers.ModelSerializer):
    """Training с вложенным config."""
    
    config = TrainingConfigSerializer()  # OneToOne
    datasets = TrainingDatasetSerializer(many=True)  # ForeignKey
    runs = TrainingRunSerializer(many=True, read_only=True)
    
    class Meta:
        model = Training
        fields = ["id", "name", "config", "datasets", "runs"]
```

### Файловые поля

```python
# Для S3 файлов
from packages.framework.fields import S3PrivateFileField

class MyModel(ModelAdapter):
    file = S3PrivateFileField(upload_to="my-files/")
    image = S3PrivateFileField(upload_to="images/", null=True)
```

---

## Use Cases и Repositories

### Repository Pattern

```python
# mymodule/repositories.py
from packages.kernel.repositories import Repository


class MyEntityRepository(Repository):
    """Repository для MyEntity."""
    
    model = MyEntity
    
    def get_active(self):
        """Получить только активные."""
        return self.model.objects.filter(status="active")
    
    def get_by_slug(self, slug):
        """Получить по slug."""
        return self.get_or_none(slug=slug)
```

### Use Case Pattern

```python
# mymodule/usecases.py
from packages.framework.usecases import UseCaseAdapter
from packages.usecases.logging import logger


class MyEntityUseCase(UseCaseAdapter):
    """Use case для MyEntity."""
    
    def __init__(self):
        self.repo = MyEntityRepository()
    
    def create(self, data: dict):
        """Создание сущности."""
        entity = self.repo.create(data)
        logger.info(f"Created entity {entity.id}")
        return entity
    
    def activate(self, entity_id: int):
        """Активация сущности."""
        entity = self.repo.get_by_id(entity_id)
        entity.status = "active"
        entity.save()
        logger.info(f"Activated entity {entity_id}")
        return entity
```

### Вызов Use Case из Controller

```python
class MyEntityController(ModelSetController):
    prefix = "my-entities"
    queryset = MyEntity.objects.all()
    serializer_class = MyEntitySerializer
    
    def perform_create(self, serializer):
        """Использовать use case при создании."""
        use_case = MyEntityUseCase()
        use_case.create(serializer.validated_data)
```

---

## Celery Tasks

### Структура tasks

```python
# mymodule/tasks.py
from celery import shared_task
from packages.usecases.logging import logger


@shared_task
def my_background_task(entity_id: int):
    """Фоновая задача."""
    logger.info(f"Starting task for entity {entity_id}")
    
    try:
        # Логика
        result = process_entity(entity_id)
        logger.info(f"Task completed: {result}")
        return result
    except Exception as e:
        logger.error(f"Task failed: {e}")
        raise
```

### Вызов из Use Case

```python
# mymodule/usecases.py
class MyEntityUseCase(UseCaseAdapter):
    def start_long_process(self, entity_id: int):
        """Запуск фоновой задачи."""
        my_background_task.delay(entity_id)  # .delay() — асинхронный вызов
        return {"status": "queued"}
```

### Celery Beat (периодические задачи)

```python
# config/celery.py
from celery.schedules import crontab

app.conf.beat_schedule = {
    "cleanup-old-data": {
        "task": "mymodule.tasks.cleanup_old_data",
        "schedule": crontab(hour=2, minute=0),  # Каждый день в 2:00
    },
}
```

---

## Vision/AI модуль

### Структура vision/

```
vision/
├── models/           # Архитектуры моделей
│   ├── u_net.py
│   ├── deeplabv3.py
│   └── ...
├── inference.py      # InferenceService
├── training.py       # Training utilities
├── transforms.py     # Аугментации
├── metrics.py        # Метрики
└── types.py          # Типы
```

### Добавление новой модели

**Шаг 1:** Создать файл модели

```python
# vision/models/my_model.py
import torch
import torch.nn as nn


class MyModelAdapter(nn.Module):
    """Моя кастомная модель."""
    
    def __init__(self, in_channels: int = 3, num_classes: int = 21):
        super().__init__()
        self.encoder = nn.Sequential(
            nn.Conv2d(in_channels, 64, 3, padding=1),
            nn.ReLU(),
            # ... encoder layers
        )
        self.decoder = nn.Sequential(
            # ... decoder layers
        )
        self.out = nn.Conv2d(64, num_classes, 1)
    
    def forward(self, x):
        # Forward pass
        features = self.encoder(x)
        output = self.decoder(features)
        return self.out(output)
```

**Шаг 2:** Добавить enum значение

```python
# vision/types.py
class VisionModelType(StrEnum):
    # ... existing
    my_model = "my_model"
```

**Шаг 3:** Обновить InferenceService

```python
# vision/inference.py
class InferenceService:
    def _load_model(self, model_file):
        # ... existing code
        
        if architecture == "my_model":
            return MyModelAdapter(
                in_channels=3,
                num_classes=num_classes
            )
```

**Шаг 4:** Обновить TrainingService

```python
# training/services/training_service.py
def _create_model(self, num_classes):
    # ... existing code
    
    if architecture == "my_model":
        from vision.models.my_model import MyModelAdapter
        return MyModelAdapter(in_channels=3, num_classes=num_classes)
```

---

## CVAT интеграция

### Структура cvat/

```
cvat/
├── projects.py       # CVAT projects
├── tasks.py          # CVAT tasks
├── jobs.py           # CVAT jobs
├── annotations.py    # Работа с аннотациями
├── labels.py         # Метки CVAT
├── users.py          # Пользователи
├── memberships.py    # Членство в проектах
├── organizations.py  # Организации
├── storages.py       # Хранилища
├── sdk.py            # CVAT SDK wrapper
└── routers.py        # API endpoints
```

### Использование CVAT SDK

```python
# cvat/sdk.py
from cvat_sdk import make_client

class CVATClient:
    def __init__(self, host, token):
        self.host = host
        self.token = token
    
    def get_projects(self):
        with make_client(host=self.host) as client:
            client.auth(token=self.token)
            return client.projects.list()
```

### Импорт датасета из CVAT

```python
# cvat/controllers.py
class CVATController:
    def import_dataset(self, request, project_id):
        """Импорт датасета из CVAT проекта."""
        project = cvat_client.get_project(project_id)
        tasks = cvat_client.get_tasks(project_id)
        
        # Создание Dataset
        dataset = DatasetUseCase().create({
            "name": f"CVAT Project {project_id}",
            "source": "cvat",
            "source_id": project_id,
        })
        
        # Импорт ассетов
        for task in tasks:
            for frame in task.frames:
                DatasetUseCase().add_asset(dataset.id, frame)
        
        return dataset
```

---

## Тестирование

### Структура тестов

```
mymodule/
├── tests/
│   ├── __init__.py
│   ├── test_models.py
│   ├── test_serializers.py
│   ├── test_controllers.py
│   └── test_usecases.py
```

### Пример теста

```python
# mymodule/tests/test_models.py
from django.test import TestCase
from mymodule.models import MyEntity


class MyEntityModelTest(TestCase):
    def setUp(self):
        self.entity = MyEntity.objects.create(
            name="Test Entity",
            status="pending"
        )
    
    def test_create_entity(self):
        self.assertEqual(self.entity.name, "Test Entity")
        self.assertEqual(self.entity.status, "pending")
    
    def test_str_method(self):
        self.assertEqual(str(self.entity), "Test Entity")
```

### Запуск тестов

```bash
python manage.py test mymodule
python manage.py test --verbosity=2
```

---

## Миграции

### Создание миграции

```bash
python manage.py makemigrations mymodule
```

### Применение миграций

```bash
python manage.py migrate
python manage.py migrate mymodule
```

### Пустая миграция (для данных)

```bash
python manage.py makemigrations mymodule --empty
```

### Миграция данных

```python
# migrations/0002_migrate_data.py
from django.db import migrations


def migrate_data(apps, schema_editor):
    MyModel = apps.get_model("mymodule", "MyModel")
    for obj in MyModel.objects.all():
        obj.new_field = "default_value"
        obj.save()


class Migration(migrations.Migration):
    dependencies = [
        ("mymodule", "0001_initial"),
    ]

    operations = [
        migrations.RunPython(migrate_data),
    ]
```

---

## Логирование

### Использование логгера

```python
from packages.usecases.logging import logger

logger.info("Info message")
logger.warning("Warning message")
logger.error("Error message", exc_info=True)
```

### Конфигурация логов

```python
# config/settings/logging.py
LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": {
        "verbose": {
            "format": "{levelname} {asctime} {module} {message}",
            "style": "{",
        },
    },
    "handlers": {
        "console": {
            "class": "logging.StreamHandler",
            "formatter": "verbose",
        },
        "file": {
            "class": "logging.FileHandler",
            "filename": "logs/app.log",
            "formatter": "verbose",
        },
    },
    "root": {
        "handlers": ["console", "file"],
        "level": "INFO",
    },
}
```

---

## Checklist перед коммитом

- [ ] Все модели наследуются от `ModelAdapter`
- [ ] Все строки переводимые через `t()`
- [ ] Controllers используют базовые классы из packages
- [ ] Routers используют `auto_router`
- [ ] Миграции созданы
- [ ] Тесты написаны
- [ ] Нет TODO/FIXME комментариев
- [ ] Код отформатирован (black, isort)
- [ ] Линтер проходит
