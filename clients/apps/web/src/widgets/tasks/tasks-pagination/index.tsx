import { Flex, Pagination, Text } from '@gravity-ui/uikit'

import { setFilter, useTasksStore } from '~widgets/tasks'

import { PAGE_SIZE_OPTIONS } from '@wcsc/system'

export function TasksPagination() {
	const { filter, count } = useTasksStore()

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
