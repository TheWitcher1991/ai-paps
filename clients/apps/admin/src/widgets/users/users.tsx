'use client'

import { useEffect } from 'react'
import { useUnit } from 'effector-react'
import { useUsers } from '~models/user'
import { $store, setList, setCount, setLoading } from '~widgets/users/users.store'
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '~infra/ui/table'
import { Badge } from '~components/ui/badge'
import { Avatar, AvatarFallback } from '~components/ui/avatar'
import { DataLoader } from '~infra/lib/data-loader'

export function UsersWidget() {
  const { list, loading, error } = useUnit($store)
  const { data, isLoading, isFetching } = useUsers()

  useEffect(() => {
    if (data?.data) {
      setList(data.data.results)
      setCount(data.data.count)
    }
  }, [data])

  useEffect(() => {
    setLoading(isLoading || isFetching)
  }, [isLoading, isFetching])

  return (
    <DataLoader loading={loading} error={error} empty={list.length === 0}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Пользователь</TableHead>
            <TableHead>Роль</TableHead>
            <TableHead>Последний вход</TableHead>
            <TableHead>Статус</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {list.map((user: any) => (
            <TableRow key={user.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
                      {user.username?.charAt(0)?.toUpperCase() ?? '?'}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{user.username}</p>
                    <p className="text-xs text-muted-foreground">{user.email ?? '—'}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex gap-1">
                  {user.roles?.map((role: string) => (
                    <Badge key={role} variant="secondary">{role}</Badge>
                  )) ?? <Badge variant="outline">—</Badge>}
                </div>
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {user.last_login ? new Date(user.last_login).toLocaleDateString('ru-RU') : '—'}
              </TableCell>
              <TableCell>
                <Badge variant={user.is_active ? 'success' : 'destructive'}>
                  {user.is_active ? 'Активен' : 'Неактивен'}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </DataLoader>
  )
}
