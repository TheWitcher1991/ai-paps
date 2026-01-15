import type { Metadata } from 'next'
import { Jost } from 'next/font/google'
import type { ReactNode } from 'react'

import './globals.scss'

const jost = Jost({
	variable: '--font-jost',
	style: 'normal',
	weight: '400',
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: 'fgis',
	description: '',
	robots: 'noindex, nofollow',
	openGraph: {
		title: 'fgis',
		description: '',
		type: 'website',
	},
	twitter: {
		title: 'fgis',
		description: '',
	},
}

export default function RootLayout({
	children,
}: Readonly<{
	children: ReactNode
}>) {
	return (
		<html lang='ru' suppressHydrationWarning className={jost.variable}>
			<body className={jost.variable}>{children}</body>
		</html>
	)
}