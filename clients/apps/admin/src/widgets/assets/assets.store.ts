import { createModelListApi } from '~infra/lib/api'
import { IAsset } from '~models/asset'

export interface AssetFilter {
  page: number
  page_size: number
  view: 'table' | 'grid'
  dataset_id?: number
  search?: string
}

export const {
  setCount, setList, setFilter, setLoading, setError, reset,
  changeQueryFromInput, toggleChecked, clearChecked, $store, fetchFx,
} = createModelListApi<IAsset, AssetFilter>({
  name: 'assets',
  defaultFilter: { page_size: 25, page: 1, view: 'table' },
  fetchFn: async () => ({ count: 0, next: null, previous: null, results: [] }),
  queryKey: ['assets'],
})
