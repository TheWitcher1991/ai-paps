import { SegmentedRadioGroup } from '@gravity-ui/uikit'

export default function AssetTabs() {
	return (
		<SegmentedRadioGroup defaultValue='1'>
			<SegmentedRadioGroup.Option value='1'>
				Анализ
			</SegmentedRadioGroup.Option>
			<SegmentedRadioGroup.Option value='2'>
				Классы
			</SegmentedRadioGroup.Option>
		</SegmentedRadioGroup>
	)
}
