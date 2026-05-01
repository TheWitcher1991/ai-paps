import { http } from '~infra/http'
import { createReadonlyAssetApi, IAsset } from '@wcsc/models'

const { useAsset, useInfinitAssets, useAssets } = createReadonlyAssetApi(http)

export { useAsset, useInfinitAssets, useAssets }
export type { IAsset }
