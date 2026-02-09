import { TrashBin } from '@gravity-ui/icons'

import { Action } from '~infra/ui'

import { useToggle } from '@wcsc/hooks'
import { WithProject } from '@wcsc/models'

export const ProjectDeleteButton = ({
	project,
	onlyIcon,
}: PropsWithAction<WithProject>) => {
	const [val, toggle] = useToggle(false)

	return (
		<>
			<Action
				onClick={toggle}
				view={'outlined-danger'}
				icon={TrashBin}
				onlyIcon={onlyIcon}
			>
				Удалить
			</Action>
		</>
	)
}
