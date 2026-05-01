import { useStore } from 'effector-react'
import { $store, setList, setCount, setFilter, setLoading, setError } from './assets.store'

export function useAssetsStore() { return useStore($store) }
export { $store, setList, setCount, setFilter, setLoading, setError }
