import {
	DatabaseMagnifier,
	Picture,
	SquareDashed,
	SquareDashedCircle,
} from '@gravity-ui/icons'
import { Flex } from '@gravity-ui/uikit'

import { ValueCard } from '~infra/ui'

export const DatasetsIndicators = () => {
	return (
		<Flex gap={4} justifyContent={'space-between'} alignItems={'center'}>
			<ValueCard value={1} title={'Датасетов'} icon={DatabaseMagnifier} />
			<ValueCard value={0} title={'Изображений'} icon={Picture} />
			<ValueCard
				value={0}
				title={'Размечено'}
				icon={SquareDashedCircle}
			/>
			<ValueCard value={0} title={'Неразмечено'} icon={SquareDashed} />
		</Flex>
	)
}
