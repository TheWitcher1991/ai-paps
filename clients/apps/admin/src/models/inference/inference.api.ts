import { http } from '~infra/http'
import { createReadonlyInferenceApi, IInference } from '@wcsc/models'

const { useInference, useInferences, useInfinitInferences } = createReadonlyInferenceApi(http)

export { useInference, useInferences, useInfinitInferences }
export type { IInference }
