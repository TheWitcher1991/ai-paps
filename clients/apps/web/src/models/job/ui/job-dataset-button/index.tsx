import { ArrowDownToSquare } from '@gravity-ui/icons'

import { useJobExport } from '~models/job/job.api'

import { query, toaster } from '~infra/lib'
import { Action, Dialog } from '~infra/ui'

import { useToggle } from '@wcsc/hooks'
import { WithJob } from '@wcsc/models'

export const JobDatasetButton = ({
	job,
	onlyIcon,
}: PropsWithAction<WithJob>) => {
	const [val, toggle] = useToggle(false)

	const dataset = useJobExport(job.id)

	const handleDataset = async () =>
		await query(async () => {
			await dataset.mutateAsync()
			toaster.add({
				title: 'Датасет для джобы успешно экспортирован',
				name: 'dataset-exported',
				theme: 'success',
			})
			toggle()
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
				Вы действительно хотите экспортировать датасет для джобы #$
				{job.id}?
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
