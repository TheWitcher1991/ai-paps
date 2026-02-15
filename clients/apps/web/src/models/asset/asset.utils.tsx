import {
	Calendar,
	CurlyBracketsFunction,
	HandStop,
	Picture,
	SquareDashedCircle,
} from '@gravity-ui/icons'
import { TableColumnConfig } from '@gravity-ui/uikit'

import { TableName } from '~infra/ui'

export const assetTableColumns: TableColumnConfig<any>[] = [
	{
		id: 'name',
		name: () => <TableName icon={Picture}>Ассет</TableName>,
		width: '20%',
		align: 'left',
		meta: { sort: true },
	},
	{
		id: 'annotations',
		name: () => <TableName icon={SquareDashedCircle}>Аннотаций</TableName>,
		width: '20%',
		align: 'left',
		meta: { sort: true },
	},
	{
		id: 'size',
		name: () => <TableName icon={CurlyBracketsFunction}>Размер</TableName>,
		width: '20%',
		align: 'left',
		meta: { sort: true },
	},
	{
		id: 'date',
		name: () => <TableName icon={Calendar}>Дата</TableName>,
		width: '20%',
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
