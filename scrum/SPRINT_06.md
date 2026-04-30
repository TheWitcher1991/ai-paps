# Sprint 6: API, Documentation & Integration

**Продолжительность:** 2 недели (14 дней)
**Цель:** Завершить API, документацию и интеграции

## Overview

Sprint 6 фокусируется на:

- API документации
- Webhooks и интеграциях
- Внешних API
- Уведомлениях

## Задачи

### 6.1 API Documentation

**Описание:** Документация API

**Backend:**

| Задача | Описание | Зависимости | Приоритет |
|--------|----------|-------------|-----------|
| API-001 | Настройка drf-spectacular (Swagger) | - | MUST |
| API-002 | OpenAPI схема для всех endpoints | API-001 | MUST |
| API-003 | Документация для каждого endpoint | API-002 | SHOULD |
| API-004 | API version strategy | API-003 | SHOULD |
| API-005 | API changelog | API-004 | SHOULD |

**Frontend:**

| Задача | Описание | Зависимости | Приоритет |
|--------|----------|-------------|-----------|
| API-101 | UI страница API документации | - | SHOULD |
| API-102 | Интерактивный API playground | API-101 | SHOULD |

**Критерии приёмки:**
- [ ] Swagger UI доступен
- [ ] Все endpoints задокументированы
- [ ] Schema валидна

---

### 6.2 Webhooks & Events

**Описание:** Webhooks для внешних интеграций

**Backend:**

| Задача | Описание | Зависимости | Приоритет |
|--------|----------|-------------|-----------|
| WH-001 | Модель Webhook | - | MUST |
| WH-002 | CRUD для webhook endpoints | WH-001 | MUST |
| WH-003 | Event system (training.completed, recognition.completed) | WH-002 | MUST |
| WH-004 | Retry логика для webhook | WH-003 | SHOULD |
| WH-005 | Webhook signature verification | WH-004 | SHOULD |

**Frontend:**

| Задача | Описание | Зависимости | Приоритет |
|--------|----------|-------------|-----------|
| WH-101 | UI управления webhooks | - | MUST |
| WH-102 | UI логов webhook | WH-101 | MUST |

**Критерии приёмки:**
- [ ] Webhooks создаются и редактируются
- [ ] Events отправляются
- [ ] Логи сохраняются

---

### 6.3 Notifications

**Описание:** Система уведомлений

**Backend:**

| Задача | Описание | Зависимости | Приоритет |
|--------|----------|-------------|-----------|
| NOTIF-001 | Модель Notification | - | MUST |
| NOTIF-002 | Создание уведомлений (events) | NOTIF-001 | MUST |
| NOTIF-003 | Уведомления по email | NOTIF-002 | SHOULD |
| NOTIF-004 | Уведомления в UI (real-time) | NOTIF-003 | MUST |

**Frontend:**

| Задача | Описание | Зависимости | Приоритет |
|--------|----------|-------------|-----------|
| NOTIF-101 | UI notification bell | - | MUST |
| NOTIF-102 | Notification list | NOTIF-101 | MUST |
| NOTIF-103 | Notification settings | NOTIF-102 | SHOULD |

**Критерии приёмки:**
- [ ] Уведомления создаются
- [ ] UI отображает уведомления
- [ ] Email отправляется

---

### 6.4 External API

**Описание:** Публичное API для интеграций

**Backend:**

| Задача | Описание | Зависимости | Приоритет |
|--------|----------|-------------|-----------|
| EXT-001 | API Key management | - | MUST |
| EXT-002 | Rate limiting для API keys | EXT-001 | MUST |
| EXT-003 | Публичные endpoints для inference | EXT-002 | MUST |
| EXT-004 | API для интеграции с внешними системами | EXT-003 | SHOULD |

---

## Технические детали

### Webhook Event System

```python
# services/core/webhooks/events.py

class WebhookEvent:
    """Событие вебхука."""
    
    def __init__(self, event_type: str, payload: dict):
        self.event_type = event_type
        self.payload = payload
        self.timestamp = timezone.now()
    
    def send(self):
        """Отправка события всем подписанным webhook."""
        webhooks = Webhook.objects.filter(
            events__contains=self.event_type,
            is_active=True
        )
        
        for webhook in webhooks:
            self._send_webhook(webhook)
    
    def _send_webhook(self, webhook: Webhook):
        """Отправка одного webhook."""
        import hmac
        import hashlib
        import json
        
        payload = json.dumps(self.payload)
        signature = hmac.new(
            webhook.secret.encode(),
            payload.encode(),
            hashlib.sha256
        ).hexdigest()
        
        try:
            response = requests.post(
                webhook.url,
                data=payload,
                headers={
                    "Content-Type": "application/json",
                    "X-Webhook-Signature": signature,
                    "X-Webhook-Event": self.event_type
                },
                timeout=30
            )
            # Логирование результата
        except Exception as e:
            logger.error(f"Webhook failed: {e}")


# Events
class TrainingEvents:
    """События обучения."""
    
    @staticmethod
    def training_started(training_id: int):
        WebhookEvent(
            "training.started",
            {"training_id": training_id}
        ).send()
    
    @staticmethod
    def training_completed(training_id: int, metrics: dict):
        WebhookEvent(
            "training.completed",
            {"training_id": training_id, "metrics": metrics}
        ).send()
```

---

## Definition of Done

- [ ] Swagger документация работает
- [ ] Webhooks создаются и работают
- [ ] Уведомления доставляются
- [ ] External API работает

---

## Ресурсы

**Backend:**
- Разработчики: 1 backend разработчик
- Ожидаемое время: 50 человеко-часов

**Frontend:**
- Разработчики: 1 frontend разработчик
- Ожидаемое время: 30 человеко-часов

**Total:** 80 человеко-часов