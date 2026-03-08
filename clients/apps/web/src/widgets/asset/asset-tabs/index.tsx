import { SegmentedRadioGroup } from '@gravity-ui/uikit'

export default function AssetTabs() {
	return (
		<SegmentedRadioGroup defaultValue='1'>
			<SegmentedRadioGroup.Option value='1'>
				Аннотации
			</SegmentedRadioGroup.Option>
			<SegmentedRadioGroup.Option value='2'>
				Макси
			</SegmentedRadioGroup.Option>
		</SegmentedRadioGroup>
	)
}
