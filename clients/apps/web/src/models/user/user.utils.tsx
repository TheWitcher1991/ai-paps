import {
	Shield,
	Calendar,
	SquareHashtag,
	HandStop,
	Person,
} from '@gravity-ui/icons'
import { TableColumnConfig } from '@gravity-ui/uikit'

import { TableName } from '~infra/ui'

export const userTableColumns: TableColumnConfig<any>[] = [
	{
		id: 'id',
		name: () => <TableName icon={SquareHashtag}>ID</TableName>,
		width: '20%',
		align: 'left',
		meta: { sort: true },
	},
	{
		id: 'username',
		name: () => <TableName icon={Person}>Логин</TableName>,
		width: '20%',
		align: 'left',
		meta: { sort: true },
	},
	{
		id: 'roles',
		name: () => <TableName icon={Shield}>Роли</TableName>,
		width: '20%',
		align: 'left',
		meta: { sort: true },
	},
	{
		id: 'last_login',
		name: () => <TableName icon={Calendar}>Последний вход</TableName>,
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
