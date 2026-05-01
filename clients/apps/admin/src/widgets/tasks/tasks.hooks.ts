import { useStore } from 'effector-react'
import { $store, setList, setCount, setFilter, setLoading, setError } from './tasks.store'

export function useTasksStore() { return useStore($store) }
export { $store, setList, setCount, setFilter, setLoading, setError }
