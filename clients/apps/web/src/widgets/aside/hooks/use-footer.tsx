import { ArrowRightFromSquare, Person } from '@gravity-ui/icons'
import { FooterItem } from '@gravity-ui/navigation'

import { logout } from '@wcsc/models'

export default function useFooter() {
	return (
		<>
			<FooterItem
				compact={false}
				id={'profile'}
				title={'Профиль'}
				icon={Person}
				onItemClick={async () => logout()}
			/>
			<FooterItem
				compact={false}
				id={'logout'}
				title={'Выход'}
				icon={ArrowRightFromSquare}
				onItemClick={async () => logout()}
			/>
		</>
	)
}
