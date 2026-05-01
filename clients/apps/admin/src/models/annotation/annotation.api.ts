import { http } from '~infra/http'
import { createReadonlyAnnotationApi, IAnnotation } from '@wcsc/models'

const { useAnnotation, useInfinitAnnotations, useAnnotations } = createReadonlyAnnotationApi(http)

export { useAnnotation, useInfinitAnnotations, useAnnotations }
export type { IAnnotation }
