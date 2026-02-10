import { ArrowDownToSquare } from '@gravity-ui/icons'

import { Action } from '~infra/ui'

import { useToggle } from '@wcsc/hooks'
import { WithJob } from '@wcsc/models'

export const JobDatasetButton = ({
	job,
	onlyIcon,
}: PropsWithAction<WithJob>) => {
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
