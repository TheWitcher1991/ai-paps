import { http } from '~infra/http'

import { createReadonlyClassApi } from '@wcsc/models'

const { useClass, useInfinitClasses, UseClasses } = createReadonlyClassApi(http)

export { useClass, useInfinitClasses, UseClasses }
