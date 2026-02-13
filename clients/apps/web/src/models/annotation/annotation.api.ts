import { http } from '~infra/http'

import { createReadonlyAnnotationApi } from '@wcsc/models'

const { useAnnotation, useInfinitAnnotations, useAnnotations } =
	createReadonlyAnnotationApi(http)

export { useAnnotation, useInfinitAnnotations, useAnnotations }
