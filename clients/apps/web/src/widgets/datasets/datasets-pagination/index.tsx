import { Flex, Pagination, Text } from '@gravity-ui/uikit'

import { setFilter, useDatasetsStore } from '~widgets/datasets'

import { PAGE_SIZE_OPTIONS } from '@wcsc/system'

export function DatasetsPagination() {
	const { filter, count } = useDatasetsStore()

	return (
		<Flex justifyContent={'space-between'} alignItems={'center'}>
			<Text color={'secondary'}>Всего {count}</Text>
			<Pagination
				page={filter.page}
				pageSize={filter.page_size}
				total={count}
				compact={true}
				showInput={true}
				showPages={true}
				pageSizeOptions={PAGE_SIZE_OPTIONS}
				onUpdate={(page, pageSize) => {
					setFilter({
						page,
						page_size: pageSize,
					})
				}}
			/>
		</Flex>
	)
}
