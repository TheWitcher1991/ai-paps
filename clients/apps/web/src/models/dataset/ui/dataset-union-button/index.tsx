import { ArrowDownToSquare } from '@gravity-ui/icons'

import { Action } from '~infra/ui'

import { useToggle } from '@wcsc/hooks'

export const DatasetUnionButton = () => {
	const [val, toggle] = useToggle(false)

	return (
		<>
			<Action onClick={toggle} icon={ArrowDownToSquare} size={'l'} view={'action'}>
				Объединить датасеты
			</Action>
		</>
	)
}
