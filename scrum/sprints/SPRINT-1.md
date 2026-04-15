# Sprint 1: Инфраструктура и аутентификация

**Длительность:** 2 недели  
**Цель спринта:** Развернуть базовую инфраструктуру, настроить CI/CD и реализовать систему аутентификации.

---

## Sprint Goal

> Как команда разработки, мы хотим развернуть инфраструктуру проекта и реализовать аутентификацию, чтобы иметь основу для разработки всех остальных модулей.

---

## User Stories в спринте

### US-1.1: Настройка CI/CD пайплайна
**Story Points:** 8  
**Assignee:** DevOps Engineer  

**Описание:**  
Как разработчик, я хочу иметь автоматизированный CI/CD пайплайн, чтобы каждый коммит автоматически проверялся и деплоился.

**Критерии приёмки:**
- [ ] Настроен GitHub Actions workflow
- [ ] Автоматический запуск тестов при PR
- [ ] Автоматический деплой на staging при merge в develop
- [ ] Автоматический деплой на production при merge в main
- [ ] Настроены уведомления о статусе билда

**Технические задачи:**
1. Создать `.github/workflows/ci.yml` для CI
2. Создать `.github/workflows/deploy.yml` для CD
3. Настроить секреты в GitHub (API keys, credentials)
4. Настроить Vercel/Docker deployment
5. Добавить badges в README

---

### US-1.2: Docker-контейнеризация
**Story Points:** 5  
**Assignee:** DevOps Engineer  

**Описание:**  
Как разработчик, я хочу иметь Docker-контейнеры для всех сервисов, чтобы обеспечить консистентную среду разработки и деплоя.

**Критерии приёмки:**
- [ ] Создан Dockerfile для Frontend (Next.js)
- [ ] Создан Dockerfile для Backend (ASP.NET Core)
- [ ] Создан Dockerfile для ML Service (Python)
- [ ] Создан docker-compose.yml для локальной разработки
- [ ] Документация по запуску

**Технические задачи:**
1. Создать `frontend/Dockerfile`
2. Создать `backend/Dockerfile`
3. Создать `ml-service/Dockerfile`
4. Создать `docker-compose.yml`
5. Создать `docker-compose.override.yml` для dev
6. Написать документацию в `docs/DOCKER.md`

**Пример docker-compose.yml:**
```yaml
version: '3.8'
services:
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=http://localhost:5000
    depends_on:
      - backend

  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - ConnectionStrings__Database=Host=db;Database=aipaps;Username=postgres;Password=postgres
      - Redis__ConnectionString=redis:6379
    depends_on:
      - db
      - redis

  ml-service:
    build: ./ml-service
    ports:
      - "8000:8000"
    environment:
      - REDIS_URL=redis://redis:6379
    depends_on:
      - redis

  db:
    image: postgis/postgis:15-3.3
    ports:
      - "5432:5432"
    environment:
      - POSTGRES_DB=aipaps
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

  minio:
    image: minio/minio
    ports:
      - "9000:9000"
      - "9001:9001"
    environment:
      - MINIO_ROOT_USER=minioadmin
      - MINIO_ROOT_PASSWORD=minioadmin
    command: server /data --console-address ":9001"
    volumes:
      - minio_data:/data

volumes:
  postgres_data:
  minio_data:
```

---

### US-1.3: Настройка PostgreSQL с PostGIS
**Story Points:** 5  
**Assignee:** Backend Developer  

**Описание:**  
Как разработчик, я хочу настроить PostgreSQL с расширением PostGIS, чтобы хранить и обрабатывать геопространственные данные.

**Критерии приёмки:**
- [ ] PostgreSQL 15 развёрнут с PostGIS
- [ ] Созданы базовые таблицы (users, roles)
- [ ] Настроены миграции (EF Core Migrations)
- [ ] Seed data для начальных ролей
- [ ] Настроено подключение из Backend

**Технические задачи:**
1. Создать `backend/Data/AppDbContext.cs`
2. Создать модели `User`, `Role`
3. Настроить EF Core с PostgreSQL
4. Создать начальные миграции
5. Создать seed data
6. Настроить connection string

**Схема таблиц:**
```sql
-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    role_id INT REFERENCES roles(id),
    avatar_url VARCHAR(500),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login_at TIMESTAMP
);

-- Roles table
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    permissions JSONB NOT NULL DEFAULT '[]'
);

-- Audit log
CREATE TABLE audit_logs (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(100),
    entity_id VARCHAR(100),
    details JSONB,
    ip_address INET,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed roles
INSERT INTO roles (name, permissions) VALUES
('admin', '["*"]'),
('agronomist', '["diagnosis:*", "catalog:read", "projects:*"]'),
('ml_engineer', '["datasets:*", "models:*", "training:*", "diagnosis:*"]'),
('viewer', '["diagnosis:read", "catalog:read", "projects:read"]');
```

---

### US-1.4: Настройка Redis
**Story Points:** 3  
**Assignee:** Backend Developer  

**Описание:**  
Как разработчик, я хочу настроить Redis для кэширования и очередей задач.

**Критерии приёмки:**
- [ ] Redis развёрнут и доступен
- [ ] Настроена библиотека StackExchange.Redis
- [ ] Реализован базовый сервис кэширования
- [ ] Настроена очередь для ML задач

**Технические задачи:**
1. Добавить StackExchange.Redis в backend
2. Создать `Services/CacheService.cs`
3. Создать `Services/QueueService.cs`
4. Настроить DI в `Program.cs`
5. Написать unit тесты

