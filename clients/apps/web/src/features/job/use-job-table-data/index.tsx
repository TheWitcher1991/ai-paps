import { useMemo } from 'react'

import { IJob } from '@wcsc/models'

export const useJobTableData = (jobs: IJob[]) =>
	useMemo(() => jobs.map(job => ({})), [jobs])
