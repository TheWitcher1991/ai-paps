# AI-PAPS: Техническая документация

## 📚 Структура документации

```
docs/
├── README.md                 # Этот файл
├── getting-started/          # Быстрый старт
│   └── PRODUCT.md           # Описание продукта
├── architecture/             # Архитектура системы
│   └── ARCHITECTURE.md      # Компоненты, потоки данных
├── api/                      # API документация
│   └── API.md               # Endpoints, схемы, примеры
├── modules/                  # Модули системы
│   ├── MODELS.md            # Модели данных (БД)
│   ├── BACKEND.md           # Backend (Django)
│   ├── FRONTEND.md          # Frontend (Next.js)
│   ├── AI_ML.md             # AI/ML компоненты
│   ├── AI_MODELS.md         # Модели машинного обучения
│   └── TRAINING_PIPELINE.md # Пайплайн обучения
├── guides/                   # Руководства
│   └── DEPLOYMENT.md        # Развертывание, Docker, CI/CD
├── ui-mockups/               # UI mockups (HTML)
│   ├── recognition.html
│   ├── asset-detail.html
│   ├── model-detail.html
│   ├── monitoring.html
│   ├── training-detail.html
│   └── test_ui/
└── for-ai/                   # Для AI-агентов (зарезервировано)
```

---

## 📖 Документация по разделам

### Быстрый старт
- [Продуктовая документация](./getting-started/PRODUCT.md) — Описание продукта, функционал, глоссарий

### Архитектура
- [Архитектура системы](./architecture/ARCHITECTURE.md) — Компоненты, потоки данных, инфраструктура

### API
- [API документация](./api/API.md) — Endpoints, схемы, примеры

### Модули
- [Модели данных](./modules/MODELS.md) — Database models, связи, типы
- [Backend](./modules/BACKEND.md) — Django, сервисы, Celery
- [Frontend](./modules/FRONTEND.md) — Next.js, компоненты, стейт
- [AI/ML](./modules/AI_ML.md) — Vision модели, обучение, inference
- [AI модели](./modules/AI_MODELS.md) — Подробности о моделях машинного обучения
- [Пайплайн обучения](./modules/TRAINING_PIPELINE.md) — Процесс обучения моделей

### Развертывание
- [Развертывание](./guides/DEPLOYMENT.md) — Docker, CI/CD, мониторинг, backup

### AI Developer Guides (для AI-агентов)
| Раздел | Путь | Описание |
|--------|------|----------|
| Backend | `services/core/AI_DEV_GUIDE.md` | Django, controllers, models, Celery |
| Frontend | `clients/AI_DEV_GUIDE.md` | Monorepo, pnpm, packages |
| Packages | `clients/packages/AI_DEV_GUIDE.md` | @wcsc/toolkit, @wcsc/models, etc. |
| Web App | `clients/apps/web/AI_DEV_GUIDE.md` | Next.js, widgets, features, pages |

---

## Общее описание

**AI-PAPS** (Intelligent Plant Automated Pest System) — интеллектуальная система определения признаков растений, прогнозирования развития болезней и вредителей и принятия решений на основе технологий машинного зрения, искусственного интеллекта и нейронных сетей.

### Система предназначена для:
- Обнаружения болезней и вредителей растений
- Прогнозирования фитосостояния растений
- Предоставления рекомендаций на основе визуального анализа

---

## Структура проекта

```
ai-paps/
├── clients/                    # Frontend (monorepo)
│   ├── apps/web/              # Next.js приложение
│   └── packages/              # Переиспользуемые пакеты
│
├── services/core/              # Backend (Django)
│   ├── users/                 # Пользователи
│   ├── datasets/              # Датасеты
│   ├── training/              # Обучение моделей
│   ├── vision/                # AI/ML ядро
│   ├── cvat/                  # CVAT интеграция
│   └── packages/              # Внутренний фреймворк
│
├── deploy/                    # Конфигурация деплоя
├── docs/                      # Документация
└── docker-compose.*.yml       # Docker конфиги
```

---

## Технологический стек

### Backend
| Компонент | Технология |
|-----------|------------|
| Framework | Django 5.2 + DRF |
| Python | 3.12-3.14 |
| Database | PostgreSQL 15+ |
| Cache | Redis 7+ |
| Task Queue | Celery + RabbitMQ |
| AI/ML | PyTorch, Ultralytics |

### Frontend
| Компонент | Технология |
|-----------|------------|
| Framework | Next.js 16.1.1 |
| React | 19.1.1 |
| State | Effector |
| UI Kit | Gravity UI |
| Forms | React Hook Form + Valibot |
| Package Manager | pnpm |
| Build Tool | Turbo |

### Инфраструктура
| Сервис | Назначение |
|--------|------------|
| PostgreSQL | База данных |
| Redis | Кэш и сессии |
| RabbitMQ | Очередь задач |
| Prometheus | Метрики |
| Grafana | Дашборды |

---

## Быстрый старт

### Требования
- Docker и Docker Compose
- Python 3.12+
- Node.js 20+
- pnpm

### Запуск

```bash
# Клонирование
git clone <repository-url>
cd ai-paps

# Запуск инфраструктуры
docker-compose -f docker-compose.base.yml up -d

# Запуск приложения
docker-compose -f docker-compose.local.yml up -d
```

### Доступ к сервисам

| Сервис | URL |
|--------|-----|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:8000 |
| Swagger UI | http://localhost:8000/v1/docs/ |
| Grafana | http://localhost:3001 |

---

## API Endpoints

| Модуль | Endpoints |
|--------|-----------|
| `/v1/users/` | Управление пользователями |
| `/v1/datasets/` | Датасеты |
| `/v1/training/` | Обучение моделей |
| `/v1/models/` | AI модели |
| `/v1/cvat/` | CVAT интеграция |
| `/v1/directory/` | Справочник |

Swagger UI: http://localhost:8000/v1/docs/

---

## AI/ML Архитектуры

| Архитектура | Тип | Назначение |
|-------------|------|------------|
| U-Net | Сегментация | Семантическая сегментация |
| DeepLabV3 | Сегментация | Сегментация с ASPP |
| FPN | Сегментация | Feature Pyramid Network |
| YOLO | Детекция | Object detection |
| Mask R-CNN | Детекция | Instance segmentation |

---

## Команда разработки

- **@TheWitcher** — Tech Lead, Fullstack Developer

---

## Полезные ссылки

- [AGENTS.md](../AGENTS.md) — Правила для AI-агентов
- [README.md](../README.md) — Главный README проекта
