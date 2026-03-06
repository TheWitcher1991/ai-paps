import { Select } from '@gravity-ui/uikit'

import { trainingSchedulerOptions } from '@wcsc/models'

export function SchedulerSelect<T = any>({
	defaultValue,
	value,
	errorMessage,
	onSelect,
}: SelectProps<T>) {
	return (
		<Select
			defaultValue={[defaultValue as string]}
			value={[value as string]}
			name={'scheduler'}
			errorMessage={errorMessage}
			width={'max'}
			size={'l'}
			placeholder={'Выберите Scheduler'}
			options={trainingSchedulerOptions}
			onUpdate={value => onSelect?.(value[0] as string)}
			validationState={errorMessage ? 'invalid' : undefined}
		/>
	)
}
