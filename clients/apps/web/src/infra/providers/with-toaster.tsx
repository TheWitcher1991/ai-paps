import { ToasterComponent, ToasterProvider } from '@gravity-ui/uikit'
import { PropsWithChildren } from 'react'

import { toaster } from '~infra/lib'

const WithToaster = ({ children }: PropsWithChildren) => {
	return (
		<ToasterProvider toaster={toaster}>
			<>{children}</>
			<ToasterComponent />
		</ToasterProvider>
	)
}

export default WithToaster
