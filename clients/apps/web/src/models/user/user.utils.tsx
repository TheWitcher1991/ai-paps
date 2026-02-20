import {
	CurlyBracketsFunction,
	DatabaseMagnifier,
	Flask,
	HandStop,
	SquareDashedCircle,
} from '@gravity-ui/icons'
import { TableColumnConfig } from '@gravity-ui/uikit'

import { TableName } from '~infra/ui'

export const userTableColumns: TableColumnConfig<any>[] = [
	{
		id: 'name',
		name: () => <TableName icon={SquareDashedCircle}>Имя</TableName>,
		width: '20%',
		align: 'left',
		meta: { sort: true },
	},
	{
		id: 'format',
		name: () => <TableName icon={Flask}>Формат</TableName>,
		width: '20%',
		align: 'left',
		meta: { sort: true },
	},
	{
		id: 'classes',
		name: () => <TableName icon={CurlyBracketsFunction}>Классов</TableName>,
		width: '20%',
		align: 'left',
		meta: { sort: true },
	},
	{
		id: 'source',
		name: () => <TableName icon={DatabaseMagnifier}>Источник</TableName>,
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
