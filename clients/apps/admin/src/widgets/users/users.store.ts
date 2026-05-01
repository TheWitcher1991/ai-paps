import { createModelListApi } from '~infra/lib/api'
import { IUser } from '~models/user'

export interface UserFilter {
  page: number
  page_size: number
  search?: string
  role?: string
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
} = createModelListApi<IUser, UserFilter>({
  name: 'users',
  defaultFilter: {
    page_size: 25,
    page: 1,
  },
  fetchFn: async () => ({ count: 0, next: null, previous: null, results: [] }),
  queryKey: ['users'],
})
