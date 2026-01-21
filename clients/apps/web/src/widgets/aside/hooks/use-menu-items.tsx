import {
	BookOpen,
	Cubes3Overlap,
	DatabaseMagnifier,
	House,
	LocationArrowFill,
	Molecule,
	Persons,
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
			id: 'projects',
			title: 'Проекты',
			icon: Cubes3Overlap,
			iconSize: 20,
			current: pathname.startsWith(href.projects.index),
			onItemClick: () => router.push(href.projects.index),
		},
		{
			id: 'imports',
			iconSize: 20,
			title: 'Разметка',
			icon: SquareDashedCircle,
			current: pathname.startsWith(href.imports.index),
			onItemClick: () => router.push(href.imports.index),
		},
		{
			id: 'datasets',
			iconSize: 20,
			title: 'Датасеты',
			icon: DatabaseMagnifier,
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
