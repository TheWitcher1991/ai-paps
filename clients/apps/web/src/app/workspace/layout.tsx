'use client'

import dynamic from 'next/dynamic'
import { PropsWithChildren } from 'react'

import Aside from '~widgets/aside'

import { Container } from '~infra/ui'
import Footer from '~widgets/footer'

const Nav = dynamic(() => import('~widgets/nav'))

export default function WorkspaceLayout({
	children,
}: Readonly<PropsWithChildren>) {
	return (
		<Aside>
			<Nav />
			<Container>{children}</Container>
			<Footer />
		</Aside>
	)
}
