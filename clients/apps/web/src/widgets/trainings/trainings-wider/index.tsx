import { useTrainingsStore } from '../trainings.hooks'
import { Flex } from '@gravity-ui/uikit'

import { ButtonFilter, createButtonFilterItems } from '~infra/ui'

import { TrainingStatus, TrainingStatusMapper } from '@wcsc/models'

export const TrainingsWider = () => {
	const { loading } = useTrainingsStore()

	return (
		<Flex alignItems={'center'} gap={4} wrap={'wrap'}>
			<ButtonFilter
				loading={loading}
				title='СТАТУС:'
				onChange={() => {}}
				items={createButtonFilterItems(
					TrainingStatus,
					TrainingStatusMapper,
				)}
			/>
		</Flex>
	)
}
