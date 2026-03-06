import {
	CircleCheck,
	CircleXmark,
	GraduationCap,
	Stopwatch,
} from '@gravity-ui/icons'
import { Flex } from '@gravity-ui/uikit'

import { ValueCard } from '~infra/ui'

export const TrainingsIndicators = () => {
	return (
		<Flex gap={4} justifyContent={'space-between'} alignItems={'center'}>
			<ValueCard
				value={0}
				title={'Всего обучений'}
				icon={GraduationCap}
			/>
			<ValueCard value={0} title={'В процессе'} icon={Stopwatch} />
			<ValueCard value={0} title={'Завершено'} icon={CircleCheck} />
			<ValueCard value={0} title={'С ошибками'} icon={CircleXmark} />
		</Flex>
	)
}
