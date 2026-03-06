import { Button, Flex } from '@gravity-ui/uikit'

interface LabelInputProps<T = string> {
	value: T
	onChange?: (value: T) => void
	labels: {
		content: string
		value: T
	}[]
}

export const LabelInput = <T = string,>({
	value,
	onChange,
	labels,
}: LabelInputProps<T>) => {
	return (
		<Flex width={'100%'} alignItems={'center'} gap={2}>
			{labels.map((label, index) => (
				<Button
					key={index}
					size='m'
					onClick={() => onChange?.(label.value)}
					view={
						value === label.value ? 'outlined-action' : 'outlined'
					}
					value={value === label.value}
				>
					{label.content}
				</Button>
			))}
		</Flex>
	)
}
