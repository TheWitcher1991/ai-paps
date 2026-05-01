import { http } from '~infra/http'
import { createReadonlyClassApi, IClass } from '@wcsc/models'

const { useClass, useInfinitClasses, UseClasses } = createReadonlyClassApi(http)

export { useClass, useInfinitClasses, UseClasses }
export type { IClass }
