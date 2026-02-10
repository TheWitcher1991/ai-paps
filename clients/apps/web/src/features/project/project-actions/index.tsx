import {
	ProjectDatasetButton,
	ProjectDeleteButton,
	ProjectViewButton,
} from '~models/project'

import { Actions } from '~infra/ui'

import { WithProject } from '@wcsc/models'

export const ProjectActions = ({ project }: WithProject) => {
	return (
		<Actions>
			<ProjectViewButton project={project} onlyIcon={true} />
			<ProjectDatasetButton project={project} onlyIcon={true} />
			<ProjectDeleteButton project={project} onlyIcon={true} />
		</Actions>
	)
}
