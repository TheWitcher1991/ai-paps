import { JobDatasetButton, JobViewButton } from '~models/job'

import { Actions } from '~infra/ui'

import { WithJob } from '@wcsc/models'

export const JobActions = ({ job }: WithJob) => {
	return (
		<Actions>
			<JobViewButton job={job} onlyIcon={true} />
			<JobDatasetButton job={job} onlyIcon={true} />
		</Actions>
	)
}
