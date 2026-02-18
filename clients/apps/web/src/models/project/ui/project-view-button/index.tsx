import { Eye } from '@gravity-ui/icons'

import { Action, Dialog } from '~infra/ui'

import { useToggle } from '@wcsc/hooks'
import { WithProject } from '@wcsc/models'

export const ProjectViewButton = ({
	project,
	onlyIcon,
}: PropsWithAction<WithProject>) => {
	const [val, toggle] = useToggle(false)

	return (
		<>
			<Dialog
				onClose={toggle}
				open={val}
				caption={`Проект #${project.id}`}
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
