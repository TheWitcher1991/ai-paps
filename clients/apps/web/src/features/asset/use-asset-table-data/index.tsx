import { AssetActions } from '../asset-actions'
import { Text } from '@gravity-ui/uikit'
import { useMemo } from 'react'

import { AssetCell } from '~models/asset'

import { Indicator } from '~infra/ui'

import { IAsset } from '@wcsc/models'
import { formatFileSize } from '@wcsc/toolkit'

export const useAssetTableData = (assets: IAsset[]) =>
	useMemo(
		() =>
			assets.map(asset => ({
				name: <AssetCell asset={asset} />,
				format: <Text color='secondary'>{asset.file_format}</Text>,
				size: formatFileSize(asset.file_size),
				solution: (
					<Text color='secondary'>
						{asset.width}x{asset.height}
					</Text>
				),
				annotations: (
					<Indicator
						resource='annotations'
						count={asset.annotations.length}
					/>
				),
				actions: <AssetActions asset={asset} />,
			})),
		[assets],
	)
