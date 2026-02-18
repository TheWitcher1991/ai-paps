import { JobActions } from '../job-actions'
import { useMemo } from 'react'

import { IJob } from '@wcsc/models'
import { formatDateInRu } from '@wcsc/toolkit'

export const useJobTableData = (jobs: IJob[]) =>
	useMemo(
		() =>
			jobs.map(job => ({
				name: job.name,
				owner: job.owner.username,
				status: job.status,
				type: job.type,
				created_date: formatDateInRu(job.created_date),
				actions: <JobActions job={job} />,
			})),
		[jobs],
	)
