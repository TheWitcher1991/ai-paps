import { http } from '~infra/http'
import { createReadonlyUserApi, IUser } from '@wcsc/models'

const { useUser, useInfinitUsers, useUsers } = createReadonlyUserApi(http)

export { useUser, useInfinitUsers, useUsers }
export type { IUser }
