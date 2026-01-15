import { Select } from '@gravity-ui/uikit'

export default function DepartmentButton() {
	return (
		<Select
			disabled
			value={['Проект «Теплицы»']}
			options={[
				{
					content: 'Проект «Теплицы»',
					value: 'Проект «Теплицы»',
				},
			]}
			title={'Выберите рабочее пространство'}
		/>
	)
}
