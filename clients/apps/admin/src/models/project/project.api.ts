import { http } from '~infra/http'
import { createReadonlyProjectApi, createProjectActionApi, IProject } from '@wcsc/models'

const { useProject, useProjects, useInfinitProjects } = createReadonlyProjectApi(http)
const { useProjectExport, useProjectRequest } = createProjectActionApi(http)

export { useProject, useProjects, useInfinitProjects, useProjectExport, useProjectRequest }
export type { IProject }
