import {
	BookOpen,
	Brush,
	Database,
	DisplayPulse,
	GraduationCap,
	House,
	LifeRing,
	LocationArrowFill,
	Molecule,
	NutHex,
	Persons,
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
			id: 'models',
			iconSize: 20,
			title: 'Нейронные сети',
			icon: Molecule,
			current: pathname.startsWith(href.models.index),
			onItemClick: () => router.push(href.models.index),
		},
		{
			id: 'trainings',
			iconSize: 20,
			title: 'Обучение моделей',
			icon: GraduationCap,
			current: pathname.startsWith(href.trainings.index),
			onItemClick: () => router.push(href.trainings.index),
		},
		{
			id: 'datasets',
			iconSize: 20,
			title: 'Датасеты',
			icon: Database,
			current: pathname.startsWith(href.datasets.index),
			onItemClick: () => router.push(href.datasets.index),
		},

		{
			id: 'recognitions',
			iconSize: 20,
			title: 'Мониторинг',
			icon: DisplayPulse,
			current: pathname.startsWith(href.recognitions.index),
			onItemClick: () => router.push(href.recognitions.index),
		},
		{
			id: 'users',
			iconSize: 20,
			title: 'Пользователи',
			icon: Persons,
			current: pathname.startsWith(href.users.index),
			onItemClick: () => router.push(href.users.index),
		},
		{
			id: 'divider',
			type: 'divider',
			title: 'divider',
		},
		{
			id: 'users',
			iconSize: 20,
			title: 'AI Конструктор',
			icon: Brush,
			current: false,
			onItemClick: () => router.push(href.users.index),
		},
		{
			id: 'users',
			iconSize: 20,
			title: 'Поддержка',
			icon: LifeRing,
			current: false,
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
