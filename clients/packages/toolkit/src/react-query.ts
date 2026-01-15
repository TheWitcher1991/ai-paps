import { QueryClient, type QueryKey } from '@tanstack/react-query'

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnMount: true,
			refetchOnReconnect: true,
			refetchOnWindowFocus: false,
			retry: 0,
		},
	},
})

export const optimisticInvalidateQueries = async (queries: QueryKey[]) => {
	if (queries.length === 0) return

	await Promise.all(
		queries.map(queryKey =>
			queryClient.invalidateQueries({
				queryKey,
			}),
		),
	)
}

export const cancelQueries = (queryKey: QueryKey) => {
	queryClient.cancelQueries({
		queryKey,
	})
}