---

### US-1.5: Настройка S3-совместимого хранилища
**Story Points:** 3  
**Assignee:** Backend Developer  

**Описание:**  
Как разработчик, я хочу настроить S3-совместимое хранилище (MinIO) для хранения изображений и моделей.

**Критерии приёмки:**
- [ ] MinIO развёрнут и настроен
- [ ] Созданы buckets: datasets, models, temp
- [ ] Реализован сервис для работы с файлами
- [ ] Настроены presigned URLs

**Технические задачи:**
1. Добавить AWSSDK.S3 в backend
2. Создать `Services/StorageService.cs`
3. Реализовать методы Upload, Download, Delete
4. Реализовать генерацию presigned URLs
5. Создать buckets при старте приложения

---

### US-1.6: Регистрация пользователя
**Story Points:** 5  
**Assignee:** Full-stack Developer  

**Описание:**  
Как пользователь, я хочу зарегистрироваться в системе, чтобы получить доступ к функционалу.

**Критерии приёмки:**
- [ ] Форма регистрации (email, пароль, имя, фамилия)
- [ ] Валидация email (формат, уникальность)
- [ ] Валидация пароля (мин. 8 символов, цифры, буквы)
- [ ] Хеширование пароля (bcrypt)
- [ ] Отправка письма подтверждения
- [ ] Страница подтверждения email

**Технические задачи:**

**Backend:**
1. Создать `Controllers/AuthController.cs`
2. Создать `Services/AuthService.cs`
3. Создать `DTOs/RegisterRequest.cs`
4. Добавить валидацию с FluentValidation
5. Реализовать отправку email (SendGrid)
6. Создать endpoint `POST /api/v1/auth/register`

**Frontend:**
1. Создать `app/auth/register/page.tsx`
2. Создать `components/auth/register-form.tsx`
3. Добавить валидацию с react-hook-form + zod
4. Реализовать отправку на API
5. Добавить обработку ошибок
6. Редирект после успешной регистрации

**Пример кода:**

```typescript
// schemas/auth.ts
import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email('Введите корректный email'),
  password: z.string()
    .min(8, 'Минимум 8 символов')
    .regex(/[A-Z]/, 'Должна быть заглавная буква')
    .regex(/[0-9]/, 'Должна быть цифра'),
  confirmPassword: z.string(),
  firstName: z.string().min(2, 'Минимум 2 символа'),
  lastName: z.string().min(2, 'Минимум 2 символа'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Пароли не совпадают',
  path: ['confirmPassword'],
});
```

---

### US-1.7: Вход в систему
**Story Points:** 3  
**Assignee:** Full-stack Developer  

**Описание:**  
Как пользователь, я хочу войти в систему по email и паролю.

**Критерии приёмки:**
- [ ] Форма входа (email, пароль)
- [ ] Проверка credentials
- [ ] Генерация JWT токена
- [ ] Refresh token механизм
- [ ] Сохранение токена в httpOnly cookie
- [ ] Редирект на dashboard после входа

**Технические задачи:**

**Backend:**
1. Создать endpoint `POST /api/v1/auth/login`
2. Создать `DTOs/LoginRequest.cs`, `LoginResponse.cs`
3. Реализовать генерацию JWT
4. Реализовать refresh token
5. Добавить rate limiting

**Frontend:**
1. Создать `app/auth/login/page.tsx`
2. Создать `components/auth/login-form.tsx`
3. Создать `lib/auth.ts` для работы с токенами
4. Настроить middleware для защиты роутов

---

### US-1.12: JWT аутентификация для API
**Story Points:** 5  
**Assignee:** Backend Developer  

**Описание:**  
Как разработчик, я хочу настроить JWT аутентификацию, чтобы защитить API endpoints.

**Критерии приёмки:**
- [ ] Настроен JWT Bearer authentication
- [ ] Access token (15 мин) + Refresh token (7 дней)
- [ ] Middleware для проверки токена
- [ ] Атрибут [Authorize] на защищённых endpoints
- [ ] Возврат 401 при невалидном токене

**Технические задачи:**
1. Настроить JWT в `Program.cs`
2. Создать `Services/TokenService.cs`
3. Добавить middleware проверки токена
4. Реализовать refresh token endpoint
5. Добавить logout (blacklist tokens)

**Пример конфигурации:**
```csharp
// Program.cs
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]!))
        };
    });
```

---

## Definition of Done

- [ ] Код написан и прошёл code review
- [ ] Unit тесты написаны и проходят (coverage > 80%)
- [ ] Integration тесты для API endpoints
- [ ] Документация обновлена
- [ ] Нет критических и высоких уязвимостей (OWASP)
- [ ] Деплой на staging успешен
- [ ] QA провёл тестирование
- [ ] Product Owner принял User Story

---

## Sprint Metrics

| Метрика | План | Факт |
|---------|------|------|
| Story Points | 53 | - |
| User Stories | 8 | - |
| Bugs found | 0 | - |
| Technical Debt | 0 | - |

---

## Риски спринта

| Риск | Вероятность | Влияние | Митигация |
|------|-------------|---------|-----------|
| Проблемы с настройкой PostGIS | Средняя | Высокое | Использовать готовый Docker образ |
| Сложности с JWT | Низкая | Среднее | Использовать проверенные библиотеки |
| Задержки CI/CD | Средняя | Среднее | Начать с простого пайплайна |

---

## Ретроспектива (заполняется по итогам)

### Что прошло хорошо?
- 

### Что можно улучшить?
- 

### Action items:
- 
