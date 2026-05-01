import { useStore } from 'effector-react'
import { $store, setList, setCount, setFilter, setLoading, setError } from './users.store'

export function useUsersStore() {
  return useStore($store)
}

export { $store, setList, setCount, setFilter, setLoading, setError }
