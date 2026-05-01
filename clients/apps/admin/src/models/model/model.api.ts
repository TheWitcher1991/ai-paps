import { http } from '~infra/http'
import { createReadonlyModelApi, IModel } from '@wcsc/models'

const { useModel, useInfinitModels, useModels } = createReadonlyModelApi(http)

export { useModel, useInfinitModels, useModels }
export type { IModel }

export const useStackModels = () => {
  const { isLoading, data } = useModels()

  return {
    isLoading,
    models: data?.data?.results ?? [],
  }
}
