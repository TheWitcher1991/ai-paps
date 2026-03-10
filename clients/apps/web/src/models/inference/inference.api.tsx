import { http } from '~infra/http'

import { createInferenceApi } from '@wcsc/models'

export const {
	useInference,
	useInfinityInferences,
	useInferences,
	useCreateInference,
	useUpdateInference,
} = createInferenceApi(http)
