import { useModelsStore } from '../models.hooks'
import { Flex } from '@gravity-ui/uikit'

import { ButtonFilter, createButtonFilterItems } from '~infra/ui'

import {
	ModelBackbone,
	ModelBackboneMapper,
	ModelFramework,
	ModelFrameworkMapper,
	ModelSubset,
	ModelSubsetMapper,
} from '@wcsc/models'

export const ModelsWider = () => {
	const { loading } = useModelsStore()

	return (
		<Flex alignItems={'center'} gap={4} wrap={'wrap'}>
			<ButtonFilter
				loading={loading}
				title='ЗАДАЧА:'
				onChange={() => {}}
				items={createButtonFilterItems(ModelSubset, ModelSubsetMapper)}
			/>
			<ButtonFilter
				loading={loading}
				title='ФРЕЙМВОРК:'
				onChange={() => {}}
				items={createButtonFilterItems(
					ModelFramework,
					ModelFrameworkMapper,
				)}
			/>
			<ButtonFilter
				loading={loading}
				title='BACKBONE:'
				onChange={() => {}}
				items={createButtonFilterItems(
					ModelBackbone,
					ModelBackboneMapper,
				)}
			/>
		</Flex>
	)
}
