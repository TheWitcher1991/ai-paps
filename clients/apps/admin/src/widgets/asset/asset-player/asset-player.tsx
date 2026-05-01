import { FileImage } from 'lucide-react'

interface AssetPlayerProps {
  asset: any
}

export function AssetPlayer({ asset }: AssetPlayerProps) {
  if (!asset) return null

  return (
    <div className="flex aspect-video items-center justify-center rounded-lg bg-muted">
      {asset.url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={asset.url} alt={asset.name} className="max-h-full max-w-full object-contain" />
      ) : (
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <FileImage className="h-16 w-16" />
          <p className="text-sm">Превью недоступно</p>
        </div>
      )}
    </div>
  )
}
