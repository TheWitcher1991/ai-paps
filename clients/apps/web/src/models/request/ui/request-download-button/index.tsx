import { ArrowDownToSquare } from '@gravity-ui/icons'

import { Action } from '~infra/ui'

import { useToggle } from '@wcsc/hooks'
import { WithRequest } from '@wcsc/models'

export const RequestDownloadButton = ({
	request,
	onlyIcon,
}: PropsWithAction<WithRequest>) => {
	const [val, toggle] = useToggle(false)

	return (
		<>
			<Action
				onClick={toggle}
				icon={ArrowDownToSquare}
				onlyIcon={onlyIcon}
			>
				Скачать
			</Action>
		</>
	)
}
