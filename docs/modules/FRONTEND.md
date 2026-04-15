# AI-PAPS: Frontend документация

## Содержание

1. [Обзор](#обзор)
2. [Структура проекта](#структура-проекта)
3. [Стек технологий](#стек-технологий)
4. [Приложения и страницы](#приложения-и-страницы)
5. [Модели и API](#модели-и-api)
6. [Компоненты](#компоненты)
7. [Инфраструктура](#инфраструктура)
8. [Пакеты](#пакеты)
9. [Конфигурация](#конфигурация)
10. [Разработка](#разработка)

---

## Обзор

Frontend — это Next.js 16 приложение, организованное как monorepo с использованием pnpm workspaces и Turbo.

### Расположение

```
ai-paps/
└── clients/
    ├── apps/
    │   └── web/           # Next.js приложение
    ├── packages/           # Переиспользуемые пакеты
    ├── package.json       # Корневой package.json
    └── pnpm-workspace.yaml
```

---

## Структура проекта

```
clients/
├── apps/
│   └── web/                          # Next.js приложение
│       ├── src/
│       │   ├── app/                 # App Router
│       │   │   ├── (auth)/         # Группа маршрутов авторизации
│       │   │   │   ├── login/
│       │   │   │   └── layout.tsx
│       │   │   ├── workspace/      # Основное приложение
│       │   │   │   ├── datasets/
│       │   │   │   ├── models/
│       │   │   │   ├── trainings/
│       │   │   │   ├── directory/
│       │   │   │   ├── cvat/
│       │   │   │   ├── users/
│       │   │   │   └── layout.tsx
│       │   │   ├── layout.tsx      # Корневой layout
│       │   │   └── page.tsx       # Главная страница
│       │   ├── features/           # Feature-компоненты
│       │   ├── models/             # API модели
│       │   ├── widgets/             # Переиспользуемые виджеты
│       │   └── infra/               # Инфраструктура
│       ├── public/                 # Статические файлы
│       └── package.json
└── packages/                        # Общие пакеты
    ├── toolkit/                     # @wcsc/toolkit
    ├── models/                      # @wcsc/models
    ├── hooks/                       # @wcsc/hooks
    ├── href/                        # @wcsc/href
    ├── system/                      # @wcsc/system
    ├── types/                       # @wcsc/types
    ├── eslint-config/               # ESLint конфигурация
    └── typescript-config/           # TS конфигурация
```

---

## Стек технологий

### Основные зависимости

| Пакет | Версия | Назначение |
|-------|--------|------------|
| `next` | 16.1.1 | React Framework |
| `react` | 19.1.1 | UI библиотека |
| `effector` | 23.4.2 | State management |
| `effector-react` | 23.3.0 | React интеграция Effector |
| `@gravity-ui/components` | - | UI компоненты |
| `react-hook-form` | 7.62.0 | Формы |
| `valibot` | 1.2.0 | Валидация |
| `axios` | 1.13.2 | HTTP клиент |
| `@tanstack/react-query` | 5.90.16 | Серверный state |
| `ts-pattern` | 5.9.0 | Паттерн матчинг |

### Dev зависимости

| Пакет | Назначение |
|-------|------------|
| `typescript` | Типизация |
| `turbo` | Build система |
| `prettier` | Форматирование |
| `eslint` | Линтинг |

---

## Приложения и страницы

### Корневой layout

```typescript
// src/app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html lang='ru'>
      <body className='g-root g-root_theme_dark'>
        <WithProviders>{children}</WithProviders>
      </body>
    </html>
  )
}
```

### Workspace layout

```typescript
// src/app/workspace/layout.tsx
export default function WorkspaceLayout({ children }) {
  return (
    <Aside>
      <Nav />
      <Container>{children}</Container>
      <Footer />
    </Aside>
  )
}
```

### Страницы

#### Дашборд (`/`)

```typescript
// src/app/workspace/page.tsx
export default function Workspace() {
  return (
    <Group>
      <PageTitle title='Панель управления' />
      <Flex>
        <ValueCard value={0} title='Классов' />
        <ValueCard value={0} title='Моделей' />
        <ValueCard value={0} title='Датасетов' />
        <ValueCard value={0} title='Изображений' />
      </Flex>
      <DashkitWidget title='Классы' />
      <DashkitWidget title='Прогресс разметки' />
    </Group>
  )
}
```

#### Обучения (`/trainings`)

```typescript
// src/app/workspace/trainings/page.tsx
export default function TrainingsPage() {
  return (
    <Group>
      <PageTitle title='Обучения' />
      <TrainingsIndicators />
      <TrainingsFilter />
      <Trainings />
      <TrainingsPagination />
    </Group>
  )
}
```

#### Датасеты (`/datasets`)

```
/datasets           — список датасетов
/datasets/[id]      — детали датасета
/datasets/[id]/assets — ассеты датасета
```

#### Модели (`/models`)

```
/models             — список моделей
/models/[id]        — детали модели
```

---

## Модели и API

### Структура моделей

```
src/models/
├── user/
│   ├── index.ts
│   ├── user.api.ts
│   └── user.utils.tsx
├── dataset/
│   ├── index.ts
│   ├── dataset.api.ts
│   └── dataset.utils.tsx
├── training/
│   ├── index.ts
│   ├── training.api.tsx
│   └── ui/
├── model/
├── project/
├── annotation/
├── asset/
├── class/
├── job/
├── request/
└── task/
```

### Пример API модели

```typescript
// src/models/user/user.api.ts
import { http } from '~infra/http'
import { createReadonlyUserApi } from '@wcsc/models'

const { useUser, useInfinitUsers, useUsers } = createReadonlyUserApi(http)

export { useUser, useInfinitUsers, useUsers }
```

### HTTP клиент

```typescript
// src/infra/http/index.ts
import { useSessionRequestInterceptor } from '@wcsc/models'
import { API_URL } from '@wcsc/system'
import { createAxiosDefaults } from '@wcsc/toolkit'

export const http = createAxiosDefaults(API_URL)
http.interceptors.request.use(useSessionRequestInterceptor)
```

---

## Компоненты

### Widgets

Переиспользуемые UI компоненты:

```
src/widgets/
├── aside/           # Боковая панель
├── asset/           # Компонент ассета
├── assets/          # Список ассетов
├── dashkit/         # Дашборд виджеты
│   ├── trainings-indicators.tsx
│   └── ...
├── datasets/        # Компоненты датасетов
├── footer/          # Нижний колонтитул
├── jobs/            # Задачи CVAT
├── login-form/      # Форма входа
├── model/           # Компонент модели
├── models/          # Список моделей
├── nav/             # Навигация
├── projects/        # Проекты
├── requests/        # Запросы
├── tasks/           # Задачи
├── training/        # Обучение
├── training-create/ # Форма создания обучения
├── trainings/       # Список обучений
└── users/           # Пользователи
```

### Features

Feature-компоненты по модулям:

```
src/features/
├── asset/
├── cvat/
├── dataset/
├── department/
├── import/
├── job/
├── model/
├── notifications/
├── project/
├── request/
├── shared/
├── task/
├── training/
└── user/
```

### Пример Widget

```typescript
// src/widgets/trainings/index.tsx
import { TrainingsTable, TrainingsFetcher } from './trainings'

export interface TrainingsProps {}

export default function Trainings({}: TrainingsProps) {
  return <TrainingsTable />
}

export { TrainingsFetcher }
```

---

## Инфраструктура

### Системный конфиг

```typescript
// src/infra/system/index.ts
import { GearBranches } from '@gravity-ui/icons'

export const projectConfig = {
  name: 'PAPS',
  long_name: 'PAPS',
  description: '',
  icon: GearBranches,
}
```

### Providers

```typescript
// src/infra/providers/
// React Query, Effect Provider, etc.
```

### UI компоненты

```typescript
// src/infra/ui/
// Общие UI примитивы
```

### HTTP

```typescript
// src/infra/http/index.ts
// Axios instance
```

---

## Пакеты

### @wcsc/toolkit

Общие утилиты:

```typescript
// Содержит:
import { createAxiosDefaults, generateBreadcrumbs } from '@wcsc/toolkit'
```

### @wcsc/models

Модели и API:

```typescript
// Содержит:
import { createReadonlyUserApi } from '@wcsc/models'
```

### @wcsc/hooks

React хуки:

```typescript
// Содержит:
import { useMount } from '@wcsc/hooks'
```

### @wcsc/system

Системные утилиты:

```typescript
// Содержит:
import { API_URL } from '@wcsc/system'
```

### @wcsc/types

Общие типы:

```typescript
// Содержит общие TypeScript типы
```

---

## Конфигурация

### next.config.ts

```typescript
// apps/web/next.config.ts
/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@wcsc/toolkit', '@wcsc/models'],
}

module.exports = nextConfig
```

### TypeScript

```json
// tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "~/*": ["./src/*"],
      "@wcsc/*": ["../../packages/*/src"]
    }
  }
}
```

### Prettier

```json
// .prettierrc
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 100
}
```

### ESLint

```javascript
// eslint.config.js
import baseConfig from '@wcsc/eslint-config/base'

export default [...baseConfig]
```

---

## Разработка

### Установка

```bash
cd clients
pnpm install
```

### Запуск dev сервера

```bash
pnpm dev
# или
turbo run dev
```

### Сборка

```bash
pnpm build
# или
turbo run build
```

### Линтинг

```bash
pnpm lint
```

### Форматирование

```bash
pnpm format
```

### Проверка типов

```bash
pnpm check-types
```

### Aliases

```typescript
// Импорты в коде
import { useUser } from '@wcsc/models'      // Из packages
import { http } from '~infra/http'          // Из src/infra/http
import { Trainings } from '~widgets/trainings' // Из src/widgets
```

---

## Роутинг

### Структура маршрутов

```
/                         → workspace/page.tsx (дашборд)
/login                    → (auth)/login/page.tsx

/workspace/
  /datasets               → workspace/datasets/page.tsx
  /datasets/[id]          → workspace/datasets/[id]/page.tsx
  /datasets/[id]/assets   → workspace/datasets/[id]/assets/page.tsx
  
  /models                 → workspace/models/page.tsx
  /models/[id]            → workspace/models/[id]/page.tsx
  
  /trainings              → workspace/trainings/page.tsx
  /trainings/create       → workspace/trainings/create/page.tsx
  /trainings/[id]         → workspace/trainings/[id]/page.tsx
  
  /directory/             → workspace/directory/page.tsx
  /cvat/                  → workspace/cvat/page.tsx
  /users/                 → workspace/users/page.tsx
```

### Хлебные крошки

```typescript
// Использование
import { useMount } from '@wcsc/hooks'
import { setBreadcrumbs, generateBreadcrumbs } from '~widgets/nav'

useMount(() => {
  setBreadcrumbs(generateBreadcrumbs('trainings'))
})
```

---

## Best Practices

### Именование файлов

- Компоненты: PascalCase (`TrainingsTable.tsx`)
- Утилиты: camelCase (`useUser.ts`)
- API: snake_case или kebab-case (`user.api.ts`)

### Структура компонента

```typescript
// MyComponent.tsx
'use client'

import { useState } from 'react'
import { Button, Flex } from '@gravity-ui/uikit'

export interface MyComponentProps {
  title: string
}

export function MyComponent({ title }: MyComponentProps) {
  const [count, setCount] = useState(0)
  
  return (
    <Flex>
      <Button onClick={() => setCount(c => c + 1)}>
        {title}: {count}
      </Button>
    </Flex>
  )
}
```

### Работа с API

```typescript
// Всегда используйте React Query
const { data, isLoading, error } = useTraining(id)

// Обработка состояний
if (isLoading) return <Skeleton />
if (error) return <ErrorMessage error={error} />
return <TrainingView data={data} />
```
