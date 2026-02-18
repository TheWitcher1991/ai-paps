import { ArrowDownToSquare } from '@gravity-ui/icons'

import { useProjectExport } from '~models/project/project.api'

import { query, toaster } from '~infra/lib'
import { Action, Dialog } from '~infra/ui'

import { useToggle } from '@wcsc/hooks'
import { WithProject } from '@wcsc/models'

export const ProjectDatasetButton = ({
	project,
	onlyIcon,
}: PropsWithAction<WithProject>) => {
	const [val, toggle] = useToggle(false)

	const dataset = useProjectExport(project.id)

	const handleDataset = async () =>
		await query(async () => {
			await dataset.mutateAsync()
			toaster.add({
				title: 'Датасет для проекта успешно экспортирован',
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
				Вы действительно хотите экспортировать датасет для проекта #$
				{project.id}?
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
