import {
	Circles5Random,
	Persons,
	SquareDashed,
	SquareDashedCircle,
} from '@gravity-ui/icons'
import { Flex } from '@gravity-ui/uikit'

import { ValueCard } from '~infra/ui'

export const UsersIndicators = () => {
	return (
		<Flex gap={4} justifyContent={'space-between'} alignItems={'center'}>
			<ValueCard value={0} title={'Сотрудников'} icon={Persons} />
			<ValueCard
				value={0}
				title={'Размечено'}
				icon={SquareDashedCircle}
			/>
			<ValueCard value={0} title={'Неразмечено'} icon={SquareDashed} />
			<ValueCard value={0} title={'Аннотаций'} icon={Circles5Random} />
		</Flex>
	)
}
