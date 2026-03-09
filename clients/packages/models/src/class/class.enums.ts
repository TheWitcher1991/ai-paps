import { EnumType } from '@wcsc/types'

export const ClassCon = {
	leaf: 'leaf',
	stem: 'stem',
	flower: 'flower',
	fruit: 'fruit',

	tomato_leaf: 'tomato_leaf',
	tomato_stem: 'tomato_stem',
	tomato_root: 'tomato_root',
	tomato_flower: 'tomato_flower',
	tomato_bud: 'tomato_bud',
	tomato_fruit: 'tomato_fruit',
	tomato_plant: 'tomato_plant',
	tomato_petiole: 'tomato_petiole',

	tomato_powdery_mildew: 'tomato_powdery_mildew',

	tomato_powdery_mildew_severity_1: 'tomato_powdery_mildew_severity_1',
	tomato_powdery_mildew_severity_2: 'tomato_powdery_mildew_severity_2',
	tomato_powdery_mildew_severity_3: 'tomato_powdery_mildew_severity_3',
	tomato_powdery_mildew_severity_4: 'tomato_powdery_mildew_severity_4',
	tomato_powdery_mildew_severity_5: 'tomato_powdery_mildew_severity_5',
	tomato_powdery_mildew_severity_6: 'tomato_powdery_mildew_severity_6',
	tomato_powdery_mildew_severity_7: 'tomato_powdery_mildew_severity_7',
	tomato_powdery_mildew_severity_8: 'tomato_powdery_mildew_severity_8',

	powdery_mildew: 'powdery_mildew',

	powdery_mildew_severity_1: 'powdery_mildew_severity_1',
	powdery_mildew_severity_2: 'powdery_mildew_severity_2',
	powdery_mildew_severity_3: 'powdery_mildew_severity_3',
	powdery_mildew_severity_4: 'powdery_mildew_severity_4',
	powdery_mildew_severity_5: 'powdery_mildew_severity_5',
	powdery_mildew_severity_6: 'powdery_mildew_severity_6',
	powdery_mildew_severity_7: 'powdery_mildew_severity_7',
	powdery_mildew_severity_8: 'powdery_mildew_severity_8',
} as const

export type ClassCon = EnumType<typeof ClassCon>

export const AnnotationView = {
	DISEASE: 'disease',
	PEST: 'pest',
	HEALTHY: 'healthy',
} as const

export type AnnotationView = EnumType<typeof AnnotationView>
