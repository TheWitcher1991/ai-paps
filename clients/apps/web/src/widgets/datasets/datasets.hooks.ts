import { useUnit } from 'effector-react'

import { $store } from './datasets.store'

export const useDatasetsStore = () => useUnit($store)
