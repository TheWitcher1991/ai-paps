import { Cpu, CurlyBracketsFunction, Layers } from '@gravity-ui/icons'
import { IconBrain } from '@tabler/icons-react'

import { ModelStatus } from '~infra/ui'

import { ModelSubsetMapper, WithModel } from '@wcsc/models'

export const ModelCard = ({ model }: WithModel) => (
	<ModelCard
		icon={<IconBrain />}
		title={model.name}
		caption={model.alias}
		status={<ModelStatus />}
		grid={[
			{
				icon: Layers,
				title: 'АРХИТЕКТУРА',
				caption: model.architecture,
			},
			{
				icon: Cpu,
				title: 'BACKBONE',
				caption: model.backbone,
			},
			{
				icon: CurlyBracketsFunction,
				title: 'ФРЕЙМВОРК',
				caption: model.framework,
			},
			{
				icon: DatabaseMagnifier,
				title: 'ТИП ЗАДАЧИ',
				caption: ModelSubsetMapper[model.subset],
			},
		]}
	>
		{model.description}
	</ModelCard>
)
