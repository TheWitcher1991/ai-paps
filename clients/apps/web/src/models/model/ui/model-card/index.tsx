import {
	Cpu,
	CurlyBracketsFunction,
	DatabaseMagnifier,
	Layers,
} from '@gravity-ui/icons'
import { IconBrain } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'

import { ModelStatus, ModelCard as UiModelCard } from '~infra/ui'

import { href } from '@wcsc/href'
import { ModelSubsetMapper, WithModel } from '@wcsc/models'

export const ModelCard = ({ model }: WithModel) => {
	const router = useRouter()

	return (
		<UiModelCard
			onClick={() => router.push(href.models.view(model.id))}
			icon={<IconBrain />}
			title={model?.name}
			caption={model?.alias}
			status={<ModelStatus />}
			grid={[
				{
					icon: Layers,
					title: 'АРХИТЕКТУРА',
					caption: model?.architecture,
				},
				{
					icon: Cpu,
					title: 'BACKBONE',
					caption: model?.backbone,
				},
				{
					icon: CurlyBracketsFunction,
					title: 'ФРЕЙМВОРК',
					caption: model?.framework,
				},
				{
					icon: DatabaseMagnifier,
					title: 'ТИП ЗАДАЧИ',
					caption: ModelSubsetMapper[model?.subset],
				},
			]}
		>
			{model?.description}
		</UiModelCard>
	)
}
