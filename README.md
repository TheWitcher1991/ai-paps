# Интеллектуальная система определения признаков растений, прогнозирования развития болезней и вредителей и принятия решений на основе технологий машинного зрения, ИИ и нейронных сетей

## Документация

- [Техническая документация](./docs/README.md)
- [Продуктовая документация](./docs/PRODUCT.md)

## Быстрый старт

### Требования

- Docker и Docker Compose
- Python 3.12+ (для локальной разработки)
- Node.js 20+ (для локальной разработки)
- pnpm

### Запуск

```bash
# Клонирование репозитория
git clone <repository-url>
cd ai-paps

# Запуск инфраструктуры
docker-compose -f docker-compose.base.yml up -d

# Запуск приложения (локальная разработка)
docker-compose -f docker-compose.local.yml up -d
```

### Доступ к сервисам

| Сервис | URL |
|--------|-----|
| Backend API | http://localhost:8000 |
| Swagger UI | http://localhost:8000/v1/docs/ |
| Frontend | http://localhost:3000 |
| Portainer | http://localhost:9000 |
| Grafana | http://localhost:3001 |
| Prometheus | http://localhost:9090 |

## Структура проекта

```
ai-paps/
├── clients/          # Frontend (Next.js monorepo)
├── services/core/    # Backend (Django)
├── docs/             # Документация
├── deploy/           # Конфигурация деплоя
└── docker-compose.* # Docker конфигурации
```
