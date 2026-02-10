import {
	BookOpen,
	House,
	LocationArrowFill,
	Molecule,
	NutHex,
	Persons,
	Picture,
	SquareDashedCircle,
} from '@gravity-ui/icons'
import { MenuItem } from '@gravity-ui/navigation'
import { usePathname, useRouter } from 'next/navigation'

import { href } from '@wcsc/href'

export default function useMenuItems(): MenuItem[] {
	const router = useRouter()
	const pathname = usePathname()

	return [
		{
			id: 'dashboard',
			title: 'Дашборд',
			icon: House,
			iconSize: 20,
			current: pathname === href.workspace,
			onItemClick: () => router.push(href.workspace),
		},
		{
			id: 'directory',
			title: 'Справочник',
			icon: BookOpen,
			iconSize: 20,
			current: pathname.startsWith(href.directory.index),
			onItemClick: () => router.push(href.directory.index),
		},
		{
			id: 'cvat',
			title: 'Интеграция CVAT',
			icon: NutHex,
			iconSize: 20,
			current: pathname.startsWith(href.cvat.index),
			onItemClick: () => router.push(href.cvat.projects.index),
		},
		{
			id: 'datasets',
			iconSize: 20,
			title: 'Датасеты',
			icon: SquareDashedCircle,
			current: pathname.startsWith(href.datasets.index),
			onItemClick: () => router.push(href.datasets.index),
		},
		{
			id: 'models',
			iconSize: 20,
			title: 'Нейронные сети',
			icon: Molecule,
			current: pathname.startsWith(href.models.index),
			onItemClick: () => router.push(href.models.index),
		},
		{
			id: 'recognitions',
			iconSize: 20,
			title: 'Распознавание',
			icon: Picture,
			current: pathname.startsWith(href.recognitions.index),
			onItemClick: () => router.push(href.recognitions.index),
		},
		{
			id: 'users',
			iconSize: 20,
			title: 'Сотрудники',
			icon: Persons,
			current: pathname.startsWith(href.users.index),
			onItemClick: () => router.push(href.users.index),
		},

		{
			id: 'import',
			title: 'Открыть CVAT',
			icon: LocationArrowFill,
			type: 'action',
			afterMoreButton: true,
		},
	]
}
