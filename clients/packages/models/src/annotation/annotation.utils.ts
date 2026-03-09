import { AnnotationView } from '../class'

import { AnnotationID } from './annotation.types'

export const toAnnotationID = (id: number | string): AnnotationID =>
	Number(id) as AnnotationID

export const getAnnotationColor = (view: AnnotationView) => {
	switch (view) {
		case AnnotationView.DISEASE: {
			return 'lab(48 77.44 61.55 / 0.3)'
		}
		case AnnotationView.PEST: {
			return 'lab(80 16.6 99.21 / 0.3)'
		}
		case AnnotationView.HEALTHY: {
			return 'lab(88 -79.26 80.99 / 0.3)'
		}
	}
}

export const getAnnotationStrokeColor = (view: AnnotationView) => {
	switch (view) {
		case AnnotationView.DISEASE: {
			return 'lab(48.4493% 77.4328 61.5452)'
		}
		case AnnotationView.PEST: {
			return 'lab(80.1641% 16.6016 99.2089)'
		}
		case AnnotationView.HEALTHY: {
			return 'lab(88 -79.26 80.99)'
		}
	}
}

export const getAnnotationActiveColor = (view: AnnotationView) => {
	switch (view) {
		case AnnotationView.DISEASE: {
			return 'lab(48 77.44 61.55 / 0.7)'
		}
		case AnnotationView.PEST: {
			return 'lab(80 16.6 99.21 / 0.7)'
		}
		case AnnotationView.HEALTHY: {
			return 'lab(88 -79.26 80.99 / 0.7)'
		}
	}
}
