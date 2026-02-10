import { InferOutput } from 'valibot'

import { Branded, InjectProps, PaginateQuery } from '@wcsc/types'

import { ProjectModel, WriteableProjectModel } from './project.model'

export type ProjectID = Branded<number, 'ProjectID'>

export type IProject = InferOutput<typeof ProjectModel>

export type ICreateProject = InferOutput<typeof WriteableProjectModel>

export type IUpdateProject = Partial<InferOutput<typeof WriteableProjectModel>>

export type WithProject = InjectProps<'tag', IProject>

export type WithProjectID = InjectProps<'tag', ProjectID>

export type UseProjects = PaginateQuery & {
	view?: string
}
