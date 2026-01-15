import {
	keepPreviousData,
	type QueryKey,
	useInfiniteQuery,
	useMutation,
	useQuery,
} from '@tanstack/react-query'

import { type Dictionary, Paginated } from '@fgis/types'

import { HttpClientInstance } from './http'
import { optimisticInvalidateQueries } from './react-query'
import { CrudRepository, ReadonlyRepository } from './repositories'

export function createReadonlyApi<
	LIST_GET,
	GET,
	OPTIONS = Dictionary<any>,
	ID extends string | number = number,
>(
	http: HttpClientInstance,
	config: { list: string; detail: string; infinity: string },
) {
	const repo = new ReadonlyRepository<LIST_GET, GET, OPTIONS, ID>(
		http,
		config.list,
	)

	const useEntities = (params?: Partial<OPTIONS>) =>
		useQuery({
			queryKey: [config.list, params] as QueryKey,
			queryFn: ({ signal }) => repo.findAll(params, signal),
			placeholderData: keepPreviousData,
		})

	const useEntity = (id: ID) =>
		useQuery({
			queryKey: [config.detail, id] as QueryKey,
			queryFn: ({ signal }) => repo.findById(id, signal),
			enabled: !!id,
		})

	const useInfinityEntities = (params?: Partial<OPTIONS>) => {
		return useInfiniteQuery({
			queryKey: [config.infinity, params],
			queryFn: ({ pageParam }) => {
				return repo.findAll({
					...params,
					page: Number(pageParam),
				})
			},
			initialPageParam: 1,
			getNextPageParam: (lastPage, _allPages, lastPageParam) => {
				const totalPages = lastPage?.data?.meta?.totalPages ?? 1
				if (!totalPages || lastPageParam >= totalPages) return undefined
				return lastPageParam + 1
			},
			select: ({ pages, pageParams }) => ({
				pages: pages.map(page => page.data as Paginated<LIST_GET>),
				pageParams,
			}),
			throwOnError: true,
			refetchOnWindowFocus: false,
		})
	}

	return {
		useEntities,
		useEntity,
		useInfinityEntities,
		repo,
	}
}

export function createApi<
	LIST_GET,
	GET,
	CREATE,
	UPDATE,
	OPTIONS = Dictionary<any>,
	ID extends string | number = number,
>(
	http: HttpClientInstance,
	config: { list: string; detail: string; infinity: string },
) {
	const repo = new CrudRepository<LIST_GET, GET, CREATE, UPDATE, OPTIONS>(
		http,
		config.list,
	)

	const useEntities = (params?: Partial<OPTIONS>) =>
		useQuery({
			queryKey: [config.list, params] as QueryKey,
			queryFn: ({ signal }) => repo.findAll(params, signal),
			placeholderData: keepPreviousData,
		})

	const useEntity = (id: ID) =>
		useQuery({
			queryKey: [config.detail, id] as QueryKey,
			queryFn: ({ signal }) => repo.findById(id, signal),
			enabled: !!id,
		})

	const useInfinityEntities = (params?: Partial<OPTIONS>) => {
		return useInfiniteQuery({
			queryKey: [config.infinity, params],
			queryFn: ({ pageParam }) => {
				return repo.findAll({
					...params,
					page: Number(pageParam),
				})
			},
			initialPageParam: 1,
			getNextPageParam: (lastPage, _allPages, lastPageParam) => {
				const totalPages = lastPage?.data?.meta?.totalPages ?? 1
				if (!totalPages || lastPageParam >= totalPages) return undefined
				return lastPageParam + 1
			},
			select: ({ pages, pageParams }) => ({
				pages: pages.map(page => page.data as Paginated<LIST_GET>),
				pageParams,
			}),
			throwOnError: true,
			refetchOnWindowFocus: false,
		})
	}

	const useCreateEntity = () =>
		useMutation({
			mutationFn: (data: CREATE) => repo.create(data),
			onSuccess: async () => {
				await optimisticInvalidateQueries([[config.list]])
			},
		})

	const useUpdateEntity = (id: ID) =>
		useMutation({
			mutationFn: (data: Partial<UPDATE>) => repo.update(id, data),
			onSuccess: async () => {
				await optimisticInvalidateQueries([
					[config.list],
					[config.detail, id],
				])
			},
		})

	const useDeleteEntity = () =>
		useMutation({
			mutationFn: (id: ID) => repo.delete(id),
			onSuccess: async () => {
				await optimisticInvalidateQueries([[config.list]])
			},
		})

	return {
		useEntities,
		useEntity,
		useInfinityEntities,
		useCreateEntity,
		useUpdateEntity,
		useDeleteEntity,
		repo,
	}
}
