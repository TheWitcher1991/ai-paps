import { ModelID } from './model.types'

export const toModelID = (id: number | string): ModelID => Number(id) as ModelID
