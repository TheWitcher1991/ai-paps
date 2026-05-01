import { useStore } from 'effector-react'
import { $store, setList, setCount, setFilter, setLoading, setError } from './trainings.store'

export function useTrainingsStore() {
  return useStore($store)
}

export { $store, setList, setCount, setFilter, setLoading, setError }
