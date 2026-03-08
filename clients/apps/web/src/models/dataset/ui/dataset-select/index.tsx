
import { Label, Select } from '@gravity-ui/uikit'

import { DataLoader } from '~infra/lib'
import { Skeleton } from '~infra/ui'

import { DatasetID } from '@wcsc/models'
import { useStackDatasets } from '~models/dataset/dataset.api'

interface ModelSelectProps extends SelectMiltipleProps<DatasetID> {
	card?: boolean
}

export function DatasetSelect({
	defaultValue,
	value,
	errorMessage,
	onSelect,
}: ModelSelectProps) {
	const { isLoading, datasets } = useStackDatasets()

	const selectHandler = (datasets: DatasetID[]) => {
		onSelect?.(datasets)
	}

	return (
		<DataLoader
			isLoading={isLoading}
			loadingFallback={<Skeleton height={35} />}
		>
			<Select
				defaultValue={[defaultValue as string[]]}
				value={[...value as unknown as string[]]}
				name={'model'}
				errorMessage={errorMessage}
				width={'max'}
				size={'l'}
				multiple={true}
				filterable={true}
				hasClear={true}
				hasCounter={true}
				placeholder={'Выберите датасет'}
				onUpdate={value => selectHandler(value as unknown as DatasetID[])}
				validationState={errorMessage ? 'invalid' : undefined}

			>
				{datasets.map((dataset, index) => (
					<Select.Option
						value={dataset.id.toString()}
						key={index}
						text={dataset.name}
						data={dataset}
					>
						{dataset.name} <Label size='xs' theme='clear'>
							Размер {dataset.count_assets}
						</Label>
					</Select.Option>
				))}
			</Select>
		</DataLoader>
	)
}
