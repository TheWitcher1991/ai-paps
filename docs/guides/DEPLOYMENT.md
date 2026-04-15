# AI-PAPS: Развертывание

## Содержание

1. [Обзор](#обзор)
2. [Требования](#требования)
3. [Локальная разработка](#локальная-разработка)
4. [Docker Compose](#docker-compose)
5. [Production](#production)
6. [Environment Variables](#environment-variables)
7. [Мониторинг](#мониторинг)
8. [Backup](#backup)

---

## Обзор

Проект разворачивается с использованием Docker Compose с несколькими конфигурациями:

| Файл | Назначение |
|------|------------|
| `docker-compose.base.yml` | Базовая инфраструктура |
| `docker-compose.local.yml` | Локальная разработка |
| `docker-compose.prod.yml` | Production |

### Сервисы

```
┌─────────────────────────────────────────────────────┐
│                     Frontend                         │
│                   (Next.js)                          │
│                   Port: 3000                         │
└─────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────┐
│                     Backend                          │
│                    (Django)                          │
│                   Port: 8000                        │
│                                                      │
│    ┌─────────────┐     ┌──────────────────┐       │
│    │   Celery    │────▶│    RabbitMQ       │       │
│    │   Worker    │     │    Port: 5672     │       │
│    └─────────────┘     └──────────────────┘       │
└─────────────────────────────────────────────────────┘
         │                         │
         ▼                         ▼
┌────────────────┐      ┌────────────────┐
│    Redis       │      │  PostgreSQL    │
│   Port: 6379   │      │   Port: 5432   │
└────────────────┘      └────────────────┘
```

---

## Требования

### Системные

- Docker 24.0+
- Docker Compose 2.20+
- Python 3.12+ (для локальной разработки)
- Node.js 20+ (для локальной разработки)
- pnpm 9.0+

### Рекомендуемые ресурсы

| Ресурс | Минимум | Рекомендуется |
|--------|---------|---------------|
| CPU | 4 cores | 8+ cores |
| RAM | 8 GB | 16+ GB |
| Disk | 50 GB | 100+ GB |

### GPU для обучения

Для AI/ML обучения рекомендуется NVIDIA GPU с:
- CUDA 12.0+
- cuDNN 8+
- NVIDIA Driver 525+

---

## Локальная разработка

### Быстрый старт

```bash
# 1. Клонировать репозиторий
git clone <repository-url>
cd ai-paps

# 2. Настроить .env
cp .env.example .env
# Заполнить необходимые переменные

# 3. Запустить инфраструктуру
docker-compose -f docker-compose.base.yml up -d

# 4. Запустить приложение (backend + frontend)
docker-compose -f docker-compose.local.yml up -d
```

### Доступ к сервисам

| Сервис | URL | Creds |
|--------|-----|-------|
| Frontend | http://localhost:3000 | - |
| Backend API | http://localhost:8000 | - |
| Swagger UI | http://localhost:8000/v1/docs/ | - |
| Django Admin | http://localhost:8000/admin/ | admin/admin |
| Portainer | http://localhost:9000 | admin/admin |
| Grafana | http://localhost:3001 | admin/admin |
| Prometheus | http://localhost:9090 | - |

### Backend (Django)

```bash
cd services/core

# Установка зависимостей
poetry install

# Миграции
poetry run python manage.py migrate

# Суперпользователь
poetry run python manage.py createsuperuser

# Запуск dev сервера
poetry run python manage.py runserver 0.0.0.0:8000
```

### Frontend (Next.js)

```bash
cd clients

# Установка зависимостей
pnpm install

# Запуск dev сервера
pnpm dev
```

### Celery Worker

```bash
cd services/core

# Запуск Celery worker
celery -A paps worker -l info

# Запуск Celery beat (scheduler)
celery -A paps beat -l info
```

---

## Docker Compose

### docker-compose.base.yml

Базовая инфраструктура (PostgreSQL, Redis, RabbitMQ, мониторинг):

```yaml
services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: ${POSTGRES_DB}
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - backend

  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data
    networks:
      - backend

  rabbitmq:
    image: rabbitmq:3-management
    volumes:
      - rabbitmq_data:/var/lib/rabbitmq
    networks:
      - backend

  prometheus:
    image: prom/prometheus:latest
    volumes:
      - ./docker/prometheus:/etc/prometheus
    networks:
      - backend

  grafana:
    image: grafana/grafana:latest
    volumes:
      - grafana_data:/var/lib/grafana
    networks:
      - backend

networks:
  frontend:
  backend:
```

### docker-compose.local.yml

Локальная разработка:

```yaml
services:
  backend:
    build:
      context: ./services/core
      dockerfile: Dockerfile
    ports:
      - "8000:8000"
    environment:
      - DEBUG=true
    volumes:
      - ./services/core:/app
    networks:
      - backend
      - frontend

  frontend:
    build:
      context: ./clients
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    volumes:
      - ./clients:/app
      - /app/node_modules
    networks:
      - frontend
      - backend
```

### docker-compose.prod.yml

Production конфигурация:

```yaml
services:
  backend:
    build:
      context: ./services/core
      dockerfile: Dockerfile.prod
    restart: always
    environment:
      - DEBUG=false
      - ALLOWED_HOSTS=${DOMAIN}
    networks:
      - backend

  celery:
    build:
      context: ./services/core
      dockerfile: Dockerfile
    command: celery -A paps worker -l info
    restart: always
    networks:
      - backend

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./deploy/nginx:/etc/nginx/conf.d
      - ./deploy/ssl:/etc/ssl
    networks:
      - frontend
```

---

## Production

### Предпродакшн подготовка

**1. Создай .env.prod:**

```bash
# Django
DJANGO_SECRET_KEY=очень-длинный-случайный-ключ
DEBUG=false
ALLOWED_DOMAINS=yourdomain.com
BACKEND_DOMAIN=api.yourdomain.com
ADMIN_URL=secure-admin/

# Database
POSTGRES_DB=paps
POSTGRES_USER=paps_prod
POSTGRES_PASSWORD=сложный-пароль
POSTGRES_HOST=postgres
POSTGRES_PORT=5432

# Redis
REDIS_HOST=redis
REDIS_PORT=6379

# RabbitMQ
RABBITMQ_HOST=rabbitmq
RABBITMQ_PORT=5672
RABBITMQ_USER=guest
RABBITMQ_PASSWORD=пароль

# CVAT
CVAT_TOKEN=your-cvat-token

# Frontend
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
```

**2. Настрой Nginx:**

```nginx
# deploy/nginx/default.conf
upstream backend {
    server backend:8000;
}

server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://frontend;
    }

    location /api/ {
        proxy_pass http://backend;
    }

    location /v1/docs/ {
        proxy_pass http://backend;
    }
}
```

**3. SSL сертификаты:**

```bash
# Let's Encrypt
certbot --nginx -d yourdomain.com -d api.yourdomain.com
```

### Запуск production

```bash
# Pull latest changes
git pull

# Build images
docker-compose -f docker-compose.prod.yml build

# Run migrations
docker-compose -f docker-compose.prod.yml run --rm backend python manage.py migrate

# Collect static
docker-compose -f docker-compose.prod.yml run --rm backend python manage.py collectstatic --noinput

# Restart services
docker-compose -f docker-compose.prod.yml up -d
```

### Масштабирование

```bash
# Масштабирование Celery workers
docker-compose -f docker-compose.prod.yml up -d --scale celery=4

# Масштабирование backend (требует sticky sessions)
docker-compose -f docker-compose.prod.yml up -d --scale backend=2
```

---

## Environment Variables

### Backend (.env)

```bash
# ===========================================
# DJANGO
# ===========================================
DJANGO_SECRET_KEY=your-secret-key
DEBUG=false
ALLOWED_DOMAINS=localhost,yourdomain.com
BACKEND_DOMAIN=localhost:8000
ADMIN_URL=admin/

# Superuser
DJANGO_SUPERUSER_USERNAME=admin
DJANGO_SUPERUSER_EMAIL=admin@example.com
DJANGO_SUPERUSER_PASSWORD=password

# ===========================================
# DATABASE
# ===========================================
POSTGRES_DB=paps
POSTGRES_USER=paps
POSTGRES_PASSWORD=password
POSTGRES_HOST=postgres
POSTGRES_PORT=5432

# ===========================================
# REDIS
# ===========================================
REDIS_HOST=redis
REDIS_PORT=6379

# ===========================================
# RABBITMQ
# ===========================================
RABBITMQ_HOST=rabbitmq
RABBITMQ_PORT=5672
RABBITMQ_USER=guest
RABBITMQ_PASSWORD=guest
RABBITMQ_VHOST=/

# ===========================================
# CELERY
# ===========================================
CELERY_BROKER_URL=amqp://guest:guest@rabbitmq:5672/
CELERY_RESULT_BACKEND=redis://redis:6379/0

# ===========================================
# CVAT
# ===========================================
CVAT_TOKEN=your-cvat-token

# ===========================================
# TRAINING
# ===========================================
TRAINING_WORKERS=2
```

### Frontend (.env.local)

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

## Мониторинг

### Prometheus

Метрики доступны по адресу: http://localhost:9090

**Полезные queries:**

```promql
# HTTP requests
rate(django_http_requests_total[5m])

# Celery tasks
rate(celery_tasks_total[5m])

# Database connections
pg_stat_database_numbackends
```

### Grafana

Дашборды доступны по адресу: http://localhost:3001

**Преднастроенные дашборды:**
- Django Application Metrics
- Celery Tasks
- PostgreSQL Stats
- Docker Container Stats

### Логи

```bash
# Все логи
docker-compose logs -f

# Backend логи
docker-compose logs -f backend

# Celery логи
docker-compose logs -f celery

# Поиск по логам
docker-compose logs | grep ERROR
```

---

## Backup

### PostgreSQL

```bash
# Backup
docker-compose exec postgres pg_dump -U paps paps > backup_$(date +%Y%m%d_%H%M%S).sql

# Restore
docker-compose exec -T postgres psql -U paps paps < backup_file.sql
```

### Volumes

```bash
# Backup volumes
docker run --rm -v ai-paps_postgres_data:/data -v $(pwd):/backup alpine tar czf /backup/postgres_backup.tar.gz /data

# Restore volumes
docker run --rm -v ai-paps_postgres_data:/data -v $(pwd):/backup alpine tar xzf /backup/postgres_backup.tar.gz -C /
```

### Автоматический backup (cron)

```bash
# Добавить в crontab
0 2 * * * docker-compose exec postgres pg_dump -U paps paps > /backups/paps_$(date +\%Y\%m\%d).sql
```

---

## Troubleshooting

### Проблемы с миграциями

```bash
# Показать pending миграции
docker-compose exec backend python manage.py showmigrations

# Создать миграции
docker-compose exec backend python manage.py makemigrations

# Применить миграции
docker-compose exec backend python manage.py migrate
```

### Проблемы с Celery

```bash
# Проверить статус
docker-compose exec backend celery -A paps inspect stats

# Перезапустить worker
docker-compose restart celery
```

### Проблемы с правами

```bash
# Исправить permissions для media
docker-compose exec backend chown -R app:app /app/mediafiles
```

### Очистка

```bash
# Остановить и удалить volumes
docker-compose down -v

# Пересобрать всё
docker-compose down --rmi local
docker-compose build --no-cache
docker-compose up -d
```
