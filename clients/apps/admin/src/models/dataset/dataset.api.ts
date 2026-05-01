import { http } from '~infra/http'
import {
  createReadonlyDatasetApi,
  createDatasetActionApi,
  IDataset,
} from '@wcsc/models'

const { useDataset, useInfinitDatasets, useDatasets } =
  createReadonlyDatasetApi(http)

export { useDataset, useInfinitDatasets, useDatasets }
export type { IDataset }

const { useMergeDataset } = createDatasetActionApi(http)

export { useMergeDataset }

export const useStackDatasets = () => {
  // Simplified version — returns list of all datasets
  const { isLoading, data } = useDatasets()

  return {
    isLoading,
    datasets: data?.data?.results ?? [],
  }
}
