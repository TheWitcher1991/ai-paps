import { http } from '~infra/http'

import { createProjectActionApi, createReadonlyProjectApi } from '@wcsc/models'

const { useProject, useInfinitProjects, useProjects } =
	createReadonlyProjectApi(http)

const { useProjectExport, useProjectRequest } = createProjectActionApi(http)

export {
	useProject,
	useProjects,
	useInfinitProjects,
	useProjectExport,
	useProjectRequest,
}
