import { Text } from '@gravity-ui/uikit'
import Link from 'next/link'
import { PropsWithChildren } from 'react'
import { Url } from 'url'

interface TableLinkProps extends PropsWithChildren {
	href: Url
}

export const TableLink = ({ href, children }: TableLinkProps) => {
	return (
		<Text>
			<Link href={href}>{children}</Link>
		</Text>
	)
}
