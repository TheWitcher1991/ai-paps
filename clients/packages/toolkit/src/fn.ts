import type { Branded, PagesListResponse, Paginated } from '@fgis/types'
import type { InfiniteData } from '@tanstack/react-query'
import type { AxiosResponse } from 'axios'

export const modelConfig = (alias: string) => ({
	model: alias,
	models: `${this.model}s`,
	infiniteModels: `infinite-${this.models}`,
})

export const openLink = (link: string, target?: string) => {
	window.open(link, target)
}

export const nullable = (value: any) => value === undefined || value === null || value?.trim() === '' ? undefined : value

export const stripTags = (inputString: string): string => {
	return inputString.replace(/<\/?[^>]+(>|$)/g, '')
}

export const pluralize = (
	count: number,
	one: string,
	few: string,
	many: string,
): string => {
	const mod10 = count % 10
	const mod100 = count % 100

	if (mod100 >= 11 && mod100 <= 14) {
		return `${count} ${many}`
	}
	if (mod10 === 1) {
		return `${count} ${one}`
	}
	if (mod10 >= 2 && mod10 <= 4) {
		return `${count} ${few}`
	}
	return `${count} ${many}`
}

export const splitId = (id?: number | Branded<any, any>, separator = ','): string[] => {
	if (!id) return []

	return id.toString().split(separator)
}

export const splitValue = (value?: string[], separator = ','): string => {
	if (!value || !value.length) return ''

	return value.join(separator)
}

type SelectPagesQuery<T> = InfiniteData<
	AxiosResponse<Paginated<T>, any>,
	number
>

export const selectPagesQuery = <T, M>({
	pages,
	pageParams,
}: SelectPagesQuery<T>): PagesListResponse<T> => ({
	pages: pages.map(page => page.data as Paginated<T>),
	pageParams,
})

export const calcPercent = (a: number, b: number) => {
	return Math.round((a * 100) / (b || 1))
}

export const isValidFileType = (file: File, types: string[]): boolean => {
	return types.includes(<string>file?.type)
}

export const isValidFileSize = (file: File, size_bytes: number): boolean => {
	return file.size <= size_bytes
}

export function trimText(text: string, length?: number) {
	if (!text || !length || text.length <= length) {
		return text
	}

	return `${text.substring(0, length)}...`
}


export const prepareRequestParams = <T extends Record<string, any>>(
	params?: T,
): Record<string, any> => {
	if (!params) return undefined

	return params
		? Object.fromEntries(
			Object.entries(params).map(([key, value]) =>
				Array.isArray(value)
					? [key, value.join(',')]
					: [key, value],
			),
		)
		: {}
}

export const mergeRefs = (...inputRefs) => {
	return ref => {
		inputRefs.forEach(inputRef => {
			if (!inputRef) {
				return
			}

			if (typeof inputRef === 'function') {
				inputRef(ref)
			} else {
				inputRef.current = ref
			}
		})
	}
}