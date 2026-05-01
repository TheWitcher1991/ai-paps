'use client'

import { useEffect } from 'react'
import { useUnit } from 'effector-react'
import { useDatasets } from '~models/dataset'
import { $store, setList, setCount, setLoading, setError } from '~widgets/datasets/datasets.store'
import { DatasetsFilter, DatasetsPagination, DatasetsTable, DatasetsGrid } from '~features/dataset'
import { DataLoader } from '~infra/lib/data-loader'

export function DatasetsWidget() {
  const { list, loading, error, filter } = useUnit($store)
  const { data, isLoading, isFetching } = useDatasets({
    page: filter.page,
    page_size: filter.page_size,
  } as any)

  useEffect(() => {
    if (data?.data) {
      setList(data.data.results)
      setCount(data.data.count)
    }
  }, [data])

  useEffect(() => {
    setLoading(isLoading || isFetching)
  }, [isLoading, isFetching])

  return (
    <div className="flex flex-col gap-4">
      <DatasetsFilter />

      <DataLoader
        loading={loading}
        error={error}
        empty={list.length === 0}
        emptyFallback={
          <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-border bg-card py-12 text-center">
            <p className="text-lg font-medium text-muted-foreground">Нет датасетов</p>
            <p className="text-sm text-muted-foreground/60">
              Создайте или импортируйте датасет для начала работы
            </p>
          </div>
        }
      >
        {filter.view === 'grid' ? (
          <DatasetsGrid datasets={list as any} />
        ) : (
          <DatasetsTable datasets={list as any} />
        )}
      </DataLoader>

      <DatasetsPagination />
    </div>
  )
}
