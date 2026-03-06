import { GearBranches } from '@gravity-ui/icons'
import { Button, Icon } from '@gravity-ui/uikit'
import { useRouter } from 'next/navigation'

import { href } from '@wcsc/href'

export const TrainingCreateButton = () => {
	const router = useRouter()

	return (
		<Button
			type={'button'}
			view={'action'}
			size={'l'}
			onClick={() => router.push(href.trainings.create)}
		>
			<Icon data={GearBranches} size={16} />
			Новое обучение
		</Button>
	)
}
