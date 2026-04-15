# AI Developer Guide: Packages (clients/packages)

## Содержание

1. [Обзор](#обзор)
2. [Пакеты](#пакеты)
3. [Создание пакета](#создание-пакета)
4. [@wcsc/toolkit](#wcsc-toolkit)
5. [@wcsc/models](#wcsc-models)
6. [@wcsc/hooks](#wcsc-hooks)
7. [@wcsc/system](#wcsc-system)
8. [@wcsc/types](#wcsc-types)
9. [@wcsc/href](#wcsc-href)
10. [Конфигурация](#конфигурация)
11. [Build и публикация](#build-и-публикация)

---

## Обзор

Packages — это переиспользуемые библиотеки монорепо, доступные для всех приложений в `apps/`.

### Структура

```
packages/
├── toolkit/              # @wcsc/toolkit — утилиты
├── models/               # @wcsc/models — API модели
├── hooks/                # @wcsc/hooks — React хуки
├── href/                 # @wcsc/href — роутинг утилиты
├── system/               # @wcsc/system — системные константы
├── types/                # @wcsc/types — общие типы
├── eslint-config/        # ESLint конфигурация
└── typescript-config/    # TypeScript конфигурация
```

### Использование

```typescript
// Любой пакет импортируется через alias
import { formatDate } from '@wcsc/toolkit'
import { createUserApi } from '@wcsc/models'
import { useMount } from '@wcsc/hooks'
```

---

## Пакеты

### Существующие пакеты

| Пакет | Назначение | Экспорты |
|-------|-----------|-----------|
| `@wcsc/toolkit` | Утилиты, хелперы | `formatDate`, `createAxiosDefaults`, etc. |
| `@wcsc/models` | API функции и типы | `createUserApi`, `createDatasetApi`, etc. |
| `@wcsc/hooks` | React хуки | `useMount`, `useClickOutside`, etc. |
| `@wcsc/system` | Константы | `API_URL`, etc. |
| `@wcsc/types` | Общие типы | Entity interfaces, etc. |
| `@wcsc/href` | Роутинг утилиты | URL helpers |

---

## Создание пакета

### Структура

```
packages/
└── my-package/
    ├── src/
    │   ├── index.ts          # Главный экспорт
    │   ├── my-feature.ts     # Функции
    │   ├── utils.ts          # Утилиты
    │   └── types.ts          # Типы
    ├── package.json
    ├── tsconfig.json
    ├── eslint.config.js      # (если нужен отдельный)
    └── README.md
```

### package.json

```json
{
  "name": "@wcsc/my-package",
  "version": "1.0.0",
  "description": "Мой пакет",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",
      "require": "./dist/index.js"
    }
  },
  "files": [
    "dist"
  ],
  "scripts": {
    "build": "tsup src/index.ts --format cjs,esm --dts",
    "dev": "tsup src/index.ts --format cjs,esm --dts --watch",
    "lint": "eslint src/",
    "typecheck": "tsc --noEmit"
  },
  "peerDependencies": {
    "react": ">=18",
    "react-dom": ">=18"
  },
  "devDependencies": {
    "@types/react": "^19.1.0",
    "tsup": "^8.5.0",
    "typescript": "^5.9.2"
  }
}
```

### tsconfig.json

```json
{
  "extends": "../typescript-config/base.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src",
    "declaration": true,
    "declarationMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### tsup.config.ts

```typescript
import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom'],
})
```

### src/index.ts

```typescript
// Обязательный barrel export
export * from './my-feature'
export * from './types'
```

---

## @wcsc/toolkit

Общие утилиты для работы с данными, форматированием, HTTP и т.д.

### Структура

```
toolkit/
└── src/
    ├── index.ts
    ├── api.ts            # Axios утилиты
    ├── date.ts           # Работа с датами
    ├── fn.ts             # Функциональные хелперы
    ├── format.ts         # Форматирование
    ├── file.ts           # Работа с файлами
    ├── http.ts           # HTTP утилиты
    ├── mapper.ts         # Маппинг объектов
    ├── reducers.ts       # Редьюсеры
    ├── regex.ts          # Регулярки
    └── ...
```

### Создание утилиты

```typescript
// toolkit/src/my-util.ts

/**
 * Описание функции
 * @param value - входное значение
 * @returns результат
 */
export function myUtil(value: string): string {
  return value.trim().toLowerCase()
}

/**
 * Проверка на null/undefined
 */
export function isNil(value: unknown): value is null | undefined {
  return value === null || value === undefined
}

/**
 * Guard для определённого типа
 */
export function isString(value: unknown): value is string {
  return typeof value === 'string'
}
```

### HTTP утилиты

```typescript
// toolkit/src/http.ts
import { createAxiosInstance } from './api'

/**
 * Создание настроенного Axios экземпляра
 */
export function createAxiosDefaults(baseURL: string) {
  const instance = createAxiosInstance(baseURL)
  
  instance.defaults.headers.common['Content-Type'] = 'application/json'
  instance.defaults.timeout = 30000
  
  return instance
}
```

### Форматирование

```typescript
// toolkit/src/format.ts

export function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i]
}

export function formatNumber(num: number, locale = 'ru-RU'): string {
  return new Intl.NumberFormat(locale).format(num)
}
```

### Обновление toolkit

```typescript
// После добавления утилиты, экспортируй её

// toolkit/src/index.ts
export * from './my-util'
export * from './format'
export * from './date'
// ... и т.д.
```

---

## @wcsc/models

API модели для взаимодействия с бэкендом.

### Структура

```
models/
└── src/
    ├── index.ts
    ├── user/
    │   ├── index.ts
    │   ├── user.api.ts
    │   └── user.types.ts
    ├── dataset/
    │   └── ...
    └── ...
```

### Создание API модели

**Шаг 1:** Определи типы

```typescript
// models/src/dataset/dataset.types.ts
export interface Dataset {
  id: number
  name: string
  description: string | null
  source: DatasetSource
  status: DatasetStatus
  format: DatasetFormat
  subset: DatasetSubset
  modality: DatasetModality
  size: number | null
  asset_count: number
  annotation_count: number
  annotated_percent: number
  created_date: string
}

export type DatasetSource = 'cvat' | 'manual'
export type DatasetStatus = 'uploaded' | 'processing' | 'ready' | 'error'
export type DatasetFormat = 'coco' | 'yolo' | 'voc'
export type DatasetSubset = 'train' | 'valid' | 'test'
export type DatasetModality = 'rgb' | 'multispectral' | 'thermal'
```

**Шаг 2:** Создай API функции

```typescript
// models/src/dataset/dataset.api.ts
import { http } from '@wcsc/system' // или из infra

export interface DatasetListParams {
  page?: number
  page_size?: number
  source?: DatasetSource
  status?: DatasetStatus
}

export interface PaginatedResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

export async function getDatasets(
  params?: DatasetListParams
): Promise<PaginatedResponse<Dataset>> {
  const response = await http.get('/datasets/', { params })
  return response.data
}

export async function getDataset(id: number): Promise<Dataset> {
  const response = await http.get(`/datasets/${id}/`)
  return response.data
}

export async function createDataset(
  data: Partial<Dataset>
): Promise<Dataset> {
  const response = await http.post('/datasets/', data)
  return response.data
}
```

**Шаг 3:** Создай React Query hooks (опционально)

```typescript
// models/src/dataset/dataset.hooks.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getDatasets, getDataset, createDataset } from './dataset.api'

export function useDatasets(params?: DatasetListParams) {
  return useQuery({
    queryKey: ['datasets', params],
    queryFn: () => getDatasets(params),
  })
}

export function useDataset(id: number | null) {
  return useQuery({
    queryKey: ['dataset', id],
    queryFn: () => getDataset(id!),
    enabled: !!id,
  })
}

export function useCreateDataset() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: createDataset,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['datasets'] })
    },
  })
}
```

**Шаг 4:** Barrel export

```typescript
// models/src/dataset/index.ts
export * from './dataset.types'
export * from './dataset.api'
export * from './dataset.hooks'
```

**Шаг 5:** Главный экспорт

```typescript
// models/src/index.ts
export * from './user'
export * from './dataset'
// ... и т.д.

// Re-export всех hooks
export { useDatasets, useDataset, useCreateDataset } from './dataset'
```

### Session Interceptor

```typescript
// models/src/session.ts
import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import { getAccessToken } from '@wcsc/system'

export function useSessionRequestInterceptor(
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig {
  const token = getAccessToken()
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  
  return config
}
```

---

## @wcsc/hooks

Переиспользуемые React хуки.

### Структура

```
hooks/
└── src/
    ├── index.ts
    ├── useMount.ts
    ├── useClickOutside.ts
    ├── useDebounce.ts
    └── ...
```

### Создание хука

```typescript
// hooks/src/useDebounce.ts
import { useState, useEffect } from 'react'

/**
 * Debounce хук для задержки обновления значения
 */
export function useDebounce<T>(value: T, delay = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}
```

### useMount

```typescript
// hooks/src/useMount.ts
import { useEffect } from 'react'

/**
 * Хук для выполнения кода при монтировании компонента
 */
export function useMount(callback: () => void | (() => void)): void {
  useEffect(() => {
    const cleanup = callback()
    return () => {
      if (typeof cleanup === 'function') {
        cleanup()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
```

### useClickOutside

```typescript
// hooks/src/useClickOutside.ts
import { useEffect, RefObject } from 'react'

/**
 * Хук для отслеживания клика вне элемента
 */
export function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T>,
  handler: (event: MouseEvent | TouchEvent) => void
): void {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return
      }
      handler(event)
    }

    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref, handler])
}
```

### Экспорт

```typescript
// hooks/src/index.ts
export { useMount } from './useMount'
export { useDebounce } from './useDebounce'
export { useClickOutside } from './useClickOutside'
// ... и т.д.
```

---

## @wcsc/system

Системные константы и конфигурация.

### Структура

```
system/
└── src/
    ├── index.ts
    └── constants.ts
```

### Константы

```typescript
// system/src/index.ts
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export const APP_NAME = 'PAPS'
export const APP_VERSION = '1.0.0'
```

```typescript
// system/src/constants.ts

// API endpoints
export const API_ENDPOINTS = {
  DATASETS: '/datasets/',
  MODELS: '/models/',
  TRAINING: '/training/',
  USERS: '/users/',
} as const

// Storage keys
export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  USER: 'user_data',
} as const

// Date formats
export const DATE_FORMATS = {
  SHORT: 'DD.MM.YYYY',
  LONG: 'DD.MM.YYYY HH:mm',
  ISO: 'YYYY-MM-DDTHH:mm:ss',
} as const
```

---

## @wcsc/types

Общие типы, используемые в проекте.

### Структура

```
types/
└── src/
    ├── index.ts
    ├── entity.ts      # Базовые типы сущностей
    ├── api.ts         # API типы
    └── utils.ts       # Utility типы
```

### Базовые типы

```typescript
// types/src/entity.ts

export interface BaseEntity {
  id: number
  created_date: string
  updated_date: string
}

export interface Timestamped {
  created_date: string
  updated_date: string
}

export interface Pagination {
  count: number
  next: string | null
  previous: string | null
}

export interface PaginationParams {
  page?: number
  page_size?: number
}
```

### Utility типы

```typescript
// types/src/utils.ts

export type Maybe<T> = T | null | undefined

export type Nullable<T> = T | null

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export type AsyncReturnType<T extends (...args: any) => Promise<any>> =
  T extends (...args: any) => Promise<infer R> ? R : any
```

---

## @wcsc/href

Утилиты для работы с роутингом и URL.

### Структура

```
href/
└── src/
    ├── index.ts
    └── routes.ts
```

### Роуты

```typescript
// href/src/routes.ts

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  
  DATASETS: '/datasets',
  DATASET_DETAIL: (id: number) => `/datasets/${id}`,
  DATASET_ASSETS: (id: number) => `/datasets/${id}/assets`,
  
  MODELS: '/models',
  MODEL_DETAIL: (id: number) => `/models/${id}`,
  
  TRAININGS: '/trainings',
  TRAINING_DETAIL: (id: number) => `/trainings/${id}`,
  TRAINING_CREATE: '/trainings/create',
} as const

