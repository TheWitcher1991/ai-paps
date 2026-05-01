import { http } from '~infra/http'
import { createReadonlyRequestApi, IRequest } from '@wcsc/models'

const { useRequest, useInfinitRequests, useRequests } = createReadonlyRequestApi(http)

export { useRequest, useInfinitRequests, useRequests }
export type { IRequest }
