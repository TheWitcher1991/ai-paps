import { http } from '~infra/http'

import { createReadonlyRequestApi } from '@wcsc/models'

const { useRequest, useInfinitRequests, useRequests } =
	createReadonlyRequestApi(http)

export { useRequest, useInfinitRequests, useRequests }
