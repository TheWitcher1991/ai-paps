import { http } from '~infra/http'

import { createReadonlyModelApi } from '@wcsc/models'

const { useModel, useInfinitModels, useModels } = createReadonlyModelApi(http)

export { useModel, useInfinitModels, useModels }
