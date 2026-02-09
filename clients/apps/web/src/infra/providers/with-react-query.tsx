import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { PropsWithChildren } from 'react'

import { IS_DEV } from '@wcsc/system'
import { queryClient } from '@wcsc/toolkit'

const WithReactQuery = ({ children }: PropsWithChildren) => {
	return (
		<QueryClientProvider client={queryClient}>
			<>{children}</>
			{IS_DEV && <ReactQueryDevtools initialIsOpen={false} />}
		</QueryClientProvider>
	)
}

export default WithReactQuery
