'use client'

import { ThemeProvider } from '@gravity-ui/uikit'
import { PropsWithChildren } from 'react'

import { useTheme } from '@wcsc/hooks'

import WithReactQuery from './with-react-query'
import WithToaster from './with-toaster'

export const WithProviders = ({ children }: PropsWithChildren) => {
	const { theme } = useTheme()

	return (
		<ThemeProvider theme={theme}>
			<WithToaster>
				<WithReactQuery>{children}</WithReactQuery>
			</WithToaster>
		</ThemeProvider>
	)
}
