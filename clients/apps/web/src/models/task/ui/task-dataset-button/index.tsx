import { ArrowDownToSquare } from '@gravity-ui/icons'

import { useTaskExport } from '~models/task/task.api'

import { query, toaster } from '~infra/lib'
import { Action, Dialog } from '~infra/ui'

import { useToggle } from '@wcsc/hooks'
import { WithTask } from '@wcsc/models'

export const TaskDatasetButton = ({
	task,
	onlyIcon,
}: PropsWithAction<WithTask>) => {
	const [val, toggle] = useToggle(false)

	const dataset = useTaskExport(task.id)

	const handleDataset = async () =>
		await query(async () => {
			await dataset.mutateAsync()
			toaster.add({
				title: 'Датасет для задачи успешно экспортирован',
				name: 'dataset-exported',
			})
		})

	return (
		<>
			<Dialog
				onClose={toggle}
				open={val}
				loading={dataset.isPending}
				caption={'Экспорт датасета'}
				textButtonApply={'Экспортировать'}
				onClickButtonApply={handleDataset}
				size={'s'}
			>
				Вы действительно хотите экспортировать датасет для задачи #$
				{task.id}?
			</Dialog>

			<Action
				onClick={toggle}
				icon={ArrowDownToSquare}
				onlyIcon={onlyIcon}
			>
				Датасет
			</Action>
		</>
	)
}
