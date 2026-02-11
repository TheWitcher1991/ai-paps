import {
	createActionApi,
	createApi,
	createReadonlyApi,
	CrudRepository,
	HttpClientInstance,
	ReadonlyRepository,
} from '@wcsc/toolkit'
import { Paginated } from '@wcsc/types'

import { projectConfig } from './project.config'
import {
	ICreateProject,
	IProject,
	IUpdateProject,
	ProjectID,
	UseProjects,
} from './project.types'

export const createReadonlyProjectRepository = (http: HttpClientInstance) =>
	new ReadonlyRepository<
		Paginated<IProject>,
		IProject,
		UseProjects,
		ProjectID
	>(http, projectConfig.models)

export const createProjectRepository = (http: HttpClientInstance) =>
	new CrudRepository<
		Paginated<IProject>,
		IProject,
		ICreateProject,
		IUpdateProject,
		UseProjects,
		ProjectID
	>(http, projectConfig.models)

export const createReadonlyProjectApi = (http: HttpClientInstance) => {
	const api = createReadonlyApi<
		Paginated<IProject>,
		IProject,
		UseProjects,
		ProjectID
	>(http, {
		list: projectConfig.models,
		detail: projectConfig.model,
		infinity: projectConfig.infiniteModels,
	})

	return {
		useProjects: api.useEntities,
		useProject: api.useEntity,
		useInfinitProjects: api.useInfinityEntities,
		projectRepository: api.repo,
	}
}

export const createProjectApi = (http: HttpClientInstance) => {
	const api = createApi<
		Paginated<IProject>,
		IProject,
		ICreateProject,
		IUpdateProject,
		UseProjects,
		ProjectID
	>(http, {
		list: projectConfig.models,
		detail: projectConfig.model,
		infinity: projectConfig.infiniteModels,
	})

	return {
		useProjects: api.useEntities,
		useProject: api.useEntity,
		useInfinityProjects: api.useInfinityEntities,
		useCreateProject: api.useCreateEntity,
		useUpdateProject: api.useUpdateEntity,
		useDeleteProject: api.useDeleteEntity,
		projectRepository: api.repo,
	}
}

export const createProjectActionApi = (http: HttpClientInstance) => {
	const api = createActionApi<ProjectID>(http, {
		list: projectConfig.models,
		detail: projectConfig.model,
		infinity: projectConfig.infiniteModels,
	})

	return {
		useProjectExport: api.useExport,
		useProjectRequest: api.useRequest,
		projectActionRepository: api.repo,
	}
}
