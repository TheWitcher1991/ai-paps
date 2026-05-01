import { IDataset } from '@wcsc/models'
import { useUnit } from 'effector-react'
import { $store, setFilter } from '~widgets/datasets/datasets.store'
import { Input } from '~components/ui/input'
import { Button } from '~components/ui/button'
import { Search, X } from 'lucide-react'
import { useState, useEffect } from 'react'

export function DatasetsFilter() {
  const { filter } = useUnit($store)
  const [search, setSearch] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      setFilter({ search: search || undefined, page: 1 } as unknown as Parameters<typeof setFilter>[0])
    }, 500)
    return () => clearTimeout(timer)
  }, [search])

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Поиск датасетов..."
          className="pl-9"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search && (
          <button
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            onClick={() => setSearch('')}
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="flex gap-2">
        <Button
          variant={filter.view === 'table' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter({ view: 'table' })}
        >
          Таблица
        </Button>
        <Button
          variant={filter.view === 'grid' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter({ view: 'grid' })}
        >
          Сетка
        </Button>
      </div>
    </div>
  )
}
