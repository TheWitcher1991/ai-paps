import {
	Arrows3RotateRight,
	Calendar,
	CurlyBracketsFunction,
	HandStop,
	Person,
	SquareDashedCircle,
} from '@gravity-ui/icons'
import { TableColumnConfig } from '@gravity-ui/uikit'

import { TableName } from '~infra/ui'

export const jobTableColumns: TableColumnConfig<any>[] = [
	{
		id: 'name',
		name: () => <TableName icon={SquareDashedCircle}>Джоба</TableName>,
		width: '20%',
		align: 'left',
		meta: { sort: true },
	},
	{
		id: 'dimension',
		name: () => <TableName icon={Person}>Измерение</TableName>,
		width: '15%',
		align: 'left',
		meta: { sort: true },
	},
	{
		id: 'status',
		name: () => <TableName icon={Arrows3RotateRight}>Статус</TableName>,
		width: '15%',
		align: 'left',
		meta: { sort: true },
	},
	{
		id: 'type',
		name: () => <TableName icon={CurlyBracketsFunction}>Тип</TableName>,
		width: '15%',
		align: 'left',
		meta: { sort: true },
	},
	{
		id: 'created_date',
		name: () => <TableName icon={Calendar}>Дата создания</TableName>,
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
