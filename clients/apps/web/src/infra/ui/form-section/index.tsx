import { Flex, Text } from '@gravity-ui/uikit'
import { FC, PropsWithChildren } from 'react'

import { Spacing } from '~infra/ui'

interface FormSectionProps extends PropsWithChildren {
	label: string
	withOutMargin?: boolean
	width?: string
	value?: string
}

export const FormSection: FC<FormSectionProps> = ({
	label,
	children,
	withOutMargin,
	width,
	value,
}) => {
	return (
		<Flex direction={'column'} width={width}>
			<Flex alignItems={'center'} justifyContent={'space-between'}>
				<Text variant={'body-2'} color={'secondary'}>
					{label}
				</Text>
				{value && (
					<Text variant={'body-2'} color={'brand'}>
						{value}
					</Text>
				)}
			</Flex>
			<Spacing v={'xs'} />
			{children}
			{!withOutMargin && <Spacing />}
		</Flex>
	)
}
