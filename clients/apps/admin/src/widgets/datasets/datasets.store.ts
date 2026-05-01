import { createModelListApi } from '~infra/lib/api'
import { IDataset } from '~models/dataset'

export interface DatasetFilter {
  page: number
  page_size: number
  view: 'table' | 'grid'
  subset?: string
  source?: string
  status?: string
  search?: string
}

export const {
  setCount,
  setList,
  setFilter,
  setLoading,
  setError,
  reset,
  changeQueryFromInput,
  toggleChecked,
  clearChecked,
  $store,
  fetchFx,
} = createModelListApi<IDataset, DatasetFilter>({
  name: 'datasets',
  defaultFilter: {
    page_size: 25,
    page: 1,
    view: 'table',
  },
  fetchFn: async () => ({ count: 0, next: null, previous: null, results: [] }),
  queryKey: ['datasets'],
})
