# AI Developer Guide: Admin App (clients/apps/admin)

## Обзор

Это админ-приложение AI-PAPS — полный аналог `clients/apps/web`, но на **Shadcn UI + Tailwind CSS** вместо Gravity UI.

### Стек

| Технология | Версия | Назначение |
|------------|--------|-----------|
| Next.js | 16.1.1 | Framework |
| React | 19.1.1 | UI |
| TypeScript | 5.9.2 | Типизация |
| Tailwind CSS | 4.1.10 | Стилизация |
| Shadcn UI | - | UI компоненты (Radix-based) |
| lucide-react | - | Иконки |
| Effector | 23.4.2 | Client State |
| React Query | 5.90.16 | Server State |
| React Hook Form | 7.62.0 | Формы |
| Valibot | 1.2.0 | Валидация |

### Цветовая схема

| Токен | Значение |
|-------|----------|
| brand | `#00C56D` |
| brand-hover | `#01B263` |
| background | `#060709` |
| card | `#101214` |
| border | `#1e2022` |
| input-bg | `#151618` |
| font | Jost (Google Fonts) |

### Структура проекта

```
apps/admin/
├── src/
│   ├── app/              # App Router страницы
│   │   ├── (auth)/       # Auth группа (login)
│   │   ├── workspace/    # Основное приложение
│   │   ├── layout.tsx    # Root layout
│   │   └── page.tsx      # Главная (redirect)
│   ├── features/         # Feature-компоненты
│   ├── models/          # API модели и типы
│   ├── widgets/         # Переиспользуемые виджеты
│   └── infra/           # Инфраструктура
│       ├── http/        # Axios instance
│       ├── providers/   # React providers
│       ├── system/      # Системные константы
│       ├── ui/          # UI примитивы (Shadcn-style)
│       └── lib/         # Утилиты (api, handlers, data-loader)
├── package.json
├── tsconfig.json
├── next.config.ts
└── postcss.config.mjs
```

### Path Aliases

```json
{
  "paths": {
    "~/*": ["./src/*"],
    "~widgets/*": ["./src/widgets/*"],
    "~features/*": ["./src/features/*"],
    "~models/*": ["./src/models/*"],
    "~infra/*": ["./src/infra/*"]
  }
}
```

## Запуск

```bash
cd clients
pnpm --filter admin dev    # http://localhost:3001
pnpm --filter admin build:admin
```

## UI Компоненты

### Базовые (infra/ui/)

| Компонент | Описание |
|-----------|----------|
| `Container` | Обёртка с max-w-7xl |
| `PageTitle` | Заголовок страницы + subtitle + action |
| `Group` | Flex-контейнер с gap-4 |
| `ValueCard` | Карточка метрики (value + title + icon) |
| `Placeholder` | Empty state |
| `FormCard` | Карточка формы |
| `FormSection` | Секция формы с label |
| `Actions` | Контейнер для кнопок действий |
| `ActionButton` | Кнопка с иконкой (ghost/destructive/outline) |
| `Skeleton` | Загрузка-скелетон |
| `Divider` | Горизонтальный разделитель |
| `Flex` | Flex-утилита |
| `Breadcrumbs` | Хлебные крошки |
| `Table` | Полная таблица (Header, Body, Row, Head, Cell) |
| `MetaList` | Список метаданных с иконками |
| `Cell` | Ячейка с иконкой + текст |

### Стили компонентов

Все UI компоненты используют Tailwind CSS классы через `cn()` утилиту:

```tsx
import { cn } from '~infra/ui/lib/utils'

export function MyComponent({ className }: { className?: string }) {
  return (
    <div className={cn(
      'rounded-lg border border-border bg-card p-4',
      'hover:bg-accent transition-colors',
      className,
    )}>
      {/* content */}
    </div>
  )
}
```

## Создание виджета

```
widgets/my-widget/
├── index.ts              # Barrel export
├── my-widget.tsx         # Основной компонент
├── my-widget.store.ts    # Effector store
├── my-widget.hooks.ts    # useUnit хуки
└── components/           # Дочерние компоненты
    ├── my-widget-filter.tsx
    ├── my-widget-pagination.tsx
    └── my-widget-table.tsx
```

### Store pattern

```typescript
import { createModelListApi } from '~infra/lib/api'
import { IMyEntity } from '~models/my-entity'

export interface MyEntityFilter {
  page: number
  page_size: number
  search?: string
}

export const {
  $store,
  setList,
  setCount,
  setFilter,
  setLoading,
  setError,
  fetchFx,
} = createModelListApi<IMyEntity, MyEntityFilter>({
  name: 'my-entities',
  defaultFilter: { page_size: 25, page: 1 },
  fetchFn: async (filter) => { /* API call */ },
  queryKey: ['my-entities'],
})
```

## Состояние миграции

Полное состояние: `docs/migration-state.json`

Ключевые файлы:
- `clients/apps/admin/` — новое приложение
- `clients/apps/web/` — оригинал (Gravity UI)
