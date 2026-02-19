import { useUnit } from 'effector-react'

import { $store } from './models.store'

export const useModelsStore = () => useUnit($store)
