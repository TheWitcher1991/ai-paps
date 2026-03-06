import { DatabaseMagnifier, Layers, Picture, Tag } from '@gravity-ui/icons'
import { Flex } from '@gravity-ui/uikit'
import { IconDatabase } from '@tabler/icons-react'

import { CardIconTitle, ValueCard } from '~infra/ui'

import { WithDatasetID } from '@wcsc/models'

export const AssetsIndicators = ({ dataset }: WithDatasetID) => {
	return (
		<>
			<CardIconTitle
				icon={<IconDatabase />}
				title='Tomatoes Train'
				caption='Обучающий набор изображений томатов для семантической сегментации'
			/>
			<Flex
				gap={4}
				justifyContent={'space-between'}
				alignItems={'center'}
			>
				<ValueCard value={0} title={'Изображений'} icon={Picture} />
				<ValueCard value={0} title={'Аннотаций'} icon={Tag} />
				<ValueCard
					value={'COCO 1.0'}
					title={'Формат'}
					icon={DatabaseMagnifier}
				/>
				<ValueCard value={'Обучение'} title={'Задача'} icon={Layers} />
			</Flex>
		</>
	)
}
