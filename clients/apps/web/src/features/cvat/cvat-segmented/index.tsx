import { Cubes3Overlap, SquareDashedCircle, CirclesConcentric, ArrowDownToSquare } from '@gravity-ui/icons'
import { usePathname, useRouter } from 'next/navigation'

import { Segmented, SegmentedItem } from '~infra/ui'

import { useMemoizedFn } from '@wcsc/hooks'
import { href } from '@wcsc/href'

export const CvatSegmented = () => {
	const router = useRouter()
	const pathname = usePathname()

	const handleClick = useMemoizedFn((link: string) => router.replace(link))

	return (
		<Segmented>
			<SegmentedItem
				active={pathname.startsWith(href.cvat.projects.index)}
				icon={Cubes3Overlap}
				onClick={() => handleClick(href.cvat.projects.index)}
			>
				Проекты
			</SegmentedItem>
			<SegmentedItem
				active={pathname.startsWith(href.cvat.tasks.index)}
				icon={CirclesConcentric}
				onClick={() => handleClick(href.cvat.tasks.index)}
			>
				Задачи
			</SegmentedItem>
			<SegmentedItem
				active={pathname.startsWith(href.cvat.jobs.index)}
				icon={SquareDashedCircle}
				onClick={() => handleClick(href.cvat.jobs.index)}
			>
				Джобы
			</SegmentedItem>
			<SegmentedItem
				active={pathname.startsWith(href.cvat.requests.index)}
				icon={ArrowDownToSquare}
				onClick={() => handleClick(href.cvat.requests.index)}
			>
				Запросы
			</SegmentedItem>
		</Segmented>
	)
}
