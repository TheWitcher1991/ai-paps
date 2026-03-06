import { Flex, Pagination, Text } from '@gravity-ui/uikit'

import { setFilter, useTrainingsStore } from '~widgets/trainings'

import { PAGE_SIZE_OPTIONS } from '@wcsc/system'

export function TrainingsPagination() {
	const { filter, count } = useTrainingsStore()

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
