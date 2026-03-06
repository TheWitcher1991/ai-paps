import { Funnel, Layers, Picture, Tag } from '@gravity-ui/icons'
import { Button, Flex, Icon } from '@gravity-ui/uikit'

import { setFilter, useAssetsStore } from '~widgets/assets'

import { useMemoizedFn } from '@wcsc/hooks'

export default function AssetsView() {
	const { loading, filter } = useAssetsStore()

	const onUpdate = useMemoizedFn(value => {
		setFilter({
			view: value,
		})
	})

	return (
		<Flex alignItems={'center'} gap={2}>
			<Icon data={Funnel} color='secondary' />

			<Button view='action' size='s'>
				<Icon data={Picture} size={15} />
				Изображение
			</Button>
			<Button view='outlined' size='s'>
				<Icon data={Tag} size={14} />
				Аннотация
			</Button>
			<Button view='outlined' size='s'>
				<Icon data={Layers} size={15} />
				Маска
			</Button>
		</Flex>
	)
}
