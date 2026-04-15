# AI Developer Guide: Web App (clients/apps/web)

## Содержание

1. [Обзор](#обзор)
2. [Структура проекта](#структура-проекта)
3. [App Router](#app-router)
4. [Компоненты](#компоненты)
5. [Widgets](#widgets)
6. [Features](#features)
7. [Models (API)](#models-api)
8. [Инфраструктура](#инфраструктура)
9. [Страницы](#страницы)
10. [Навигация](#навигация)
11. [Forms](#forms)
12. [Styling](#styling)
13. [Состояние](#состояние)
14. [Разработка](#разработка)

---

## Обзор

Это основное Next.js приложение — веб-интерфейс системы AI-PAPS.

### Стек

| Технология | Версия | Назначение |
|------------|--------|-----------|
| Next.js | 16.1.1 | Framework |
| React | 19.1.1 | UI |
| TypeScript | 5.9.2 | Типизация |
| Gravity UI | - | UI Kit |
| Effector | 23.4.2 | Client State |
| React Query | 5.90.16 | Server State |

---

## Структура проекта

```
apps/web/
├── src/
│   ├── app/              # App Router страницы
│   │   ├── (auth)/       # Auth группа
│   │   ├── workspace/    # Основное приложение
│   │   ├── layout.tsx    # Root layout
│   │   └── page.tsx      # Главная страница
│   ├── features/         # Feature-компоненты
│   ├── models/          # API модели и типы
│   ├── widgets/          # Переиспользуемые виджеты
│   ├── infra/           # Инфраструктура
│   │   ├── http/        # Axios instance
│   │   ├── providers/   # React providers
│   │   ├── system/      # Системные константы
│   │   └── ui/          # UI примитивы
│   └── @types/          # TypeScript declaration
├── public/              # Статические файлы
├── package.json
├── next.config.ts
├── tsconfig.json
└── eslint.config.js
```

### Path Aliases

```json
// tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "~/*": ["./src/*"],
      "~widgets/*": ["./src/widgets/*"],
      "~features/*": ["./src/features/*"],
      "~models/*": ["./src/models/*"],
      "~infra/*": ["./src/infra/*"]
    }
  }
}
```

---

## App Router

### Корневой Layout

```tsx
// app/layout.tsx
import { Metadata } from 'next'
import './global.scss'

export const metadata: Metadata = {
  title: 'PAPS',
  description: 'Intelligent Plant Automated Pest System',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='ru'>
      <body className='g-root g-root_theme_dark'>
        <WithProviders>{children}</WithProviders>
      </body>
    </html>
  )
}
```

### Workspace Layout

```tsx
// app/workspace/layout.tsx
'use client'

import { PropsWithChildren } from 'react'
import Aside from '~widgets/aside'
import Nav from '~widgets/nav'
import Footer from '~widgets/footer'
import { Container } from '~infra/ui'

export default function WorkspaceLayout({ children }: PropsWithChildren) {
  return (
    <Aside>
      <Nav />
      <Container>{children}</Container>
      <Footer />
    </Aside>
  )
}
```

### Auth Layout

```tsx
// app/(auth)/layout.tsx
import { PropsWithChildren } from 'react'
import styles from './layout.module.scss'

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className={styles.authLayout}>
      {children}
    </div>
  )
}
```

---

## Компоненты

### Структура компонента

```
widgets/
└── my-widget/
    ├── index.ts              # Barrel export
    ├── MyWidget.tsx          # Основной компонент
    ├── MyWidgetHeader.tsx    # Дочерний компонент
    ├── MyWidgetTable.tsx    # Таблица
    ├── MyWidgetItem.tsx      # Элемент списка
    ├── MyWidgetSkeleton.tsx  # Loading skeleton
    ├── MyWidgetEmpty.tsx     # Empty state
    ├── MyWidgetError.tsx     # Error state
    └── my-widget.module.scss # Стили
```

### Базовый компонент

```tsx
// widgets/my-widget/MyWidget.tsx
'use client'

import { useState } from 'react'
import { Button, Skeleton } from '@gravity-ui/uikit'
import { useMyEntities } from '~models/my-entity'

import styles from './my-widget.module.scss'

export interface MyWidgetProps {
  title: string
  onItemClick?: (item: MyEntity) => void
}

export function MyWidget({ title, onItemClick }: MyWidgetProps) {
  const { data, isLoading, error, refetch } = useMyEntities()
  
  if (isLoading) {
    return <MyWidgetSkeleton />
  }
  
  if (error) {
    return <MyWidgetError error={error} onRetry={refetch} />
  }
  
  if (!data?.length) {
    return <MyWidgetEmpty title={title} />
  }
  
  return (
    <div className={styles.myWidget}>
      <div className={styles.myWidget__header}>
        <h3>{title}</h3>
        <Button size='s' onClick={refetch}>Refresh</Button>
      </div>
      
      <div className={styles.myWidget__list}>
        {data.map(item => (
          <MyWidgetItem 
            key={item.id} 
            item={item}
            onClick={() => onItemClick?.(item)}
          />
        ))}
      </div>
    </div>
  )
}
```

### Widget States

```tsx
// widgets/my-widget/MyWidgetSkeleton.tsx
export function MyWidgetSkeleton() {
  return (
    <div className={styles.skeleton}>
      <Skeleton height={24} width='60%' />
      <Skeleton height={16} width='100%' />
      <Skeleton height={16} width='80%' />
    </div>
  )
}

// widgets/my-widget/MyWidgetEmpty.tsx
export function MyWidgetEmpty({ title }: { title: string }) {
  return (
    <PlaceholderContainer
      title={`Нет данных для "${title}"`}
      image={<Icon data={NotFound} size={80} />}
      description='Добавьте данные для отображения'
    />
  )
}

// widgets/my-widget/MyWidgetError.tsx
export function MyWidgetError({ 
  error, 
  onRetry 
}: { 
  error: Error 
  onRetry: () => void 
}) {
  return (
    <PlaceholderContainer
      title='Ошибка загрузки'
      description={error.message}
      action={<Button onClick={onRetry}>Повторить</Button>}
    />
  )
}
```

### Widget Index

```typescript
// widgets/my-widget/index.ts
export { MyWidget } from './MyWidget'
export type { MyWidgetProps } from './MyWidget'
export { MyWidgetSkeleton } from './MyWidgetSkeleton'
export { MyWidgetEmpty } from './MyWidgetEmpty'
export { MyWidgetError } from './MyWidgetError'
```

---

## Widgets

### Список существующих

```
widgets/
├── aside/              # Боковая панель навигации
├── asset/              # Компонент ассета
├── assets/             # Список ассетов
├── dashkit/            # Дашборд виджеты
├── datasets/           # Компоненты датасетов
├── footer/             # Нижний колонтитул
├── jobs/               # CVAT jobs
├── login-form/         # Форма входа
├── model/              # Компонент модели
├── models/             # Список моделей
├── nav/                # Навигация с хлебными крошками
├── projects/           # Проекты
├── requests/           # Запросы
├── tasks/              # CVAT tasks
├── training/           # Компонент обучения
├── training-create/    # Форма создания обучения
├── trainings/           # Список обучений
└── users/              # Пользователи
```

### Создание нового Widget

**Шаг 1:** Создай структуру

```
widgets/my-widget/
├── index.ts
├── MyWidget.tsx
├── MyWidgetItem.tsx
├── MyWidgetSkeleton.tsx
├── MyWidgetEmpty.tsx
├── MyWidgetError.tsx
└── my-widget.module.scss
```

**Шаг 2:** Напиши компонент

```tsx
// widgets/my-widget/MyWidget.tsx
'use client'

import { useMyEntities } from '~models/my-entity'
import { MyWidgetItem } from './MyWidgetItem'
import { MyWidgetSkeleton } from './MyWidgetSkeleton'
import { MyWidgetEmpty } from './MyWidgetEmpty'

import styles from './my-widget.module.scss'

export interface MyWidgetProps {
  title: string
}

export function MyWidget({ title }: MyWidgetProps) {
  const { data, isLoading } = useMyEntities()
  
  return (
    <div className={styles.myWidget}>
      <h3 className={styles.myWidget__title}>{title}</h3>
      
      {isLoading ? (
        <MyWidgetSkeleton />
      ) : data?.length ? (
        <div className={styles.myWidget__list}>
          {data.map(item => (
            <MyWidgetItem key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <MyWidgetEmpty />
      )}
    </div>
  )
}
```

**Шаг 3:** Создай стили

```scss
// widgets/my-widget/my-widget.module.scss

.myWidget {
  padding: 16px;
  background: var(--g-color-base-background);
  border-radius: 8px;
  
  &__title {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 12px;
  }
  
  &__list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
}
```

**Шаг 4:** Экспортируй

```typescript
// widgets/my-widget/index.ts
export { MyWidget } from './MyWidget'
export type { MyWidgetProps } from './MyWidget'
export { MyWidgetItem } from './MyWidgetItem'
```

---

## Features

Feature-компоненты — это более специфичные компоненты, связанные с конкретной функциональностью модуля.

### Структура

```
features/
└── my-feature/
    ├── components/        # Компоненты фичи
    ├── hooks/             # Хуки фичи
    ├── api/               # API функции фичи
    ├── index.ts           # Barrel export
    └── my-feature.types.ts # Типы
```

### Пример

```
features/
└── dataset/
    ├── components/
    │   ├── DatasetFilter.tsx
    │   ├── DatasetCard.tsx
    │   └── DatasetStats.tsx
    ├── hooks/
    │   └── useDatasetStats.ts
    ├── api/
    │   └── dataset-stats.api.ts
    ├── index.ts
    └── dataset.types.ts
```

---

## Models (API)

### Структура

```
models/
├── user/
│   ├── index.ts
│   ├── user.api.ts
│   ├── user.types.ts
│   └── user.utils.tsx
├── dataset/
│   ├── index.ts
│   ├── dataset.api.ts
│   ├── dataset.types.ts
│   └── dataset.utils.tsx
├── training/
│   ├── index.ts
│   ├── training.api.tsx
│   └── training.types.ts
└── ...
```

### Создание API модели

**Шаг 1:** Типы

```typescript
// models/my-entity/my-entity.types.ts
export interface MyEntity {
  id: number
  name: string
  status: 'pending' | 'active' | 'completed'
  created_date: string
  updated_date: string
}

export type MyEntityStatus = MyEntity['status']

export interface MyEntityListParams {
  page?: number
  page_size?: number
  status?: MyEntityStatus
}
```

**Шаг 2:** API функции

```typescript
// models/my-entity/my-entity.api.ts
import { http } from '~infra/http'

export interface PaginatedResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

export async function getMyEntities(
  params?: MyEntityListParams
): Promise<PaginatedResponse<MyEntity>> {
  const response = await http.get('/my-entities/', { params })
  return response.data
}

export async function getMyEntity(id: number): Promise<MyEntity> {
  const response = await http.get(`/my-entities/${id}/`)
  return response.data
}

export async function createMyEntity(
  data: Partial<MyEntity>
): Promise<MyEntity> {
  const response = await http.post('/my-entities/', data)
  return response.data
}
```

**Шаг 3:** React Query hooks

```typescript
// models/my-entity/my-entity.api.ts (добавить в конец)
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

export function useMyEntities(params?: MyEntityListParams) {
  return useQuery({
    queryKey: ['my-entities', params],
    queryFn: () => getMyEntities(params),
  })
}

export function useMyEntity(id: number | null) {
  return useQuery({
    queryKey: ['my-entity', id],
    queryFn: () => getMyEntity(id!),
    enabled: !!id,
  })
}

export function useCreateMyEntity() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: createMyEntity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-entities'] })
    },
  })
}
```

**Шаг 4:** Экспорт

```typescript
// models/my-entity/index.ts
export * from './my-entity.api'
export * from './my-entity.types'
```

---

## Инфраструктура

### HTTP

```typescript
// infra/http/index.ts
import { useSessionRequestInterceptor } from '@wcsc/models'
import { API_URL } from '@wcsc/system'
import { createAxiosDefaults } from '@wcsc/toolkit'

export const http = createAxiosDefaults(API_URL)
http.interceptors.request.use(useSessionRequestInterceptor)
```

### Providers

```typescript
// infra/providers/
// Оборачивает приложение в React Query и Effector провайдеры
```

### UI примитивы

```typescript
// infra/ui/
// Общие UI компоненты: Container, Group, PageTitle, etc.
```

### Системные константы

```typescript
// infra/system/index.ts
export const projectConfig = {
  name: 'PAPS',
  long_name: 'PAPS',
  description: '',
}
```

---

## Страницы

### Структура

```
app/
├── (auth)/                  # Auth routes
│   └── login/
│       └── page.tsx
├── workspace/              # Workspace routes
│   ├── datasets/
│   │   ├── page.tsx       # /datasets
│   │   ├── [id]/
│   │   │   ├── page.tsx   # /datasets/[id]
│   │   │   └── assets/
│   │   │       └── page.tsx
│   │   └── page.tsx
│   ├── models/
│   │   ├── page.tsx
│   │   └── [id]/
│   │       └── page.tsx
│   ├── trainings/
│   │   ├── page.tsx
│   │   ├── create/
│   │   │   └── page.tsx
│   │   └── [id]/
│   │       └── page.tsx
│   ├── directory/
│   ├── cvat/
│   ├── users/
│   ├── layout.tsx
│   └── page.tsx           # Дашборд
├── layout.tsx
└── page.tsx
```

### Пример страницы

```tsx
// app/workspace/my-entity/page.tsx
'use client'

import { MyEntityList } from '~widgets/my-entity'
import { MyEntityFilter } from '~features/my-entity'
import { MyEntityIndicators } from '~widgets/dashkit'
import { setBreadcrumbs } from '~widgets/nav'
import { useMount } from '@wcsc/hooks'
import { generateBreadcrumbs } from '@wcsc/toolkit'
import { Group, PageTitle, Flex } from '~infra/ui'

export default function MyEntityPage() {
  useMount(() => 
    setBreadcrumbs(generateBreadcrumbs('my-entity'))
  )

  return (
    <Group>
      <PageTitle
        title='Мои сущности'
        subtitle='Управление сущностями'
      />
      
      <Flex direction='column' gap={4}>
        <MyEntityIndicators />
        <MyEntityFilter />
        <MyEntityList />
      </Flex>
    </Group>
  )
}
```

### Динамическая страница

```tsx
// app/workspace/my-entity/[id]/page.tsx
'use client'

import { use } from 'react'
import { MyEntityDetail } from '~widgets/my-entity'
import { useMyEntity } from '~models/my-entity'
import { Skeleton } from '@gravity-ui/uikit'

interface PageProps {
  params: Promise<{ id: string }>
}

export default function MyEntityDetailPage({ params }: PageProps) {
  const { id } = use(params)
  const { data, isLoading, error } = useMyEntity(Number(id))

  if (isLoading) {
    return <Skeleton height={200} />
  }

  if (error || !data) {
    return <div>Ошибка загрузки</div>
  }

  return <MyEntityDetail entity={data} />
}
```

---

## Навигация

### Breadcrumbs

```typescript
// widgets/nav/index.ts
export function setBreadcrumbs(crumbs: BreadcrumbItem[]) {
  // Установка хлебных крошек
}

// Использование
import { useMount } from '@wcsc/hooks'
import { setBreadcrumbs, generateBreadcrumbs } from '~widgets/nav'

useMount(() => setBreadcrumbs([
  { text: 'Главная', href: '/' },
  { text: 'Датасеты', href: '/datasets' },
  { text: 'Детали', href: '#' }
]))
```

### Aside (sidebar)

```typescript
// widgets/aside/index.ts
// Боковая панель с навигацией
```

---

## Forms

### React Hook Form + Valibot

**Шаг 1:** Схема валидации

```typescript
// lib/schemas/my-entity.schema.ts
import * as v from 'valibot'

export const myEntitySchema = v.object({
  name: v.pipe(
    v.string(),
    v.minLength(3, 'Минимум 3 символа'),
    v.maxLength(255, 'Максимум 255 символов')
  ),
  description: v.optional(v.string()),
  status: v.picklist(['pending', 'active', 'completed']),
})

export type MyEntityFormData = v.InferInput<typeof myEntitySchema>
```

**Шаг 2:** Компонент формы

```tsx
// features/my-entity/components/MyEntityForm.tsx
'use client'

import { useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { Button, TextInput, TextArea } from '@gravity-ui/uikit'
import { myEntitySchema, type MyEntityFormData } from '~/lib/schemas/my-entity.schema'

interface Props {
  onSubmit: (data: MyEntityFormData) => void
  defaultValues?: Partial<MyEntityFormData>
}

export function MyEntityForm({ onSubmit, defaultValues }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<MyEntityFormData>({
    resolver: valibotResolver(myEntitySchema),
    defaultValues,
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        {...register('name')}
        label='Название'
        placeholder='Введите название'
        validationState={errors.name ? 'invalid' : undefined}
        errorMessage={errors.name?.message}
      />
      
      <TextArea
        {...register('description')}
        label='Описание'
        placeholder='Введите описание'
        errorMessage={errors.description?.message}
      />
      
      <Button 
        type='submit' 
        loading={isSubmitting}
        view='action'
      >
        Сохранить
      </Button>
    </form>
  )
}
```

---

## Styling

### CSS Modules

```scss
// widgets/my-widget/my-widget.module.scss

.myWidget {
  padding: 16px;
  
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
  }
  
  &__title {
    font-size: 18px;
    font-weight: 600;
  }
  
  &__list {
    display: grid;
    gap: 12px;
  }
  
  &--loading {
    opacity: 0.6;
    pointer-events: none;
  }
}
```

### Использование

```tsx
import styles from './my-widget.module.scss'

export function MyWidget({ loading }: { loading: boolean }) {
  return (
    <div className={cn(
      styles.myWidget,
      loading && styles.myWidget--loading
    )}>
      {/* ... */}
    </div>
  )
}
```

### Global Styles

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

## Состояние

### Client State (Effector)

```typescript
// stores/my-store.ts
import { createDomain } from 'effector'

const myDomain = createDomain('my')

export const $myData = myDomain.createStore<MyData[]>([])
export const setMyData = myDomain.createEvent<MyData[]>()
export const addMyItem = myDomain.createEvent<MyData>()
```

### Server State (React Query)

```typescript
// models/my-entity/my-entity.api.ts
export function useMyEntities(params?: MyEntityListParams) {
  return useQuery({
    queryKey: ['my-entities', params],
    queryFn: () => getMyEntities(params),
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}
```

### Когда что использовать

| Тип данных | Решение | Пример |
|-----------|---------|--------|
| UI состояние | useState | Модалки, вкладки |
| Client данные | Effector | Настройки, темы |
| Server данные | React Query | API данные |
| URL данные | useSearchParams | Фильтры |

---

## Разработка

### Запуск

```bash
cd clients
pnpm dev
# или
pnpm --filter web dev
```

### Сборка

```bash
pnpm --filter web build
```

### Типизация

```bash
pnpm --filter web check-types
```

### Линтинг

```bash
pnpm --filter web lint
```

---

## Checklist для страницы

- [ ] Использует 'use client' директиву
- [ ] Импортирует setBreadcrumbs из '~widgets/nav'
- [ ] Использует useMount для установки хлебных крошек
- [ ] Использует PageTitle компонент
- [ ] Использует Group для группировки
- [ ] Обрабатывает isLoading, error, empty states
- [ ] Все импорты используют aliases (~/*)
- [ ] API через React Query hooks
- [ ] Нет any типов

## Checklist для Widget

- [ ] Создана структура файлов
- [ ] Есть Skeleton, Empty, Error states
- [ ] Использует CSS Modules для стилей
- [ ] Экспортирует тип Props
- [ ] Использует Gravity UI компоненты
- [ ] Barrel export в index.ts
