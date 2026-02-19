import { Briefcase, Clock, Flask, Molecule } from '@gravity-ui/icons'
import { Flex } from '@gravity-ui/uikit'

import { ValueCard } from '~infra/ui'

export const ModelsIndicators = () => {
	return (
		<Flex gap={4} justifyContent={'space-between'} alignItems={'center'}>
			<ValueCard value={1} title={'Моделей'} icon={Molecule} />
			<ValueCard value={0} title={'Экспериментов'} icon={Flask} />
			<ValueCard value={0} title={'Затрачено'} icon={Clock} />
			<ValueCard value={0} title={'Инференсов'} icon={Briefcase} />
		</Flex>
	)
}
