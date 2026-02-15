import {
	enum as _enum,
	any,
	BaseSchema,
	custom,
	maxLength,
	minLength,
	minValue,
	number,
	object,
	ObjectEntries,
	ObjectSchema,
	optional,
	parseJson,
	pipe,
	regex,
	string,
	transform,
	url,
} from 'valibot'

import { Branded, MergeObjectEntries } from '@wcsc/types'

import { regexPatterns } from './regex'

export function vBrand<T, B extends string>(
	schema: BaseSchema<T, any, any>,
	_brand: B,
) {
	return pipe(
		schema,
		transform((val): Branded<T, B> => val as Branded<T, B>),
	)
}

export function merge<Schemas extends ObjectSchema<any, any>[]>(
	...schemas: Schemas
): ObjectSchema<MergeObjectEntries<Schemas>, never> {
	const mergedEntries = schemas.reduce((acc, schema) => {
		return { ...acc, ...schema.entries }
	}, {} as any)

	return object(mergedEntries as ObjectEntries) as ObjectSchema<
		MergeObjectEntries<Schemas>,
		never
	>
}

export const vShape = {
	id: pipe(number(), minValue(1)),
	order: pipe(number(), minValue(1)),
	enum: (enum__: any) => _enum(enum__),
	optional: (wrapped: any) => optional(wrapped),
	json: pipe(string(), parseJson(), any()),
	datetime: pipe(
		string(),
		custom(val => !Number.isNaN(Date.parse(val)), 'Неверный формат даты'),
	),
	decimal: pipe(string(), regex(regexPatterns.decimal.value)),
	url: pipe(string(), url('Неверный URL')),
	title: pipe(string(), minLength(3), maxLength(255)),
	name: pipe(string(), minLength(3), maxLength(64)),
	description: pipe(string(), minLength(3), maxLength(3000)),
	phone: pipe(
		string(),
		regex(
			regexPatterns.russianPhone.value,
			regexPatterns.russianPhone.message,
		),
	),
	positive: pipe(
		string(),
		regex(regexPatterns.positive.value, regexPatterns.positive.message),
	),
}

export const BaseModel = object({
	id: vShape.id,
	created_date: vShape.datetime,
	updated_date: vShape.datetime,
})
