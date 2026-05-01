'use client'

import { ReactNode } from 'react'

export interface DataLoaderProps {
  loading?: boolean
  error?: Error | null
  empty?: boolean
  children: ReactNode
  fallback?: ReactNode
  errorFallback?: (error: Error, retry?: () => void) => ReactNode
  emptyFallback?: ReactNode
}

export function DataLoader({
  loading,
  error,
  empty,
  children,
  fallback,
  errorFallback,
  emptyFallback,
}: DataLoaderProps) {
  if (loading) {
    return <>{fallback ?? <DefaultLoader />}</>
  }

  if (error) {
    return (
      <>
        {errorFallback
          ? errorFallback(error, () => window.location.reload())
          : <DefaultError error={error} />}
      </>
    )
  }

  if (empty) {
    return <>{emptyFallback ?? <DefaultEmpty />}</>
  }

  return <>{children}</>
}

function DefaultLoader() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
    </div>
  )
}

function DefaultError({ error }: { error: Error }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
      <p className="text-lg font-medium text-destructive">Ошибка загрузки</p>
      <p className="text-sm text-muted-foreground">{error.message}</p>
      <button
        className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary-hover"
        onClick={() => window.location.reload()}
      >
        Повторить
      </button>
    </div>
  )
}

function DefaultEmpty() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
      <p className="text-lg font-medium text-muted-foreground">Нет данных</p>
      <p className="text-sm text-muted-foreground/60">
        Данные для отображения отсутствуют
      </p>
    </div>
  )
}
