import { Metadata } from 'next'
import Head from 'next/head'
import { ReactNode } from 'react'

import WithProviders from '~infra/providers'
import { projectConfig } from '~infra/system'

import './global.scss'

export const metadata: Metadata = {
	title: projectConfig.long_name,
	description: projectConfig.description,
	robots: 'index, follow',
	authors: [
		{
			name: 'Ashot Svazyan',
			url: 'https://github.com/TheWitcher1991',
		},
	],

	openGraph: {
		title: projectConfig.long_name,
		description: projectConfig.description,
		type: 'website',
	},
	twitter: {
		title: projectConfig.long_name,
		description: projectConfig.description,
	},
}

export default function RootLayout({
	children,
}: Readonly<{
	children: ReactNode
}>) {
	return (
		<html lang='ru' suppressHydrationWarning>
			<Head>
				<link rel='icon' href='/favicon.png' />
				<link
					rel='apple-touch-icon'
					sizes='180x180'
					href='/favicon.png'
				/>
				<link
					rel='shortcut icon'
					href='/favicon.png'
					type='image/png'
				/>
			</Head>
			<body className={'g-root g-root_theme_dark'}>
				<WithProviders>{children}</WithProviders>
			</body>
		</html>
	)
}
