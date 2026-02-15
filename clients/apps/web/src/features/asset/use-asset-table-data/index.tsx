import { AssetActions } from '../asset-actions'
import { useMemo } from 'react'

import { Indicator, TableLink } from '~infra/ui'

import { href } from '@wcsc/href'
import { IAsset } from '@wcsc/models'
import { formatDateInRu } from '@wcsc/toolkit'

export const useAssetTableData = (assets: IAsset[]) =>
	useMemo(
		() =>
			assets.map(asset => ({
				name: (
					<TableLink href={href.assets.view(asset.id)}>
						Ассет #{asset.id}
					</TableLink>
				),
				annotations: (
					<Indicator
						resource='annotations'
						count={asset.annotations.length}
					/>
				),
				size: `${asset.width} x ${asset.height}`,
				date: formatDateInRu(asset.created_at),
				actions: <AssetActions asset={asset} />,
			})),
		[assets],
	)
