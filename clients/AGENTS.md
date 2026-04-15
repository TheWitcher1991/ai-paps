# AI Developer Guide: Frontend Monorepo (clients)

## Содержание

1. [Обзор архитектуры](#обзор-архитектуры)
2. [Структура Monorepo](#структура-monorepo)
3. [Пакеты (Packages)](#пакеты-packages)
4. [Соглашения по коду](#соглашения-по-коду)
5. [TypeScript](#typescript)
6. [Path Aliases](#path-aliases)
7. [Стилизация](#стилизация)
8. [Состояние приложения](#состояние-приложения)
9. [API и HTTP](#api-и-http)
10. [React Query](#react-query)
11. [Компоненты](#компоненты)

---

## Обзор архитектуры

### Monorepo структура

```
clients/
├── apps/                 # Приложения
│   └── web/             # Next.js приложение
├── packages/             # Переиспользуемые пакеты
│   ├── toolkit/          # Утилиты (@wcsc/toolkit)
│   ├── models/           # API модели (@wcsc/models)
│   ├── hooks/            # React хуки (@wcsc/hooks)
│   ├── href/             # Роутинг утилиты (@wcsc/href)
│   ├── system/           # Системные константы (@wcsc/system)
│   ├── types/            # Общие типы (@wcsc/types)
│   ├── eslint-config/    # ESLint конфиг
│   └── typescript-config/ # TS конфиг
├── package.json          # Корневой package.json
├── pnpm-workspace.yaml   # Workspace конфигурация
├── turbo.json           # Turbo build конфиг
└── pnpm-lock.yaml      # Lock файл
```

### Стек технологий

| Категория | Технология | Версия |
|-----------|------------|--------|
| Framework | Next.js | 16.1.1 |
| UI | React | 19.1.1 |
| State | Effector | 23.4.2 |
| Server State | React Query | 5.90.16 |
| UI Kit | Gravity UI | - |
| Forms | React Hook Form | 7.62.0 |
| Validation | Valibot | 1.2.0 |
| HTTP | Axios | 1.13.2 |
| Package Manager | pnpm | 9.0.0 |
| Build | Turbo | 2.7.0 |

---

## Структура Monorepo

### apps/

Приложения — это отдельные запускаемые проекты (Next.js, Electron, etc.)

```
apps/
└── web/              # Основное веб-приложение
    ├── src/
    │   ├── app/      # App Router страницы
    │   ├── features/ # Feature-компоненты
    │   ├── models/   # API модели и типы
    │   ├── widgets/  # Переиспользуемые виджеты
    │   └── infra/   # Инфраструктура
    └── package.json  # Зависимости приложения
```

### packages/

Переиспользуемые библиотеки, публикуемые в workspace.

```
packages/
├── toolkit/          # Утилиты
├── models/           # API
├── hooks/            # Хуки
└── ...
```

### pnpm-workspace.yaml

```yaml
# pnpm-workspace.yaml
packages:
  - 'apps/*'
  - 'packages/*'
```

### turbo.json

```json
// turbo.json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "dist/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {}
  }
}
```

---

## Пакеты (Packages)

### Создание нового пакета

**Шаг 1:** Создать структуру

```bash
cd packages
mkdir -p my-package/src
cd my-package
```

**Шаг 2:** package.json

```json
{
  "name": "@wcsc/my-package",
  "version": "1.0.0",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": "./dist/index.js",
    "./package.json": "./package.json"
  },
  "scripts": {
    "build": "tsup src/index.ts --format cjs,esm --dts",
    "dev": "tsup src/index.ts --format cjs,esm --dts --watch"
  },
  "dependencies": {},
  "devDependencies": {
    "tsup": "^8.5.0",
    "typescript": "^5.9.2"
  }
}
```

**Шаг 3:** tsconfig.json

```json
{
  "extends": "../../packages/typescript-config/base.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"]
}
```

**Шаг 4:** tsup.config.ts (опционально)

```typescript
import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
})
```

**Шаг 5:** Исходный код

```typescript
// src/index.ts
export * from './my-feature'
```

**Шаг 6:** Подключение в workspace

```bash
cd packages/my-package
pnpm install
```

**Шаг 7:** Использование в apps/web

```typescript
import { myFeature } from '@wcsc/my-package'
```

---

## Соглашения по коду

### Именование файлов

| Тип | Соглашение | Пример |
|-----|-----------|--------|
| Компоненты | PascalCase | `MyComponent.tsx` |
| Утилиты | camelCase | `useMyHook.ts` |
| API | kebab-case | `user.api.ts` |
| Типы | PascalCase | `user.types.ts` |
| Константы | SCREAMING_SNAKE_CASE | `API_URL` |
| Стили | kebab-case.module.scss | `my-component.module.scss` |

### Именование компонентов

```typescript
// Компонент — PascalCase
export function UserProfile() { ... }
export function DatasetCard() { ... }

// Хук — camelCase с use префиксом
export function useUsers() { ... }
export function useDataset(id: number) { ... }

// Утилита — camelCase без use
export function formatDate(date: Date) { ... }
export function createDatasetApi() { ... }
```

### Экспорт из index

```typescript
// Публичный API пакета экспортируется из index.ts

// src/my-package/index.ts
export { MyComponent } from './MyComponent'
export { useMyHook } from './useMyHook'
export * from './types'
```

### Структура компонента

```typescript
// src/features/my-feature/MyComponent.tsx
'use client'

import { useState } from 'react'
import { Button, Flex } from '@gravity-ui/uikit'

// Пропсы
export interface MyComponentProps {
  title: string
  onAction?: () => void
  variant?: 'primary' | 'secondary'
}

// Компонент
export function MyComponent({
  title,
  onAction,
  variant = 'primary'
}: MyComponentProps) {
  const [loading, setLoading] = useState(false)
  
  const handleClick = async () => {
    setLoading(true)
    try {
      await onAction?.()
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <Flex direction="column" gap={2}>
      <h2>{title}</h2>
      <Button 
        loading={loading}
        view={variant === 'primary' ? 'action' : 'outlined'}
        onClick={handleClick}
      >
        Submit
      </Button>
    </Flex>
  )
}

// Default export (для lazy loading)
export default MyComponent
```

---

## TypeScript

### Базовые типы

```typescript
// types.ts

// Enum
export enum EntityStatus {
  PENDING = 'pending',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

// Interface
export interface User {
  id: number
  username: string
  email: string
  role: 'admin' | 'user' | 'viewer'
  createdAt: string
}

// Type alias
export type UserId = number
export type UserList = User[]

// Generic
export interface ApiResponse<T> {
  data: T
  count: number
  next: string | null
  previous: string | null
}

// Union type
export type Status = 'pending' | 'active' | 'completed'

// Utility types
export type UserPreview = Pick<User, 'id' | 'username'>
export type UserCreate = Omit<User, 'id' | 'createdAt'>
```

### React Props

```typescript
// Props с children
export interface LayoutProps {
  children: React.ReactNode
  className?: string
}

// Event handlers
export interface ButtonProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void
}

// Generic component
export interface ListProps<T> {
  items: T[]
  renderItem: (item: T) => React.ReactNode
  keyExtractor: (item: T) => string
}
```

### Строгая типизация

```typescript
// ПЛОХО
const handleClick = (e: any) => { ... }

// ХОРОШО
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => { ... }
```

---

## Path Aliases

### В apps/web

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

### Использование

```typescript
// Из src папки приложения
import { MyWidget } from '~widgets/my-widget'
import { http } from '~infra/http'

// Из packages
import { formatDate } from '@wcsc/toolkit'
import { createUserApi } from '@wcsc/models'
```

### Важные aliases

| Alias | Путь | Назначение |
|-------|------|------------|
| `~/*` | `./src/*` | Локальные модули приложения |
| `~widgets/*` | `./src/widgets/*` | Виджеты |
| `~features/*` | `./src/features/*` | Feature-компоненты |
| `~models/*` | `./src/models/*` | API модели |
| `~infra/*` | `./src/infra/*` | Инфраструктура |
| `@wcsc/*` | `../../packages/*/src` | Workspace пакеты |

---

## Стилизация

### Модульные стили

```scss
// my-component.module.scss

// BEM-like naming
.myComponent {
  padding: 16px;
  background: var(--color-bg);
  
  &__header {
    font-size: 18px;
    font-weight: 600;
  }
  
  &__body {
    margin-top: 12px;
  }
  
  &--loading {
    opacity: 0.5;
    pointer-events: none;
  }
}

// Комбинаторы
.element {
  &:hover {
    background: var(--color-hover);
  }
  
  &.active {
    background: var(--color-active);
  }
}
```

```tsx
// Компонент
import styles from './my-component.module.scss'

export function MyComponent({ loading }: { loading: boolean }) {
  return (
    <div className={cn(
      styles.myComponent,
      loading && styles.myComponent--loading
    )}>
      <div className={styles.myComponent__header}>Title</div>
      <div className={styles.myComponent__body}>Content</div>
    </div>
  )
}
```

### CSS Variables

```typescript
// Используй CSS переменные из дизайн-системы
// Gravity UI предоставляет переменные:
// --g-color-base-background
// --g-color-text-primary
// --g-color-control-bg
```

### Global стили

```scss
// app/global.scss
:root {
  --custom-color: #007bff;
}

body {
  font-family: var(--g-font-family-sans);
}
```

---

## Состояние приложения

### Effector (Client State)

```typescript
// stores/my-store.ts
import { createDomain } from 'effector'

const myDomain = createDomain('my')

// State
export const $myData = myDomain.createStore<Data[]>([])

// Events
export const setMyData = myDomain.createEvent<Data[]>()
export const addMyItem = myDomain.createEvent<Data>()
export const removeMyItem = myDomain.createEvent<number>()

// Effects
export const fetchMyDataFx = myDomain.createEffect(async () => {
  const response = await http.get('/my-endpoint/')
  return response.data
})

// Logic
$myData.on(setMyData, (_, data) => data)
$myData.on(addMyItem, (state, item) => [...state, item])
$myData.on(removeMyItem, (state, id) => state.filter(item => item.id !== id))
```

```tsx
// Использование в компоненте
import { useStore } from 'effector-react'
import { $myData, fetchMyDataFx } from '~/stores/my-store'

export function MyComponent() {
  const data = useStore($myData)
  const loading = useStore(fetchMyDataFx.pending)
  
  useEffect(() => {
    fetchMyDataFx()
  }, [])
  
  return loading ? <Skeleton /> : <List data={data} />
}
```

### React Query (Server State)

```typescript
// Используй React Query для серверных данных
// Подробнее в секции React Query
```

### Когда что использовать

| Тип данных | Решение | Пример |
|-----------|---------|--------|
| UI состояние | useState | Открытый модал, вкладки |
| Формы | React Hook Form | Ввод данных, валидация |
| Client State | Effector | Текущий пользователь, UI настройки |
| Server State | React Query | Списки, детали с API |
| URL State | useSearchParams | Фильтры, пагинация |

---

## API и HTTP

### HTTP клиент

```typescript
// infra/http/index.ts
import { useSessionRequestInterceptor } from '@wcsc/models'
import { API_URL } from '@wcsc/system'
import { createAxiosDefaults } from '@wcsc/toolkit'

export const http = createAxiosDefaults(API_URL)
http.interceptors.request.use(useSessionRequestInterceptor)
```

### API URL

```typescript
// packages/system/src/index.ts
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
```

### API функция

```typescript
// models/my-entity/my-entity.api.ts
import { http } from '~infra/http'

export interface MyEntity {
  id: number
  name: string
  status: string
}

export async function getMyEntities(): Promise<MyEntity[]> {
  const response = await http.get('/my-entities/')
  return response.data.results
}

export async function getMyEntity(id: number): Promise<MyEntity> {
  const response = await http.get(`/my-entities/${id}/`)
  return response.data
}

export async function createMyEntity(data: Partial<MyEntity>): Promise<MyEntity> {
  const response = await http.post('/my-entities/', data)
  return response.data
}
```

---

## React Query

### Базовые hooks

```typescript
// Используй хуки из @tanstack/react-query

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getMyEntity, createMyEntity } from '~/models/my-entity'

// Query hook
export function useMyEntity(id: number) {
  return useQuery({
    queryKey: ['my-entity', id],
    queryFn: () => getMyEntity(id),
    enabled: !!id, // Не выполнять если id пустой
  })
}

// Query list
export function useMyEntities(filters?: Record<string, string>) {
  return useQuery({
    queryKey: ['my-entities', filters],
    queryFn: () => getMyEntities(filters),
  })
}

// Mutation hook
export function useCreateMyEntity() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: createMyEntity,
    onSuccess: () => {
      // Инвалидировать кеш после успешного создания
      queryClient.invalidateQueries({ queryKey: ['my-entities'] })
    },
  })
}
```

### Query Options

```typescript
const options = {
  // Refetch
  staleTime: 1000 * 60 * 5,        // 5 минут до устаревания
  gcTime: 1000 * 60 * 30,         // 30 минут в кеше
  refetchOnWindowFocus: false,     // Не refetch при фокусе окна
  refetchOnReconnect: true,       // Refetch при переподключении
  
  // Retry
  retry: 3,
  retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
}
```

### Infinite Query

```typescript
export function useInfiniteMyEntities() {
  return useInfiniteQuery({
    queryKey: ['my-entities', 'infinite'],
    queryFn: ({ pageParam = 1 }) => getMyEntitiesPage(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.next ?? undefined,
  })
}
```

### Использование

```tsx
export function MyEntityPage({ id }: { id: number }) {
  const { data, isLoading, error, refetch } = useMyEntity(id)
  const { mutate, isPending } = useCreateMyEntity()
  
  if (isLoading) return <Skeleton />
  if (error) return <ErrorMessage error={error} />
  
  return (
    <div>
      <h1>{data.name}</h1>
      <Button onClick={() => refetch()}>Refresh</Button>
      <Button 
        loading={isPending}
        onClick={() => mutate({ name: 'New' })}
      >
        Create
      </Button>
    </div>
  )
}
```

---

## Компоненты

### Widgets

Переиспользуемые UI компоненты верхнего уровня.

```
widgets/
├── my-widget/
│   ├── index.ts          # Экспорты
│   ├── MyWidget.tsx      # Основной компонент
│   ├── MyWidgetItem.tsx  # Дочерний компонент
│   └── my-widget.module.scss
└── index.ts              # Barrel export
```

```typescript
// widgets/my-widget/index.ts
export { MyWidget } from './MyWidget'
export { MyWidgetItem } from './MyWidgetItem'
export type { MyWidgetProps } from './MyWidget'
```

### Features

Feature-компоненты, связанные с конкретной функциональностью.

```
features/
├── dataset/
│   ├── components/
│   ├── hooks/
│   ├── api/
│   └── index.ts
└── training/
    └── ...
```

### Структура страницы

```tsx
// app/workspace/datasets/page.tsx
'use client'

import { DatasetList } from '~widgets/datasets'
import { DatasetFilter } from '~features/dataset'
import { setBreadcrumbs } from '~widgets/nav'
import { useMount } from '@wcsc/hooks'
import { Group, PageTitle } from '~infra/ui'

export default function DatasetsPage() {
  useMount(() => setBreadcrumbs([
    { text: 'Датасеты', href: '/datasets' }
  ]))

  return (
    <Group>
      <PageTitle 
        title="Датасеты"
        subtitle="Управление наборами данных"
      />
      <DatasetFilter />
      <DatasetList />
    </Group>
  )
}
```

---

## Forms (React Hook Form + Valibot)

### Схема валидации

```typescript
// lib/validation.ts
import * as v from 'valibot'

export const createDatasetSchema = v.object({
  name: v.pipe(
    v.string(),
    v.minLength(3, 'Минимум 3 символа'),
    v.maxLength(255, 'Максимум 255 символов')
  ),
  description: v.optional(v.string()),
  source_id: v.pipe(v.number(), v.minValue(1)),
})

export type CreateDatasetInput = v.InferInput<typeof createDatasetSchema>
```

### Компонент формы

```tsx
import { useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { createDatasetSchema, type CreateDatasetInput } from '~/lib/validation'

export function CreateDatasetForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateDatasetInput>({
    resolver: valibotResolver(createDatasetSchema),
  })

  const onSubmit = async (data: CreateDatasetInput) => {
    await createDataset(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        {...register('name')}
        label="Название"
        error={errors.name?.message}
      />
      <TextArea
        {...register('description')}
        label="Описание"
      />
      <Button type="submit" loading={isSubmitting}>
        Создать
      </Button>
    </form>
  )
}
```

---

## Запуск и разработка

### Установка зависимостей

```bash
cd clients
pnpm install
```

### Запуск dev сервера

```bash
# Все приложения
pnpm dev

# Только web
pnpm --filter web dev
```

### Сборка

```bash
# Все пакеты и приложения
pnpm build

# Только web
pnpm --filter web build
```

### Линтинг

```bash
pnpm lint
pnpm --filter web lint
```

### Форматирование

```bash
pnpm format
```

---

## Checklist перед коммитом

- [ ] TypeScript компилируется без ошибок
- [ ] Все импорты используют aliases
- [ ] Компоненты имеют правильный naming (PascalCase)
- [ ] Формы валидируются с Valibot
- [ ] API запросы через React Query
- [ ] Нет any типов без необходимости
- [ ] CSS модули используют BEM naming
- [ ] Код отформатирован Prettier
- [ ] Линтер проходит
- [ ] Нет console.log/debugger
- [ ] Все widget/feature компоненты экспортированы из index
