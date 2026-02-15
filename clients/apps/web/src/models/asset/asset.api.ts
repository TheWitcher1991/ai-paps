import { http } from '~infra/http'

import { createReadonlyAssetApi } from '@wcsc/models'

const { useAsset, useInfinitAssets, useAssets } = createReadonlyAssetApi(http)

export { useAsset, useInfinitAssets, useAssets }
