# AI-PAPS: Техническая документация

## Содержание

1. [Общее описание](#общее-описание)
2. [Архитектура системы](#архитектура-системы)
3. [Технологический стек](#технологический-стек)
4. [Структура проекта](#структура-проекта)
5. [Модули и компоненты](#модули-и-компоненты)
6. [API](#api)
7. [База данных](#база-данных)
8. [AI/ML компоненты](#aiml-компоненты)
9. [Развертывание](#развертывание)

---

## Общее описание

**AI-PAPS** (Intelligent Plant Automated Pest System) — интеллектуальная система определения признаков растений, прогнозирования развития болезней и вредителей и принятия решений на основе технологий машинного зрения, искусственного интеллекта и нейронных сетей.

Система предназначена для:
- Обнаружения болезней и вредителей растений
- Прогнозирования фитосостояния растений
- Предоставления рекомендаций на основе визуального анализа

---

## Архитектура системы

Проект представляет собой **модульный монолит** с разделением на клиентскую и серверную части:

```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend (Next.js)                       │
│              clients/apps/web (pnpm monorepo)               │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     Backend (Django)                          │
│                  services/core (Python)                      │
└─────────────────────────────────────────────────────────────┘
                              │
          ┌───────────────────┼───────────────────┐
          ▼                   ▼                   ▼
    ┌──────────┐       ┌──────────┐       ┌──────────┐
    │PostgreSQL│       │  Redis   │       │ RabbitMQ │
    └──────────┘       └──────────┘       └──────────┘
                                              │
                                              ▼
                                    ┌──────────────────┐
                                    │ Celery Workers   │
                                    │ (AI Training)    │
                                    └──────────────────┘
```

---

## Технологический стек

### Backend

| Компонент | Технология | Версия |
|-----------|-------------|--------|
| Framework | Django + DRF | 5.2+ |
| Python | Python | 3.12-3.14 |
| Database | PostgreSQL | 15+ |
| Cache | Redis | 7+ |
| Task Queue | Celery + RabbitMQ | - |
| API Docs | drf-spectacular | - |
| Image Processing | Pillow, OpenCV | - |
| AI/ML | PyTorch, Ultralytics | - |

### Frontend

| Компонент | Технология | Версия |
|-----------|------------|--------|
| Framework | Next.js | 16.1.1 |
| React | React | 19.1.1 |
| State Management | Effector | - |
| UI Library | Gravity UI | - |
| Forms | React Hook Form + Valibot | - |
| HTTP Client | Axios | - |
| Package Manager | pnpm | - |
| Build Tool | Turbo | - |

### Инфраструктура

| Сервис | Назначение |
|--------|------------|
| PostgreSQL | Основная база данных |
| Redis | Кэширование и сессии |
| RabbitMQ | Очередь задач |
| Portainer | Управление Docker |
| Prometheus | Метрики |
| Grafana | Дашборды |
| Loki | Логирование |

---

## Структура проекта

```
ai-paps/
├── clients/                    # Frontend (monorepo)
│   ├── apps/
│   │   └── web/               # Next.js веб-приложение
│   │       └── src/
│   │           ├── app/       # Страницы App Router
│   │           ├── widgets/   # Переиспользуемые виджеты
│   │           ├── features/  # Компоненты функций
│   │           ├── models/    # Модели данных и API
│   │           └── infra/     # Инфраструктура UI
│   ├── packages/              # Общие пакеты
│   │   ├── toolkit/           # @wcsc/toolkit
│   │   ├── models/           # @wcsc/models
│   │   ├── hooks/            # @wcsc/hooks
│   │   ├── href/             # @wcsc/href
│   │   ├── system/           # @wcsc/system
│   │   ├── types/            # @wcsc/types
│   │   └── eslint-config     # ESLint конфиг
│   └── pnpm-workspace.yaml    # Конфигурация workspaces
│
├── services/
│   └── core/                  # Django приложение
│       ├── config/            # Настройки Django
│       │   ├── settings/      # Модульные настройки
│       │   ├── urls.py        # Маршрутизация
│       │   └── wsgi.py        # WSGI приложение
│       ├── users/             # Управление пользователями
│       ├── recognitions/      # Распознавание болезней/вредителей
│       ├── directory/         # Справочник растений и болезней
│       ├── projects/         # Управление проектами
│       ├── datasets/         # Управление датасетами
│       ├── training/         # Обучение ИИ моделей
│       │   └── usecases.py   # Бизнес-логика обучения
│       ├── vision/            # Компьютерное зрение
│       │   ├── models/        # Реализации моделей ИИ
│       │   ├── arch/          # Архитектуры нейросетей
│       │   ├── dataset/       # Загрузчики данных
│       │   ├── training.py    # Утилиты обучения
│       │   └── inference.py   # Инференс
│       ├── packages/          # Фреймворк
│       │   ├── framework/     # Базовые контроллеры, мидлвар
│       │   ├── kernel/        # Утилиты ядра
│       │   └── usecases/      # Бизнес-логика
│       ├── cvat/              # Интеграция с CVAT
│       └── cifra/             # Дополнительный модуль
│
├── deploy/                    # Конфигурация деплоя
│   └── nginx/                # Nginx конфиги
│
├── docs/                      # Документация
├── docker-compose.*.yml       # Docker Compose конфиги
└── bin/                       # Скрипты
```

---

## Модули и компоненты

### users — Управление пользователями

Модуль аутентификации и управления пользователями.

**Файлы:**
- `models.py` — Модель User с расширениями
- `routers.py` — API маршруты
- `serializers.py` — DRF сериализаторы
- `controllers.py` — Бизнес-логика
- `managers.py` — Менеджеры пользователей

**Особенности:**
- JWT аутентификация
- Интеграция с CVAT
- Расширенные роли пользователей

---

### recognitions — Распознавание

Модуль для выполнения распознавания болезней и вредителей.

**Файлы:**
- `models.py` — Модели распознавания
- `routers.py` — API endpoints
- `serializers.py` — Сериализаторы
- `controllers.py` — Логика распознавания
- `types.py` — Типы данных

---

### directory — Справочник

Каталог растений, болезней и вредителей.

**Файлы:**
- `models.py` — Модели справочника
- `routers.py` — API endpoints
- `serializers.py` — Сериализаторы
- `filters.py` — Фильтры

---

### projects — Проекты

Управление рабочими проектами.

**Функционал:**
- Создание/редактирование проектов
- Привязка датасетов
- Управление доступом

---

### datasets — Датасеты

Управление данными для обучения.

**Файлы:**
- `models.py` — Dataset, DatasetAsset, DatasetAnnotation
- `routers.py` — CRUD операции
- `repositories.py` — Репозиторий данных
- `usecases.py` — Бизнес-логика
- `engine.py` — Движок датасета

---

### training — Обучение моделей

Оркестрация процесса обучения ИИ.

**Файлы:**
- `models.py` — Training, TrainingRun, Model
- `routers.py` — API endpoints
- `usecases.py` — Бизнес-логика
- `services/dataset_loader.py` — Загрузчик данных
- `services/training_service.py` — Сервис обучения

**Процесс обучения:**
1. Создание Model (конфигурация модели в БД)
2. Создание Training (параметры обучения)
3. Привязка датасетов через TrainingDataset
4. Запуск обучения POST /training/{id}/start/
5. Мониторинг GET /training/{id}/runs/

---

### vision — Компьютерное зрение

Ядро AI/ML системы.

**Модели:**
| Модель | Файл | Назначение |
|--------|------|------------|
| U-Net | `models/u_net.py` | Семантическая сегментация |
| DeepLabV3 | `models/deeplabv3.py` | Сегментация (ResNet backbone) |
| FPN | `models/fpn.py` | Feature Pyramid Network |
| YOLO | `models/yolo.py` | Object detection/instance segmentation |
| Mask R-CNN | `models/mask_rcnn.py` | Instance detection & segmentation |

**Бэкбоны:**
- ResNet50, ResNet101, ResNet152
- EfficientNet
- VisionNet

---

### packages — Фреймворк

Переиспользуемая библиотека для Django.

**Структура:**
```
packages/
├── framework/
│   ├── controllers.py    # Базовые контроллеры
│   ├── routers.py        # Маршрутизация
│   ├── middleware.py     # Промежуточное ПО
│   ├── authentication.py # Аутентификация
│   ├── caching.py        # Кэширование
│   ├── pagination.py     # Пагинация
│   └── throttling.py     # Rate limiting
├── kernel/
│   ├── types.py          # Базовые типы
│   ├── exceptions.py     # Исключения
│   └── utils.py          # Утилиты
└── usecases/
    ├── logging.py        # Логирование
    ├── jwt.py            # JWT утилиты
    └── serializer.py    # Сериализация
```

---

## API

### Версионирование

API использует версионирование: `/v1/`

### Основные endpoints

| Метод | URL | Модуль | Описание |
|-------|-----|--------|----------|
| GET/POST | `/v1/users/` | users | Управление пользователями |
| GET/POST | `/v1/recognitions/` | recognitions | Распознавание |
| GET/POST | `/v1/directory/` | directory | Справочник |
| GET/POST | `/v1/projects/` | projects | Проекты |
| GET/POST | `/v1/datasets/` | datasets | Датасеты |
| GET/POST | `/v1/training/` | training | Обучение |
| POST | `/v1/training/{id}/start/` | training | Запуск обучения |
| GET | `/v1/training/{id}/runs/` | training | Мониторинг обучения |
| GET | `/v1/cvat/` | cvat | Интеграция CVAT |
| GET | `/v1/schema/` | drf-spectacular | OpenAPI схема |
| GET | `/v1/docs/` | drf-spectacular | Swagger UI |

### OpenAPI документация

Доступна по адресу: `/v1/docs/`

---

## База данных

### Основные модели

**users**
- User (расширенная модель пользователя)
- UserProfile

**recognitions**
- Recognition
- RecognitionResult

**directory**
- Plant (растение)
- Disease (болезнь)
- Pest (вредитель)

**projects**
- Project

**datasets**
- Dataset
- DatasetAsset (изображение)
- DatasetAnnotation (аннотация)

**training**
- Model (конфигурация модели)
- Training (конфигурация обучения)
- TrainingRun (запуск обучения)
- TrainingDataset (связь обучения с датасетами)

---

## AI/ML компоненты

### Поддерживаемые архитектуры

#### Сегментация
| Архитектура | Класс | Бэкбоун |
|-------------|-------|---------|
| U-Net | UNetAdapter | - |
| DeepLabV3 | DeepLabV3Adapter | resnet50, resnet101 |
| FPN | FPNWithBackboneAdapter | resnet50, resnet101, resnet152 |

#### Детекция
| Архитектура | Библиотека |
|-------------|------------|
| YOLO | Ultralytics |
| Mask R-CNN | torchvision |

### Параметры обучения

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| epochs | 20 | Количество эпох |
| learning_rate | 0.0001 | Скорость обучения |
| optimizer | adam | Оптимизатор |
| loss_function | BCEWithLogits | Функция потерь |
| lr_scheduler | plateau | Планировщик LR |
| train_batch_size | 4 | Размер батча |
| image_width/height | 512 | Размер изображения |
| early_stopping_patience | 5 | Ранняя остановка |

### Статусы обучения

| Статус | Описание |
|--------|----------|
| pending | Ожидает |
| queued | В очереди |
| running | Обучение |
| validating | Валидация |
| finished | Завершено |
| failed | Ошибка |
| cancelled | Отменено |

---

## Развертывание

### Docker Compose

Проект использует несколько docker-compose файлов:

- `docker-compose.base.yml` — Базовая инфраструктура
- `docker-compose.local.yml` — Локальная разработка
- `docker-compose.prod.yml` — Продакшн

### Сервисы инфраструктуры

```yaml
postgres:     # База данных
redis:        # Кэш и сессии
rabbitmq:     # Очередь задач
portainer:    # Управление Docker
grafana:      # Дашборды
prometheus:   # Метрики
loki:         # Логирование
promtail:     # Сбор логов
```

### Сети

- `frontend` — Сеть для фронтенда
- `backend` — Сеть для бэкенда и БД

### Запуск

```bash
# Локальная разработка
docker-compose -f docker-compose.local.yml up -d

# Продакшн
docker-compose -f docker-compose.prod.yml up -d
```

---

## Скрипты

| Скрипт | Назначение |
|--------|------------|
| `bin/dev.sh` | Запуск dev сервера |
| `bin/migrate.sh` | Миграции БД |
| `bin/deploy.sh` | Деплой |
| `bin/release.sh` | Релиз |
| `bin/certbot.sh` | SSL сертификаты |

---

## Зависимости

### Python (services/core/pyproject.toml)

- django>=5.2
- djangorestframework
- drf-spectacular
- psycopg2-binary
- redis
- celery
- pytorch
- ultralytics
- albumentations
- opencv-python
- pillow

### Node.js (clients/package.json)

- next>=16.1.1
- react>=19.1.1
- effector
- @gravity-ui/components
- react-hook-form
- valibot
- axios
- @tanstack/react-query
