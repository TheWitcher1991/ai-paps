import { ArrowRightFromSquare } from '@gravity-ui/icons'
import { FooterItem } from '@gravity-ui/navigation'

import { logout } from '@wcsc/models'

export default function useFooter() {
	return (
		<FooterItem
			compact={false}
			item={{
				id: 'logout',
				title: 'Выход',
				icon: ArrowRightFromSquare,
				onItemClick: async () => logout(),
			}}
		/>
	)
}
