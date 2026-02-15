import { useUnit } from 'effector-react'

import { $store } from './assets.store'

export const useAssetsStore = () => useUnit($store)
