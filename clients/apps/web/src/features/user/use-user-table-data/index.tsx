import { UserActions } from '../user-actions'
import { useMemo } from 'react'

import { IUser } from '@wcsc/models'

export const useUserTableData = (users: IUser[]) =>
	useMemo(
		() =>
			users.map(user => ({
				actions: <UserActions user={user} />,
			})),
		[users],
	)