// Helper для генерации хлебных крошек
export const ROUTE_LABELS = {
  [ROUTES.HOME]: 'Дашборд',
  [ROUTES.DATASETS]: 'Датасеты',
  [ROUTES.MODELS]: 'Модели',
  [ROUTES.TRAININGS]: 'Обучения',
} as const
```

---

## Конфигурация

### typescript-config

```json
// typescript-config/base.json
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "display": "Default",
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "jsx": "react-jsx",
    "strict": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "noEmit": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "allowSyntheticDefaultImports": true
  },
  "exclude": ["node_modules", "dist"]
}
```

### eslint-config

```javascript
// eslint-config/base.js
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
})

export default [
  ...compat.extends('next/core-web-vitals', 'plugin:@typescript-eslint/recommended'),
  {
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
]
```

---

## Build и публикация

### Build пакета

```bash
cd packages/my-package
pnpm build
```

### Публикация (если нужно)

```bash
cd packages/my-package
pnpm publish
```

### Использование в apps

```bash
# Установка в приложении происходит автоматически через workspace
# Просто добавляем в package.json приложения зависимость

# apps/web/package.json
{
  "dependencies": {
    "@wcsc/my-package": "workspace:*"
  }
}
```

### Версионирование

```bash
# Обновление версии всех пакетов
pnpm version

# Обновление конкретного пакета
pnpm --filter @wcsc/my-package version patch
```

---

## Checklist для нового пакета

- [ ] Создана структура директорий
- [ ] Настроен package.json с правильным name (@wcsc/*)
- [ ] Настроен tsconfig.json с extends
- [ ] Настроен tsup.config.ts
- [ ] Создан src/index.ts с barrel export
- [ ] Написаны JSDoc комментарии
- [ ] Добавлены типы для экспортов
- [ ] Проверить build
- [ ] Добавлен в workspace (если нужно пересобрать)
