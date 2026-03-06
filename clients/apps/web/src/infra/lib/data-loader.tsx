import {
	Detail,
	InternalError,
	NoSearchResults,
} from '@gravity-ui/illustrations'
import { Icon, PlaceholderContainer } from '@gravity-ui/uikit'
import { memo, PropsWithChildren, ReactNode } from 'react'
import { match } from 'ts-pattern'

interface DataLoaderProps extends PropsWithChildren {
	isLoading: boolean
	hasError?: boolean
	countData?: number | string
	loadingFallback?: ReactNode
	errorFallback?: ReactNode
	emptyFallback?: ReactNode
}

const DefaultLoadingFallback = memo(() => (
	<PlaceholderContainer
		title='Поиск данных...'
		size='m'
		align='center'
		image={<Icon data={Detail} size={120} />}
	/>
))

const DefaultErrorFallback = memo(() => (
	<PlaceholderContainer
		title='При загрузке данных произошла ошибка'
		size='m'
		align='center'
		image={<Icon data={InternalError} size={120} />}
	/>
))

const DefaultEmptyFallback = memo(() => (
	<PlaceholderContainer
		title='Ничего не нашлось'
		size='m'
		align='center'
		image={<Icon data={NoSearchResults} size={120} />}
	/>
))

export const DataLoader = ({
	isLoading,
	hasError = false,
	countData,
	children,
	loadingFallback = <DefaultLoadingFallback />,
	errorFallback = <DefaultErrorFallback />,
	emptyFallback = <DefaultEmptyFallback />,
}: DataLoaderProps) => {
	return match({ isLoading, hasError, countData })
		.with({ isLoading: true }, () => loadingFallback)
		.with({ hasError: true }, () => errorFallback)
		.with({ countData: 0 }, () => emptyFallback)
		.otherwise(() => children)
}
