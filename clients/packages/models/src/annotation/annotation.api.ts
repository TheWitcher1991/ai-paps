import {
	createReadonlyApi,
	HttpClientInstance,
	ReadonlyRepository,
} from '@wcsc/toolkit'
import { Paginated } from '@wcsc/types'

import { annotationConfig } from './annotation.config'
import { AnnotationID, IAnnotation, UseAnnotations } from './annotation.types'

export const createReadonlyAnnotationRepository = (http: HttpClientInstance) =>
	new ReadonlyRepository<
		Paginated<IAnnotation>,
		IAnnotation,
		UseAnnotations,
		AnnotationID
	>(http, annotationConfig.models)

export const createReadonlyAnnotationApi = (http: HttpClientInstance) => {
	const api = createReadonlyApi<
		Paginated<IAnnotation>,
		IAnnotation,
		UseAnnotations,
		AnnotationID
	>(http, {
		list: annotationConfig.models,
		detail: annotationConfig.model,
		infinity: annotationConfig.infiniteModels,
	})

	return {
		useAnnotations: api.useEntities,
		useAnnotation: api.useEntity,
		useInfinitAnnotations: api.useInfinityEntities,
		annotationRepository: api.repo,
	}
}
