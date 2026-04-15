# AI-PAPS: Архитектура системы

## Содержание

1. [Общая архитектура](#общая-архитектура)
2. [Компоненты системы](#компоненты-системы)
3. [Потоки данных](#потоки-данных)
4. [Инфраструктура](#инфраструктура)
5. [Сетевая архитектура](#сетевая-архитектура)
6. [Безопасность](#безопасность)

---

## Общая архитектура

**AI-PAPS** (Intelligent Plant Automated Pest System) представляет собой модульную систему с клиент-серверной архитектурой:

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENTS (Frontend)                         │
│                    Next.js 16 / React 19                         │
│                    Effector / Gravity UI                          │
└─────────────────────────────────────────────────────────────────┘
                                  │
                                  ▼ HTTP/REST
┌─────────────────────────────────────────────────────────────────┐
│                       SERVICES (Backend)                          │
│                   Django 5.2 / DRF / Celery                       │
│                 services/core (Python 3.12+)                     │
└─────────────────────────────────────────────────────────────────┘
                    │              │              │
        ┌───────────┴───┐  ┌──────┴────┐  ┌─────┴─────┐
        │  PostgreSQL   │  │   Redis   │  │ RabbitMQ  │
        │  База данных  │  │   Кэш     │  │  Очередь  │
        └───────────────┘  └───────────┘  └───────────┘
                                                   │
                                                   ▼
                                         ┌─────────────────┐
                                         │ Celery Workers  │
                                         │ (AI Training)   │
                                         └─────────────────┘
```

### Технологический стек

#### Backend
| Компонент | Технология | Версия |
|-----------|------------|--------|
| Framework | Django + DRF | 5.2+ |
| Python | Python | 3.12-3.14 |
| Database | PostgreSQL | 15+ |
| Cache | Redis | 7+ |
| Task Queue | Celery + RabbitMQ | - |
| API Docs | drf-spectacular | - |

#### Frontend
| Компонент | Технология | Версия |
|-----------|------------|--------|
| Framework | Next.js | 16.1.1 |
| React | React | 19.1.1 |
| State | Effector | - |
| UI Library | Gravity UI | - |
| Package Manager | pnpm | - |

---

## Компоненты системы

### 1. Frontend (clients/)

```
clients/
├── apps/
│   └── web/                    # Next.js приложение
│       └── src/
│           ├── app/           # App Router страницы
│           │   ├── (auth)/    # Авторизация
│           │   └── workspace/ # Основное приложение
│           │       ├── datasets/
│           │       ├── trainings/
│           │       ├── models/
│           │       ├── directory/
│           │       └── cvat/
│           ├── features/     # Feature-компоненты
│           ├── models/      # API модели и типы
│           ├── widgets/      # Переиспользуемые виджеты
│           └── infra/       # Инфраструктура
└── packages/                  # Общие пакеты
    ├── toolkit/              # @wcsc/toolkit
    ├── models/               # @wcsc/models
    ├── hooks/                # @wcsc/hooks
    └── types/                # @wcsc/types
```

### 2. Backend (services/core/)

```
services/core/
├── config/                   # Django конфигурация
│   ├── settings/            # Настройки модульные
│   │   ├── base.py         # Базовые настройки
│   │   ├── database.py     # PostgreSQL
│   │   ├── cache.py        # Redis
│   │   └── ...
│   ├── urls.py             # Маршрутизация
│   └── celery.py           # Celery конфиг
├── users/                   # Пользователи
├── recognitions/            # Распознавание
├── directory/               # Справочник
├── projects/                # Проекты
├── datasets/                # Датасеты
├── training/                # Обучение моделей
│   ├── services/           # Бизнес-логика
│   │   ├── training_service.py
│   │   └── dataset_loader.py
│   └── background.py        # Celery задачи
├── vision/                 # Компьютерное зрение
│   ├── models/             # Реализации моделей
│   │   ├── u_net.py
│   │   ├── deeplabv3.py
│   │   ├── fpn.py
│   │   └── ...
│   ├── inference.py        # Инференс
│   └── training.py         # Обучение CV
├── cvat/                   # Интеграция CVAT
│   ├── tasks/
│   ├── projects/
│   └── annotations/
└── packages/               # Внутренний фреймворк
    ├── framework/          # DRF компоненты
    ├── kernel/             # Базовые типы
    └── usecases/           # Бизнес-логика
```

---

## Потоки данных

### 1. Поток распознавания

```
┌──────────┐    ┌────────────┐    ┌─────────────┐    ┌────────────┐
│ Клиент   │───▶│ Django API │───▶│ Inference   │───▶│ Результат  │
│ (Frontend)│    │ /recognize │    │ Service     │    │ (JSON/Mask)│
└──────────┘    └────────────┘    └─────────────┘    └────────────┘
                                            │
                                            ▼
                                     ┌────────────┐
                                     │ Vision     │
                                     │ Models     │
                                     └────────────┘
```

### 2. Поток обучения

```
┌──────────┐    ┌────────────┐    ┌─────────────┐    ┌────────────┐
│ Клиент   │───▶│ Django API │───▶│ Celery      │───▶│ Model File │
│ (Frontend)│    │ /training  │    │ Worker      │    │ (.pth)     │
└──────────┘    └────────────┘    └─────────────┘    └────────────┘
       │                              │
       ▼                              ▼
┌────────────┐                 ┌─────────────┐
│ Training   │                 │ Dataset     │
│ Config     │                 │ Loader      │
└────────────┘                 └─────────────┘
```

### 3. Поток синхронизации CVAT

```
┌──────────┐    ┌────────────┐    ┌─────────────┐    ┌────────────┐
│ CVAT     │───▶│ Django API │───▶│ CVAT SDK    │───▶│ Dataset    │
│ Server   │    │ /cvat/     │    │ Parser      │    │ (DB)       │
└──────────┘    └────────────┘    └─────────────┘    └────────────┘
```

---

## Инфраструктура

### Контейнеризация (Docker)

| Сервис | Образ | Назначение |
|--------|-------|------------|
| `postgres` | PostgreSQL 15+ | Основная БД |
| `redis` | Redis 7+ | Кэш, сессии |
| `rabbitmq` | RabbitMQ | Очередь задач |
| `backend` | Django app | API сервер |
| `frontend` | Next.js | Веб-приложение |
| `portainer` | Portainer | Docker UI |
| `prometheus` | Prometheus | Метрики |
| `grafana` | Grafana | Дашборды |
| `loki` | Loki | Логи |

### Volumes

- `postgres_data` — данные PostgreSQL
- `redis_data` — данные Redis
- `rabbitmq_data` — данные RabbitMQ
- `media_data` — пользовательские файлы
- `grafana_data` — дашборды
- `prometheus_data` — метрики
- `loki_data` — логи

---

## Сетевая архитектура

### Docker Networks

```
frontend (bridge)
    │
    └── frontend-service
            │
            └── backend (bridge)
                    │
                    ├── backend-service
                    ├── postgres
                    ├── redis
                    ├── rabbitmq
                    ├── prometheus
                    ├── grafana
                    └── loki
```

### Публичные endpoints

| Сервис | Порт | URL |
|--------|------|-----|
| Frontend | 3000 | http://localhost:3000 |
| Backend API | 8000 | http://localhost:8000 |
| Swagger UI | 8000 | http://localhost:8000/v1/docs/ |
| Portainer | 9000 | http://localhost:9000 |
| Grafana | 3001 | http://localhost:3001 |
| Prometheus | 9090 | http://localhost:9090 |

---

## Безопасность

### Аутентификация

- JWT токены (access + refresh)
- CVAT интеграция для SSO
- Ролевая модель пользователей

### Роли пользователей

| Роль | Описание |
|------|----------|
| `admin` | Полный доступ |
| `user` | Стандартный доступ |
| `viewer` | Только чтение |

### Защита данных

- S3 Private File Fields для конфиденциальных файлов
- CSRF protection
- Rate limiting
- Input validation

---

## Конфигурация

### Environment Variables (Backend)

```bash
# Django
DJANGO_SECRET_KEY=<secret>
ALLOWED_DOMAINS=localhost
BACKEND_DOMAIN=localhost:8000
ADMIN_URL=admin/

# Database
POSTGRES_DB=paps
POSTGRES_USER=paps
POSTGRES_PASSWORD=<password>
POSTGRES_HOST=postgres

# Redis
REDIS_HOST=redis
REDIS_PORT=6379

# RabbitMQ
RABBITMQ_HOST=rabbitmq
RABBITMQ_PORT=5672

# CVAT
CVAT_TOKEN=<token>
```

### Environment Variables (Frontend)

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
```
