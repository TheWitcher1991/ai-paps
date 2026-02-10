import { useUnit } from 'effector-react'

import { $store } from './requests.store'

export const useRequestsStore = () => useUnit($store)
