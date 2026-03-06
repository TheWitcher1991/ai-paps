import { Select } from '@gravity-ui/uikit'

import { trainingOptimizerOptions } from '@wcsc/models'

export function OptimizerSelect<T = any>({
	defaultValue,
	value,
	errorMessage,
	onSelect,
}: SelectProps<T>) {
	return (
		<Select
			defaultValue={[defaultValue as string]}
			value={[value as string]}
			name={'optimizer'}
			errorMessage={errorMessage}
			width={'max'}
			size={'l'}
			placeholder={'Выберите оптимизатор'}
			options={trainingOptimizerOptions}
			onUpdate={value => onSelect?.(value[0] as string)}
			validationState={errorMessage ? 'invalid' : undefined}
		/>
	)
}
