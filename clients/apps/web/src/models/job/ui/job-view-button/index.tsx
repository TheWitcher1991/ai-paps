import { Eye } from '@gravity-ui/icons'

import { Action } from '~infra/ui'

import { useToggle } from '@wcsc/hooks'
import { WithJob } from '@wcsc/models'

export const JobViewButton = ({ job, onlyIcon }: PropsWithAction<WithJob>) => {
	const [val, toggle] = useToggle(false)

	return (
		<>
			<Action onClick={toggle} icon={Eye} onlyIcon={onlyIcon}>
				Открыть
			</Action>
		</>
	)
}
