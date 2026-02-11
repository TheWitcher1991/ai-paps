import { AssetID } from './asset.types'

export const toAssetID = (id: number | string): AssetID => Number(id) as AssetID
