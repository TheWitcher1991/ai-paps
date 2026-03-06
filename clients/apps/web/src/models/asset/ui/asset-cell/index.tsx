import { Picture } from '@gravity-ui/icons'
import { Flex, Icon, Text } from '@gravity-ui/uikit'
import { useRouter } from 'next/navigation'

import { href } from '@wcsc/href'
import { WithAsset } from '@wcsc/models'
import { removeHostInUrl } from '@wcsc/toolkit'

export const AssetCell = ({ asset }: WithAsset) => {
	const router = useRouter()

	return (
		<Flex
			style={{ cursor: 'pointer' }}
			direction={'column'}
			gap={0}
			onClick={() => router.push(href.assets.view(asset.id))}
		>
			<Flex alignItems={'center'} gap={1}>
				<Icon color='secondary' data={Picture} />
				<Text variant='subheader-1'>{asset.file_name}</Text>
			</Flex>
			<Text
				color='secondary'
				variant='caption-2'
				style={{
					overflow: 'hidden',
					textOverflow: 'ellipsis',
					whiteSpace: 'nowrap',
				}}
			>
				{removeHostInUrl(asset.file)}
			</Text>
		</Flex>
	)
}
