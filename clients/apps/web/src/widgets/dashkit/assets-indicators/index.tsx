import { DatabaseMagnifier, Layers, Picture, Tag } from '@gravity-ui/icons'
import { Flex } from '@gravity-ui/uikit'

import { ValueCard } from '~infra/ui'

export const AssetsIndicators = () => {
	return (
		<Flex gap={4} justifyContent={'space-between'} alignItems={'center'}>
			<ValueCard value={0} title={'Изображений'} icon={Picture} />
			<ValueCard value={0} title={'Аннотаций'} icon={Tag} />
			<ValueCard
				value={'COCO 1.0'}
				title={'Формат'}
				icon={DatabaseMagnifier}
			/>
			<ValueCard value={'Обучение'} title={'Задача'} icon={Layers} />
		</Flex>
	)
}
