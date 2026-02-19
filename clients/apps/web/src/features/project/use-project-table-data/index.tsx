import { ProjectActions } from '../project-actions'
import { useMemo } from 'react'

import { Indicator } from '~infra/ui'

import { IProject } from '@wcsc/models'
import { formatDateInRu } from '@wcsc/toolkit'

export const useProjectTableData = (projects: IProject[]) =>
	useMemo(
		() =>
			projects.map(project => ({
				name: project.name,
				owner: project.owner.username,
				status: project.status,
				tasks: <Indicator count={project.tasks.count} resource='tasks' />,
				created_date: formatDateInRu(project.created_date),
				actions: <ProjectActions project={project} />,
			})),
		[projects],
	)
