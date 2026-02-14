import type { AxiosError, AxiosResponse } from 'axios'
import React from 'react'
import type { ObjectSchema } from 'valibot'

declare const __brand: unique symbol

export type Branded<T, UniqueKey extends string> = T & { __brand: UniqueKey }

export type Nullable<T> = T | null

export type EnumType<T> = T[keyof T]

export type EmptyDictionary = Record<string, never>

export type Dictionary<T = unknown> = Record<string, T>

export type RequestResponse<T = unknown> = Promise<AxiosResponse<T>>

export type RequestError = AxiosError

export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never

export type Timeout = ReturnType<typeof setTimeout>

export type OrderDirection = 'ASC' | 'DESC'

export type LogLevel = 'log' | 'warn' | 'error'

export type ResourceType = 'datasets' | 'models' | 'users'

export type MergeObjectEntries<T extends ObjectSchema<any, any>[]> =
	UnionToIntersection<
		T[number] extends ObjectSchema<infer R, any> ? R : never
	>

export type InjectProps<
	Key extends string,
	Value,
	Extras extends Record<string, any> = {},
> = {
	[K in Key]: Value
} & Extras

export type OnUploadProgress = (
	progress: number,
	uploaded: number,
	total: number,
) => void

export interface ErrorObject {
	code: string
	message: string
	type: string
}

export type ErrorList = ErrorObject[]

export type ModelConfig<T extends string> = {
	model: T
	models: `${T}s`
	infiniteModels: `infinite-${T}s`
}

export interface UTMParams {
	source: string
	medium?: string
	campaign?: string
	content?: string
	term?: string
}

export interface Paginated<RESULTS = [], META = Record<string, any>> {
	count: number
	pages: number
	next: Nullable<string>
	previous: Nullable<string>
	meta: META
	results: RESULTS[]
}

export interface PaginationPageSize {
	page: number
	page_size: number
}

export interface PaginateQuery<
	ORDERING extends string = string,
> extends PaginationPageSize {
	search: string
	sort: ORDERING
}

export interface PagesListResponse<T> {
	pages: Paginated<T>[]
	pageParams: number[]
}

export type UnionToIntersection<U> = (
	U extends any ? (k: U) => void : never
) extends (k: infer I) => void
	? I
	: never

export type DetailedDivProps = React.DetailedHTMLProps<
	React.ButtonHTMLAttributes<HTMLDivElement>,
	HTMLDivElement
>

export type DetailedButtonProps = React.DetailedHTMLProps<
	React.ButtonHTMLAttributes<HTMLButtonElement>,
	HTMLButtonElement
>

export type DetailedInputProps = React.InputHTMLAttributes<HTMLInputElement>

export type DetailedSelectProps = React.DetailedHTMLProps<
	React.SelectHTMLAttributes<HTMLSelectElement>,
	HTMLSelectElement
>

export type DetailedLabelProps = React.DetailedHTMLProps<
	React.LabelHTMLAttributes<HTMLLabelElement>,
	HTMLLabelElement
>

export type DetailedTextareaProps = React.DetailedHTMLProps<
	React.TextareaHTMLAttributes<HTMLTextAreaElement>,
	HTMLTextAreaElement
>

export type ModelListField<T, U extends Dictionary<any>> = {
	count: number
	loading: boolean
	error: boolean
	fetching?: boolean
	list: T[]
	filter: U
	checked?: number[]
}

export type ModelListState<T, U extends Dictionary<any>> = {
	setCount: (count: number) => void
	setError: (error: boolean) => void
	setLoading: (loading: boolean) => void
	setFetching: (fetching: boolean) => void
	setChecked: (checked: number[]) => void
	setList: (list: T[]) => void
	setFilter: (filter: U) => void
	reset: () => void
} & ModelListField<T, U>
