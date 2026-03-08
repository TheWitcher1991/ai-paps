import { UserActions } from '../user-actions'
import { useMemo } from 'react'

import { IUser } from '@wcsc/models'
import { formatDateInRu } from '@wcsc/toolkit'
import { Flex, Label } from '@gravity-ui/uikit'

export const useUserTableData = (users: IUser[]) =>
	useMemo(
		() =>
			users.map(user => ({
				id: user.id,
				username: user.username,
				roles: <Flex alignItems={'center'} gap={1}>{user?.groups?.map((group, index) => <Label theme='clear' key={index}>{group}</Label>)}</Flex>,
				last_login: formatDateInRu(user.last_login),
				actions: <UserActions user={user} />,
			})),
		[users],
	)
