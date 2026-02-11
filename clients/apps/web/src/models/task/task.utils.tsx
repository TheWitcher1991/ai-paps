import {
	Arrows3RotateRight,
	Calendar,
	CirclesConcentric,
	HandStop,
	Person,
	SquareDashedCircle,
} from '@gravity-ui/icons'
import { TableColumnConfig } from '@gravity-ui/uikit'

import { TableName } from '~infra/ui'

export const taskTableColumns: TableColumnConfig<any>[] = [
	{
		id: 'name',
		name: () => <TableName icon={CirclesConcentric}>Задача</TableName>,
		width: '20%',
		align: 'left',
		meta: { sort: true },
	},
	{
		id: 'owner',
		name: () => <TableName icon={Person}>Владелец</TableName>,
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
		id: 'jobs',
		name: () => <TableName icon={SquareDashedCircle}>Джоб</TableName>,
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
