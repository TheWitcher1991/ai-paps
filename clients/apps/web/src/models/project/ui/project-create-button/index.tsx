import { CirclePlus } from '@gravity-ui/icons'

import { Action } from '~infra/ui'

import { useToggle } from '@wcsc/hooks'

export const ProjectCreateButton = () => {
	const [val, toggle] = useToggle(false)

	return (
		<>
			<Action onClick={toggle} view={'action'} size={'l'} icon={CirclePlus}>
				Создать проект
			</Action>
		</>
	)
}
