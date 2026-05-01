import { ActionButton } from '~infra/ui/action-button'
import { ExternalLink } from 'lucide-react'

export function AssetActions({ asset: _asset }: { asset: any }) {
  return (
    <div className="flex gap-1">
      <ActionButton icon={ExternalLink} variant="ghost" title="Открыть" />
    </div>
  )
}
