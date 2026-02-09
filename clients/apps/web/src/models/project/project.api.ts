import { http } from '~infra/http'

import { createReadonlyProjectApi } from '@wcsc/models'

const { useProject, useInfinitProjects, useProjects } =
	createReadonlyProjectApi(http)

export { useProject, useProjects, useInfinitProjects }
