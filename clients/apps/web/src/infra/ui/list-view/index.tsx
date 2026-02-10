import { GripHorizontal, LayoutCellsLarge } from '@gravity-ui/icons'
import { Icon, SegmentedRadioGroup } from '@gravity-ui/uikit'

import { useMemoizedFn } from '@wcsc/hooks'

interface ListViewProps {
	view?: ListViewType
	onUpdate: (view: ListViewType) => void
	loading?: boolean
}

export const ListView = ({ view, onUpdate, loading }: ListViewProps) => {
	const updateHandler = useMemoizedFn(value => onUpdate(value))

	return (
		<SegmentedRadioGroup
			name='view'
			defaultValue={view}
			onUpdate={updateHandler}
			size={'m'}
			disabled={loading}
		>
			<SegmentedRadioGroup.Option value='table'>
				<Icon data={LayoutCellsLarge} size={16} />
			</SegmentedRadioGroup.Option>
			<SegmentedRadioGroup.Option value='list'>
				<Icon data={GripHorizontal} size={16} />
			</SegmentedRadioGroup.Option>
		</SegmentedRadioGroup>
	)
}
