import { ActionButton } from '~infra/ui/action-button'
import { ExternalLink, Trash2 } from 'lucide-react'

export function UserActions({ user: _user }: { user: any }) {
  return (
    <div className="flex gap-1">
      <ActionButton icon={ExternalLink} variant="ghost" title="Профиль" />
      <ActionButton icon={Trash2} variant="destructive" title="Удалить" />
    </div>
  )
}
