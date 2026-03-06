import { ModelCard } from '../model-card'
import { Label, Select } from '@gravity-ui/uikit'
import { useState } from 'react'

import { useStackModels } from '~models/model/model.api'

import { DataLoader } from '~infra/lib'
import { Skeleton, Spacing } from '~infra/ui'

import { IModel, ModelID, toModelID } from '@wcsc/models'
import { Nullable } from '@wcsc/types'

interface ModelSelectProps extends SelectProps<ModelID> {
	card?: boolean
}

export function ModelSelect({
	defaultValue,
	value,
	card,
	errorMessage,
	onSelect,
}: ModelSelectProps) {
	const { isLoading, models } = useStackModels()

	const [model, setModel] = useState<Nullable<IModel>>(null)

	const selectHandler = (model: ModelID) => {
		onSelect?.(toModelID(model))
		setModel(models.find(m => m.id === model))
	}

	return (
		<DataLoader
			isLoading={isLoading}
			loadingFallback={<Skeleton height={35} />}
		>
			<Select
				defaultValue={[defaultValue?.toString() as string]}
				value={[value?.toString() as string]}
				name={'model'}
				errorMessage={errorMessage}
				width={'max'}
				size={'l'}
				placeholder={'Выберите модель'}
				onUpdate={value => selectHandler(toModelID(value[0] as string))}
				validationState={errorMessage ? 'invalid' : undefined}
			>
				{models.map((model, index) => (
					<Select.Option
						value={model.id.toString()}
						key={index}
						text={model.name}
					>
						{model.name}{' '}
						<Label size='xs' theme='clear'>
							{model.architecture}
						</Label>
					</Select.Option>
				))}
			</Select>
			{model && (
				<>
					<Spacing v='s' />
					<ModelCard model={model} />
				</>
			)}
		</DataLoader>
	)
}
