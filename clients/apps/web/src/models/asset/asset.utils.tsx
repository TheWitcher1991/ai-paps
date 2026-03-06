import {
	CurlyBracketsFunction,
	DatabaseMagnifier,
	HandStop,
	HardDrive,
	Picture,
	Tag,
} from '@gravity-ui/icons'
import { TableColumnConfig } from '@gravity-ui/uikit'

import { TableName } from '~infra/ui'

export const assetTableColumns: TableColumnConfig<any>[] = [
	{
		id: 'name',
		name: () => <TableName icon={Picture}>Имя файла</TableName>,
		width: '26%',
		align: 'left',
		meta: { sort: true },
	},
	{
		id: 'format',
		name: () => <TableName icon={DatabaseMagnifier}>Формат</TableName>,
		align: 'left',
		meta: { sort: true },
	},
	{
		id: 'size',
		name: () => <TableName icon={HardDrive}>Размер</TableName>,
		align: 'left',
		meta: { sort: true },
	},
	{
		id: 'solution',
		name: () => (
			<TableName icon={CurlyBracketsFunction}>Разрешение</TableName>
		),
		align: 'left',
		meta: { sort: true },
	},
	{
		id: 'annotations',
		name: () => <TableName icon={Tag}>Аннотаций</TableName>,
		align: 'left',
		meta: { sort: true },
	},
	{
		id: 'actions',
		name: () => <TableName icon={HandStop}>Действия</TableName>,
		width: '20%',
		align: 'left',
		meta: { sort: true },
	},
]
