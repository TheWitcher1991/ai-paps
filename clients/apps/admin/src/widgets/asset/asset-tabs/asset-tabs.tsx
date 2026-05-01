import { MetaList, MetaListItem } from '~infra/ui'
import { Calendar, FileText, Database } from 'lucide-react'

interface AssetTabsProps {
  asset: any
}

export function AssetTabs({ asset }: AssetTabsProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <MetaList>
        <MetaListItem icon={FileText} title="ID:">
          <span className="text-sm">{asset.id}</span>
        </MetaListItem>
        <MetaListItem icon={FileText} title="Название:">
          <span className="text-sm">{asset.name}</span>
        </MetaListItem>
        <MetaListItem icon={Database} title="Формат:">
          <span className="text-sm">{asset.format ?? '—'}</span>
        </MetaListItem>
        <MetaListItem icon={Calendar} title="Создан:">
          <span className="text-sm">{asset.created_date ? new Date(asset.created_date).toLocaleDateString('ru-RU') : '—'}</span>
        </MetaListItem>
      </MetaList>
    </div>
  )
}
