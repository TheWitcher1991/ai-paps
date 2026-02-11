import { JobActions } from '../job-actions'
import { useMemo } from 'react'

import { IJob } from '@wcsc/models'

export const useJobTableData = (jobs: IJob[]) =>
	useMemo(
		() =>
			jobs.map(job => ({
				actions: <JobActions job={job} />,
			})),
		[jobs],
	)
