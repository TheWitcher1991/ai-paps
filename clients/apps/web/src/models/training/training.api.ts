import { http } from '~infra/http'

import { createTrainingApi } from '@wcsc/models'

export const {
	useTraining,
	useInfinitTrainings,
	useTrainings,
	useCreateTraining,
	useUpdateTraining,
} = createTrainingApi(http)
