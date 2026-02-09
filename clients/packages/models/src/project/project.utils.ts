import { ProjectID } from './project.types'

export const toProjectID = (id: number | string): ProjectID => Number(id) as ProjectID
