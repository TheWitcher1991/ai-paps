import { UserID } from './user.types'

export const toUserID = (id: number | string): UserID => Number(id) as UserID
