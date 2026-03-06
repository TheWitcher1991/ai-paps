import { useDatasetsStore } from '../datasets.hooks'
import { Flex } from '@gravity-ui/uikit'

import { ButtonFilter, createButtonFilterItems } from '~infra/ui'

import {
	DatasetSource,
	DatasetSourceMapper,
	DatasetStatus,
	DatasetStatusMapper,
	DatasetSubset,
	DatasetSubsetMapper,
} from '@wcsc/models'

export const DatasetsWider = () => {
	const { loading } = useDatasetsStore()

	return (
		<Flex alignItems={'center'} gap={4} wrap={'wrap'}>
			<ButtonFilter
				loading={loading}
				title='ЗАДАЧА:'
				onChange={() => {}}
				items={createButtonFilterItems(
					DatasetSubset,
					DatasetSubsetMapper,
				)}
			/>
			<ButtonFilter
				loading={loading}
				title='ИСТОЧНИК:'
				onChange={() => {}}
				items={createButtonFilterItems(
					DatasetSource,
					DatasetSourceMapper,
				)}
			/>
			<ButtonFilter
				loading={loading}
				title='СТАТУС:'
				onChange={() => {}}
				items={createButtonFilterItems(
					DatasetStatus,
					DatasetStatusMapper,
				)}
			/>
		</Flex>
	)
}
