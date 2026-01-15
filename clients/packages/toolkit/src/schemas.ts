import { z, ZodTypeAny } from 'zod'

import {
	AUDIO_FILE_TYPES,
	IMAGE_FILE_TYPES,
	MEDIA_FILE_TYPES,
	VIDEO_FILE_TYPES,
} from '@fgis/system'
import { Branded } from '@fgis/types'

import { formatFileSize } from './format'
import { regexPatterns } from './regex'

export const buildFileShape = (
	fileUploads: string[],
	video_upload_size_md: number = 10,
) => {
	return z
		.instanceof(File, {
			message: 'Пожалуйста, выберите файл',
		})
		.refine(file => fileUploads.includes(file.type), {
			message: `Неверный тип файла. Разрешены: ${fileUploads.join(', ')}`,
		})
		.refine(file => file.size <= video_upload_size_md * 1024 * 1024, {
			message: `Размер файла не должен превышать ${formatFileSize(video_upload_size_md, 'MB')}`,
		})
}

export function zBrand<T extends ZodTypeAny, B extends string>(
	schema: T,
	_brand: B,
): z.ZodEffects<T, Branded<z.infer<T>, B>> {
	return schema.transform(val => val as Branded<z.infer<T>, B>)
}

export const zShape = {
	id: z.number().positive().min(1),
	image: buildFileShape(IMAGE_FILE_TYPES, 5),
	audio: buildFileShape(AUDIO_FILE_TYPES, 2024),
	video: buildFileShape(VIDEO_FILE_TYPES, 5024),
	media: buildFileShape(MEDIA_FILE_TYPES, 5024),
	ids: z.number().positive().array(),
	uuid: z.string().uuid(),
	date: z.string().date(),
	datetime: z.string().datetime(),
	url: z.string().url({
		message: 'Неверный URL',
	}),
	choice: z.string().min(1, {
		message: 'Пожалуйста, выберите',
	}),
	order: z.number().positive().min(1),
	smallTitle: z
		.string()
		.min(3, {
			message: 'Должно быть не менее 3 символов',
		})
		.max(50, {
			message: 'Должно быть не более 50 символов',
		}),
	title: z
		.string({
			message: 'Поле не может быть пустым',
		})
		.min(3, {
			message: 'Должно быть не менее 3 символов',
		})
		.max(255, {
			message: 'Должно быть не более 255 символов',
		}),
	description: z
		.string({
			message: 'Поле не может быть пустым',
		})
		.min(10, {
			message: 'Должно быть не менее 10 символов',
		})
		.max(3000, {
			message: 'Должно быть не более 3000 символов',
		}),
	text: (minLength: number = 10, maxLength = 1000) =>
		z
			.string({
				message: `Поле не может быть пустым`,
			})
			.min(minLength, {
				message: `Должно быть не менее ${minLength} символов`,
			})
			.max(maxLength, {
				message: `Должно быть не более ${maxLength} символо'`,
			}),
	nullableText: z
		.string()
		.max(3000, {
			message: 'Должно быть не более 3000 символов',
		})
		.nullable(),
	telegram: z.string().min(2).max(50).startsWith('@'),
	email: z
		.string({
			message: 'Поле не может быть пустым',
		})
		.email({
			message: 'Неверный email',
		})
		.min(2)
		.max(50),
	name: z
		.string({
			message: 'Поле не может быть пустым',
		})
		.min(3, {
			message: 'Должно быть не менее 3 символов',
		})
		.max(50, {
			message: 'Должно быть не более 50 символов',
		}),
	password: z.string().min(8).max(255),
	positive: z
		.string({
			message: 'Поле не может быть пустым',
		})
		.regex(regexPatterns.positive.value, regexPatterns.positive.message),
	decimal: z
		.union([
			z
				.string()
				.regex(
					regexPatterns.decimal.value,
					regexPatterns.decimal.message,
				),
			z.number().positive({ message: 'Число должно быть больше 0' }),
		])
		.refine(
			val => {
				const n =
					typeof val === 'number'
						? val
						: Number(String(val).replace(',', '.'))
				return !Number.isNaN(n) && n > 0
			},
			{ message: 'Значение должно быть больше 0' },
		),
	phone: z
		.string()
		.regex(
			regexPatterns.russianPhone.value,
			regexPatterns.russianPhone.message,
		),
	yandexCloudVideo: z
		.string()
		.regex(
			regexPatterns.yandexCloudVideo.value,
			regexPatterns.yandexCloudVideo.message,
		),
	telegramUrl: z
		.string()
		.regex(
			regexPatterns.telegramUrl.value,
			regexPatterns.telegramUrl.message,
		),
	optional: (schema: ZodTypeAny) =>
		z.union([schema, z.literal(''), z.literal(null), z.undefined()]),
}