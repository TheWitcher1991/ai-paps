import { Eye } from '@gravity-ui/icons'

import { Action } from '~infra/ui'

import { useToggle } from '@wcsc/hooks'
import { WithProject } from '@wcsc/models'

export const ProjectViewButton = ({
	project,
	onlyIcon,
}: PropsWithAction<WithProject>) => {
	const [val, toggle] = useToggle(false)

	return (
		<>
			<Action onClick={toggle} icon={Eye} onlyIcon={onlyIcon}>
				Открыть
			</Action>
		</>
	)
}
