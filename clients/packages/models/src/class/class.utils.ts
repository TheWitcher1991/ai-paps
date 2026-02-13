import { ClassID } from './class.types'

export const toClassID = (id: number | string): ClassID => Number(id) as ClassID
