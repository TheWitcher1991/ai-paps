import { Eye } from '@gravity-ui/icons'

import { Action } from '~infra/ui'

import { useToggle } from '@wcsc/hooks'
import { WithJob } from '@wcsc/models'
import { useJobExport } from '~models/job/job.api'

export const JobViewButton = ({ job, onlyIcon }: PropsWithAction<WithJob>) => {
	const [val, toggle] = useToggle(false)

	const exports = useJobExport(job['id'])
	

	const handle = () => {
		exports.mutateAsync()
	}

	return (
		<>
			<Action onClick={handle} icon={Eye} onlyIcon={onlyIcon}>
				Открыть
			</Action>
		</>
	)
}
