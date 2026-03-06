import { Button, Flex, Text } from '@gravity-ui/uikit'
import { ReactNode } from 'react'

export type ButtonFilterItem<T = string> = {
	content: ReactNode
	value: T
}

interface ButtonFilterProps<T = string> {
	title: string
	value?: T
	onChange: (value?: T) => void
	items: ButtonFilterItem<T>[]
	loading?: boolean
}

export const createButtonFilterItems = <T extends string>(
	enumObj: Record<string, T>,
	mapper: Record<T, string>,
): ButtonFilterItem<T>[] => {
	return Object.values(enumObj).map(value => ({
		value,
		content: mapper[value],
	}))
}

export const createButtonFilterItemsWithMapper = <T extends string>(
	enumObj: Record<string, T>,
	valueToContent: (value: T) => ReactNode,
): ButtonFilterItem<T>[] => {
	return Object.values(enumObj).map(value => ({
		value,
		content: valueToContent(value),
	}))
}

export const ButtonFilter = <T = string,>({
	title,
	value,
	onChange,
	items,
	loading,
}: ButtonFilterProps<T>) => {
	return (
		<Flex alignItems={'center'} gap={2}>
			<Text color='secondary' variant='caption-1'>
				{title}
			</Text>
			<Flex gap={1}>
				<Button
					loading={loading}
					size='s'
					view={value === undefined ? 'action' : 'outlined'}
					onChange={() => onChange()}
				>
					<Text variant='caption-2'>Все</Text>
				</Button>
				{items.map((item, index) => (
					<Button
						loading={loading}
						key={index}
						size='s'
						view={value === item.value ? 'action' : 'outlined'}
						onChange={() => onChange(item.value)}
					>
						<Text variant='caption-2'>{item.content}</Text>
					</Button>
				))}
			</Flex>
		</Flex>
	)
}
