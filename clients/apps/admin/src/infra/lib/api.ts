import { createStore, createEvent, createEffect, sample } from 'effector'
import { useQuery, useInfiniteQuery } from '@tanstack/react-query'

export interface ListFilter {
  page?: number
  page_size?: number
}

export interface ListState<T, F extends ListFilter = ListFilter> {
  count: number
  list: T[]
  checked: Set<string | number>
  error: Error | null
  loading: boolean
  filter: F
}

export interface PaginatedResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

export interface ModelListApiOptions<T, F extends ListFilter = ListFilter> {
  name: string
  defaultFilter: F
  fetchFn: (filter: F) => Promise<PaginatedResponse<T>>
  queryKey: string | string[]
}

/**
 * Фабрика для создания API лист-моделей (Effector store + React Query)
 */
export function createModelListApi<T, F extends ListFilter = ListFilter>(
  options: ModelListApiOptions<T, F>,
) {
  const { name, defaultFilter, fetchFn, queryKey } = options

  // Events
  const setCount = createEvent<number>()
  const setList = createEvent<T[]>()
  const setFilter = createEvent<Partial<F>>()
  const setLoading = createEvent<boolean>()
  const setError = createEvent<Error | null>()
  const reset = createEvent()
  const changeQueryFromInput = createEvent<string>()
  const toggleChecked = createEvent<string | number>()
  const clearChecked = createEvent()

  // Store
  const $store = createStore<ListState<T, F>>({
    count: 0,
    list: [],
    checked: new Set(),
    error: null,
    loading: false,
    filter: defaultFilter,
  })
    .on(setCount, (state, count) => ({ ...state, count }))
    .on(setList, (state, list) => ({ ...state, list }))
    .on(setFilter, (state, filter) => ({
      ...state,
      filter: { ...state.filter, ...filter },
    }))
    .on(setLoading, (state, loading) => ({ ...state, loading }))
    .on(setError, (state, error) => ({ ...state, error }))
    .on(reset, () => ({
      count: 0,
      list: [],
      checked: new Set(),
      error: null,
      loading: false,
      filter: defaultFilter,
    }))
    .on(toggleChecked, (state, id) => {
      const checked = new Set(state.checked)
      if (checked.has(id)) {
        checked.delete(id)
      } else {
        checked.add(id)
      }
      return { ...state, checked }
    })
    .on(clearChecked, (state) => ({ ...state, checked: new Set() }))

  // Effect
  const fetchFx = createEffect(async (filter: F) => {
    setLoading(true)
    try {
      const result = await fetchFn(filter)
      setList(result.results)
      setCount(result.count)
      setError(null)
      return result
    } catch (error) {
      setError(error as Error)
      throw error
    } finally {
      setLoading(false)
    }
  })

  // Sample: fetch on filter change
  sample({
    clock: $store.map((s) => s.filter),
    source: $store.map((s) => s.filter),
    fn: (filter) => filter,
    target: fetchFx,
  })

  return {
    $store,
    setCount,
    setList,
    setFilter,
    setLoading,
    setError,
    reset,
    changeQueryFromInput,
    toggleChecked,
    clearChecked,
    fetchFx,
  }
}

/**
 * React Query hook для бесконечной пагинации
 */
export function createInfiniteQueryHook<T, F extends ListFilter>(
  queryKey: string[],
  fetchFn: (filter: F) => Promise<PaginatedResponse<T>>,
  defaultFilter: F,
) {
  return function useInfiniteEntities(filter?: Partial<F>) {
    const mergedFilter = { ...defaultFilter, ...filter }

    return useInfiniteQuery({
      queryKey: [...queryKey, mergedFilter],
      queryFn: ({ pageParam = 1 }) =>
        fetchFn({ ...mergedFilter, page: pageParam as number }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        if (lastPage.next) {
          const url = new URL(lastPage.next)
          return parseInt(url.searchParams.get('page') || '1', 10)
        }
        return undefined
      },
    })
  }
}

/**
 * React Query hook для одного entity
 */
export function createEntityQueryHook<T>(
  queryKeyPrefix: string,
  fetchFn: (id: number) => Promise<T>,
) {
  return function useEntity(id: number | null) {
    return useQuery({
      queryKey: [queryKeyPrefix, id],
      queryFn: () => fetchFn(id!),
      enabled: !!id,
    })
  }
}
