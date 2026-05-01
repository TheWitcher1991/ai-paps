'use client'

import { useState } from 'react'
import { Button } from '~components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '~components/ui/popover'
import { Bell } from 'lucide-react'
import { Badge } from '~components/ui/badge'

export function Notifications() {
  const [open, setOpen] = useState(false)
  const count = 0

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {count > 0 && (
            <Badge className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full p-0 text-[10px]">
              {count}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="flex flex-col items-center justify-center py-6 text-center">
          <Bell className="mb-2 h-8 w-8 text-muted-foreground" />
          <p className="text-sm font-medium text-foreground">Нет уведомлений</p>
          <p className="text-xs text-muted-foreground">
            Уведомления будут появляться здесь
          </p>
        </div>
      </PopoverContent>
    </Popover>
  )
}
