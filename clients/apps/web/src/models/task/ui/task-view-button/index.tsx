import { Eye } from '@gravity-ui/icons'

import { Action } from '~infra/ui'

import { useToggle } from '@wcsc/hooks'
import { WithTask } from '@wcsc/models'

export const TaskViewButton = ({
	task,
	onlyIcon,
}: PropsWithAction<WithTask>) => {
	const [val, toggle] = useToggle(false)

	return (
		<>
			<Action onClick={toggle} icon={Eye} onlyIcon={onlyIcon}>
				Открыть
			</Action>
		</>
	)
}
