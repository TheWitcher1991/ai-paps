import { ArrowDownToSquare } from '@gravity-ui/icons'

import { Action } from '~infra/ui'

import { useToggle } from '@wcsc/hooks'
import { WithProject } from '@wcsc/models'

export const ProjectDatasetButton = ({
	project,
	onlyIcon,
}: PropsWithAction<WithProject>) => {
	const [val, toggle] = useToggle(false)

	return (
		<>
			<Action
				onClick={toggle}
				icon={ArrowDownToSquare}
				onlyIcon={onlyIcon}
			>
				Датасет
			</Action>
		</>
	)
}
