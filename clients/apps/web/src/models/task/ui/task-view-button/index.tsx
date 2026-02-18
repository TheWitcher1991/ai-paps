import { Eye } from '@gravity-ui/icons'

import { Action, Dialog } from '~infra/ui'

import { useToggle } from '@wcsc/hooks'
import { WithTask } from '@wcsc/models'

export const TaskViewButton = ({
	task,
	onlyIcon,
}: PropsWithAction<WithTask>) => {
	const [val, toggle] = useToggle(false)

	return (
		<>
			<Dialog
				onClose={toggle}
				open={val}
				caption={`Задача #${task.id}`}
				textButtonApply={'Закрыть'}
				onClickButtonApply={toggle}
				size={'s'}
			></Dialog>

			<Action onClick={toggle} icon={Eye} onlyIcon={onlyIcon}>
				Открыть
			</Action>
		</>
	)
}
