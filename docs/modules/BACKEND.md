# AI-PAPS: Backend документация

## Содержание

1. [Обзор](#обзор)
2. [Структура проекта](#структура-проекта)
3. [Конфигурация](#конфигурация)
4. [Приложения (Django apps)](#приложения-django-apps)
5. [Packages — внутренний фреймворк](#packages--внутренний-фреймворк)
6. [Controllers и Routers](#controllers-и-routers)
7. [Use Cases](#use-cases)
8. [Repositories](#repositories)
9. [Celery Tasks](#celery-tasks)
10. [Разработка](#разработка)

---

## Обзор

Backend — Django 5.2 приложение с REST API (Django REST Framework), Celery для фоновых задач и интеграцией с CVAT.

### Расположение

```
ai-paps/
└── services/
    └── core/                     # Django проект
        ├── config/               # Django конфигурация
        ├── users/                # Django app: пользователи
        ├── datasets/            # Django app: датасеты
        ├── training/            # Django app: обучение
        ├── directory/           # Django app: справочник
        ├── projects/            # Django app: проекты
        ├── recognitions/        # Django app: распознавание
        ├── cvat/                # Django app: CVAT интеграция
        ├── vision/               # AI/ML модуль
        ├── packages/             # Внутренний фреймворк
        └── pyproject.toml       # Poetry зависимости
```

---

## Структура проекта

```
services/core/
├── config/                      # Django конфигурация
│   ├── settings/               # Модульные настройки
│   │   ├── __init__.py
│   │   ├── base.py            # Базовые настройки
│   │   ├── database.py        # PostgreSQL
│   │   ├── cache.py           # Redis
│   │   ├── rest_framework.py  # DRF
│   │   ├── cors.py            # CORS
│   │   ├── security.py        # Безопасность
│   │   ├── logging.py         # Логирование
│   │   ├── middleware.py      # Middleware
│   │   ├── email.py           # Email
│   │   ├── aws.py            # S3
│   │   └── lib.py            # Библиотеки
│   ├── urls.py                # Главный URLconf
│   ├── asgi.py                # ASGI приложение
│   ├── wsgi.py                # WSGI приложение
│   ├── celery.py              # Celery конфигурация
│   └── os.py                  # OS/env утилиты
│
├── users/                       # Приложение пользователей
│   ├── models.py              # User модель
│   ├── serializers.py         # DRF сериализаторы
│   ├── routers.py            # URL маршруты
│   ├── controllers.py        # API контроллеры
│   ├── managers.py           # Custom User Manager
│   ├── types.py              # Типы
│   ├── filters.py           # Фильтры
│   ├── exceptions.py        # Исключения
│   ├── signals.py           # Django signals
│   ├── tasks.py            # Celery tasks
│   ├── admin.py            # Django admin
│   └── migrations/
│
├── datasets/                   # Приложение датасетов
│   ├── models.py             # Dataset, Asset, Annotation
│   ├── serializers.py
│   ├── routers.py
│   ├── controllers.py
│   ├── repositories.py      # Паттерн Repository
│   ├── usecases.py          # Бизнес-логика
│   ├── engine.py            # Dataset engine
│   ├── filters.py
│   ├── types.py
│   ├── exceptions.py
│   ├── signals.py
│   ├── admin.py
│   └── migrations/
│
├── training/                   # Приложение обучения
│   ├── models.py             # Model, Training, TrainingRun
│   ├── serializers.py
│   ├── routers.py
│   ├── controllers.py
│   ├── usecases.py          # TrainingUseCase, ModelUseCase
│   ├── repositories.py      # ModelRepository, TrainingRepository
│   ├── services/
│   │   ├── training_service.py  # TrainingService
│   │   └── dataset_loader.py    # DatasetLoader
│   ├── background.py       # Celery background tasks
│   ├── signals.py
│   ├── types.py
│   ├── exceptions.py
│   ├── admin.py
│   └── migrations/
│
├── directory/                  # Приложение справочника
├── projects/                   # Приложение проектов
├── recognitions/               # Приложение распознавания
├── cvat/                       # CVAT интеграция
│   ├── projects.py
│   ├── tasks.py
│   ├── annotations.py
│   ├── jobs.py
│   ├── labels.py
│   ├── memberships.py
│   ├── organizations.py
│   ├── users.py
│   ├── storages.py
│   └── sdk.py              # CVAT SDK wrapper
│
├── vision/                     # AI/ML модуль
│   ├── models/               # Модели нейросетей
│   │   ├── u_net.py
│   │   ├── deeplabv3.py
│   │   ├── fpn.py
│   │   ├── mask_rcnn.py
│   │   ├── yolo.py
│   │   └── vision_net.py
│   ├── inference.py         # InferenceService
│   ├── training.py          # Training utilities
│   ├── transforms.py        # Аугментации
│   ├── metrics.py           # Метрики
│   ├── dataset/            # Dataset loaders
│   ├── arch/               # Архитектуры
│   ├── backbone.py         # Backbone networks
│   ├── types.py
│   └── utils.py
│
├── packages/                   # Внутренний фреймворк
│   ├── framework/           # DRF компоненты
│   │   ├── controllers.py
│   │   ├── routers.py
│   │   ├── middleware.py
│   │   ├── authentication.py
│   │   ├── caching.py
│   │   ├── pagination.py
│   │   ├── throttling.py
│   │   ├── mixins.py
│   │   ├── fields.py
│   │   ├── usecases.py
│   │   └── contrib.py
│   ├── kernel/              # Ядро
│   │   ├── adapters.py     # ModelAdapter, SerializerAdapter
│   │   ├── types.py
│   │   ├── exceptions.py
│   │   ├── context.py
│   │   └── utils.py
│   └── usecases/           # Бизнес-логика
│       ├── logging.py
│       ├── jwt.py
│       └── serializer.py
│
├── mediafiles/               # Медиа файлы
├── static/                  # Статические файлы
├── manage.py                # Django CLI
├── pyproject.toml          # Poetry dependencies
└── test.py                 # Тестовый скрипт
```

---

## Конфигурация

### Настройки Django

```python
# config/settings/base.py
from pathlib import Path
from config.os import DEBUG, env

BASE_DIR = Path(__file__).resolve().parent.parent.parent

SECRET_KEY = env("DJANGO_SECRET_KEY")

ROOT_URLCONF = "config.urls"

AUTH_USER_MODEL = "users.User"

LANGUAGE_CODE = "ru-ru"
TIME_ZONE = "Europe/Moscow"

ALLOWED_HOSTS = env("ALLOWED_DOMAINS").split(" ")

# Database
DATABASES = {...}  # PostgreSQL

# Cache
CACHES = {...}  # Redis

# Celery
CELERY_BROKER_URL = "amqp://..."
CELERY_RESULT_BACKEND = "redis://..."
```

### URLs

```python
# config/urls.py
from django.urls import include

urlpatterns = [
    path("admin/", admin.site.urls),
    path("v1/", include("datasets.routers")),
    path("v1/", include("training.routers")),
    path("v1/", include("users.routers")),
    path("v1/", include("cvat.routers")),
    # OpenAPI
    path("v1/schema/", SpectacularAPIView.as_view()),
    path("v1/docs/", SpectacularSwaggerView.as_view()),
]
```

### Celery

```python
# config/celery.py
from celery import Celery

app = Celery("paps")
app.config_from_object("django.conf:settings")
app.autodiscover_tasks()
```

---

## Приложения (Django apps)

### Users

Управление пользователями с интеграцией CVAT.

```python
# users/models.py
class User(UserModelAdapter):
    cvat_id = models.IntegerField(unique=True)
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=150, unique=True)
    first_name = models.CharField()
    last_name = models.CharField()
    role = models.CharField(choices=UserRole.choices)
```

### Datasets

Управление датасетами для обучения.

```python
# datasets/models.py
class Dataset(ModelAdapter):
    name = models.CharField()
    source = models.CharField(choices=DatasetSource.choices)
    status = models.CharField(choices=DatasetStatus.choices)
    format = models.CharField(choices=DatasetFormat.choices)
    subset = models.CharField(choices=DatasetSubset.choices)
    
class DatasetAsset(ModelAdapter):
    dataset = models.ForeignKey(Dataset)
    file = S3PrivateFileField()
    width = models.IntegerField()
    height = models.IntegerField()
    
class DatasetAnnotation(models.Model):
    asset = models.ForeignKey(DatasetAsset)
    cls = models.ForeignKey(DatasetClass)
    segmentation = models.JSONField()
    bbox = models.JSONField()
```

### Training

Обучение AI моделей.

```python
# training/models.py
class Model(ModelAdapter):
    name = models.CharField()
    architecture = models.CharField(choices=ModelArchitecture.choices)
    backbone = models.CharField(choices=ModelBackbone.choices)
    status = models.CharField(choices=ModelStatus.choices)
    file = S3PrivateFileField()
    
class Training(ModelAdapter):
    name = models.CharField()
    model = models.ForeignKey(Model)
    
class TrainingConfig(ModelAdapter):
    training = models.OneToOneField(Training)
    epochs = models.IntegerField()
    learning_rate = models.FloatField()
    optimizer = models.CharField()
    
class TrainingRun(ModelAdapter):
    training = models.ForeignKey(Training)
    status = models.CharField(choices=TrainingStatus.choices)
    current_epoch = models.IntegerField()
    iou = models.FloatField()
    # ... метрики
```

### Directory

Справочник растений, болезней и вредителей.

### Projects

Управление проектами.

### CVAT

Интеграция с CVAT для разметки данных.

---

## Packages — внутренний фреймворк

### Kernel

```python
# packages/kernel/adapters.py
class ModelAdapter(models.Model):
    """Базовый класс для всех моделей"""
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)
    
    class Meta:
        abstract = True


class UserModelAdapter(AbstractUser):
    """Базовый класс для пользователя"""
    objects = UserManager()
    
    class Meta:
        abstract = True


class FilterAdapter(FilterSet):
    """Базовый фильтр с сортировкой"""
    sort = CharFilter(field_name="sort", method="filter_sort")
```

### Framework

```python
# packages/framework/controllers.py
class Controller:
    prefix: str
    
    def get_response(self, data=None, status=200, serializer=None):
        ...

class BaseController(APIController):
    permission_classes = ()
    permission_types = ()


class ModelSetController(ViewSetMixin, BaseController):
    """CRUD контроллер"""
    pass


class ReadOnlyModelSetController(ReadOnlyModelMixin, BaseController):
    """Только чтение"""
    pass
```

### Routers

```python
# packages/framework/routers.py
def auto_router(*controllers):
    """Автоматическая регистрация контроллеров"""
    router = SimpleRouter()
    
    for ctrl in controllers:
        router.register(ctrl.prefix, ctrl)
    
    return router
```

```python
# datasets/routers.py
from packages.framework.routers import auto_router
from datasets.controllers import DatasetController, DatasetAssetController

router = auto_router(DatasetController, DatasetAssetController)
```

---

## Controllers и Routers

### Пример Controller

```python
# training/controllers.py
from packages.framework.controllers import ModelSetController
from training.models import Model, Training
from training.serializers import ModelSerializer, TrainingSerializer


class ModelController(ModelSetController):
    prefix = "models"
    queryset = Model.objects.all()
    serializer_class = ModelSerializer


class TrainingController(ModelSetController):
    prefix = "training"
    queryset = Training.objects.all()
    serializer_class = TrainingSerializer
    
    def start_training(self, request, pk=None):
        training = self.get_object()
        # Запуск обучения
        ...
        return Response({"status": "started"})
```

### Пример Router

```python
# training/routers.py
from packages.framework.routers import auto_router
from training.controllers import ModelController, TrainingController

router = auto_router(ModelController, TrainingController)

# Эндпоинты:
# GET    /v1/models/           — список моделей
# POST   /v1/models/           — создать модель
# GET    /v1/models/{id}/     — получить модель
# PATCH  /v1/models/{id}/     — обновить модель
# DELETE /v1/models/{id}/     — удалить модель
```

---

## Use Cases

```python
# training/usecases.py
from packages.framework.usecases import UseCaseAdapter


class TrainingUseCase(UseCaseAdapter):
    def __init__(self):
        self.repo = TrainingRepository()
    
    def create(self, data: dict):
        training = self.repo.create(data)
        logger.info(f"Training created: {training.id}")
        return training
    
    def start_training(self, training_id: int):
        from training.background import get_training_runner
        
        runner = get_training_runner()
        runner.start_async(training_id)
        
        return training
```

---

## Repositories

```python
# training/repositories.py
from packages.kernel.repositories import Repository


class TrainingRepository(Repository):
    model = Training
    
    def get_with_config(self, training_id):
        return self.model.objects.select_related('config').get(id=training_id)
```

---

## Celery Tasks

```python
# training/background.py
from celery import shared_task


@shared_task
def train_model(training_id: int):
    """Фоновая задача обучения"""
    from training.services import TrainingService
    
    training = Training.objects.get(id=training_id)
    service = TrainingService(training)
    
    try:
        service.run()
    except Exception as e:
        logger.error(f"Training failed: {e}")
        raise
```

---

## Разработка

### Установка

```bash
cd services/core
poetry install
```

### Миграции

```bash
python manage.py makemigrations
python manage.py migrate
```

### Запуск сервера

```bash
# Development
python manage.py runserver

# Production
gunicorn config.wsgi:application
```

### Celery

```bash
# Worker
celery -A paps worker -l info

# Beat (scheduler)
celery -A paps beat -l info
```

### Superuser

```bash
python manage.py createsuperuser
```

### Тесты

```bash
python manage.py test
```

---

## Environment Variables

```bash
# Django
DJANGO_SECRET_KEY=your-secret-key
DJANGO_SUPERUSER_PASSWORD=admin

# Database
POSTGRES_DB=paps
POSTGRES_USER=paps
POSTGRES_PASSWORD=password
POSTGRES_HOST=postgres

# Redis
REDIS_HOST=redis
REDIS_PORT=6379

# RabbitMQ
RABBITMQ_HOST=rabbitmq
RABBITMQ_PORT=5672

# CVAT
CVAT_TOKEN=your-cvat-token

# Domains
ALLOWED_DOMAINS=localhost
BACKEND_DOMAIN=localhost:8000
```
