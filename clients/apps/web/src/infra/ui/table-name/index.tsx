import { Flex, Icon, IconData } from '@gravity-ui/uikit'
import { PropsWithChildren } from 'react'

interface TableNameProps extends PropsWithChildren {
	icon: IconData
}

export const TableName = ({ icon, children }: TableNameProps) => {
	return (
		<Flex gap={2} alignItems={'center'}>
			<Icon data={icon} size={16} />
			{children}
		</Flex>
	)
}
