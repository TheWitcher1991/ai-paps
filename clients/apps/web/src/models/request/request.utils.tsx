import {
	Arrows3RotateRight,
	Calendar,
	ArrowDownToSquare,
	HandStop,
	Person,
	Archive,
} from '@gravity-ui/icons'
import { TableColumnConfig } from '@gravity-ui/uikit'

import { TableName } from '~infra/ui'

export const requestTableColumns: TableColumnConfig<any>[] = [
	{
		id: 'name',
		name: () => <TableName icon={ArrowDownToSquare}>Запросы</TableName>,
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
		id: 'format',
		name: () => <TableName icon={Archive}>Формат</TableName>,
		width: '15%',
		align: 'left',
		meta: { sort: true },
	},
	{
		id: 'expiry_date',
		name: () => <TableName icon={Calendar}>Истекает</TableName>,
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
