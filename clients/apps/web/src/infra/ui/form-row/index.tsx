import { Flex } from '@gravity-ui/uikit'
import { PropsWithChildren } from 'react'

export const FormRow = ({ children }: PropsWithChildren) => (
	<Flex alignItems={'center'} gap={2}>
		{children}
	</Flex>
)
