import { http } from '~infra/http'

import { createReadonlyUserApi } from '@wcsc/models'

const { useUser, useInfinitUsers, useUsers } = createReadonlyUserApi(http)

export { useUser, useInfinitUsers, useUsers }
