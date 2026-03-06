import { Select } from '@gravity-ui/uikit'

import { trainingLossFunctionOptions } from '@wcsc/models'

export function LossFunctionSelect<T = any>({
	defaultValue,
	value,
	errorMessage,
	onSelect,
}: SelectProps<T>) {
	return (
		<Select
			defaultValue={[defaultValue as string]}
			value={[value as string]}
			name={'loss-function'}
			errorMessage={errorMessage}
			width={'max'}
			size={'l'}
			placeholder={'Выберите Loss Function'}
			options={trainingLossFunctionOptions}
			onUpdate={value => onSelect?.(value[0] as string)}
			validationState={errorMessage ? 'invalid' : undefined}
		/>
	)
}
