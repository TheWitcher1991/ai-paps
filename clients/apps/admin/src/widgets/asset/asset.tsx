'use client'

import { useRef, useState, useEffect, useCallback, useMemo } from 'react'
import { CardIconTitle } from '~infra/ui'
import { Badge } from '~components/ui/badge'
import { Card, CardContent } from '~components/ui/card'
import { ScrollArea } from '~components/ui/scroll-area'
import { Separator } from '~components/ui/separator'
import { ZoomIn, ZoomOut, Move } from 'lucide-react'
import { cn } from '~infra/ui/lib/utils'
import type { IAsset, IAnnotation, IClass } from '@wcsc/models'

const DEFAULT_COLORS = [
  '#00C56D', '#00B4D8', '#FF6B6B', '#FFD166', '#06D6A0',
  '#118AB2', '#EF476F', '#FFC43D', '#7209B7', '#4361EE',
  '#4CC9F0', '#F72585', '#7209B7', '#3A0CA3', '#4895EF',
]

function getColor(index: number): string {
  return DEFAULT_COLORS[index % DEFAULT_COLORS.length]
}

/** Extract class name from annotation */
function getClassName(ann: IAnnotation): string {
  return (ann.cls as IClass)?.name ?? 'unknown'
}

/** Extract bbox from annotation JSON field */
function getBbox(ann: IAnnotation): [number, number, number, number] | null {
  try {
    const raw = ann.bbox as unknown
    if (Array.isArray(raw) && raw.length >= 4) {
      return [raw[0], raw[1], raw[2], raw[3]] as [number, number, number, number]
    }
    if (typeof raw === 'string') {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed) && parsed.length >= 4) {
        return [parsed[0], parsed[1], parsed[2], parsed[3]] as [number, number, number, number]
      }
    }
  } catch { /* ignore */ }
  return null
}

/** Extract segmentation points from annotation JSON field */
function getSegmentationPoints(ann: IAnnotation): number[][] | null {
  try {
    const raw = ann.segmentation as unknown
    if (Array.isArray(raw) && raw.length > 0) {
      // Could be flat array [x1,y1,x2,y2,...] or nested [[x1,y1],[x2,y2],...]
      if (Array.isArray(raw[0]) && raw[0].length >= 2) {
        return raw as number[][]
      }
      // Flatten to pairs
      const points: number[][] = []
      for (let i = 0; i < raw.length; i += 2) {
        points.push([raw[i], raw[i + 1]])
      }
      return points
    }
    if (typeof raw === 'string') {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed)) {
        if (Array.isArray(parsed[0]) && parsed[0].length >= 2) {
          return parsed as number[][]
        }
        const points: number[][] = []
        for (let i = 0; i < parsed.length; i += 2) {
          points.push([parsed[i], parsed[i + 1]])
        }
        return points
      }
    }
  } catch { /* ignore */ }
  return null
}

interface AssetWidgetProps {
  asset: IAsset
}

export function AssetWidget({ asset }: AssetWidgetProps) {
  const annotations = useMemo<IAnnotation[]>(() => asset.annotations ?? [], [asset.annotations])
  const classes = useMemo(() => [...new Set(annotations.map(a => getClassName(a)))], [annotations])
  const classColors = useMemo(() => {
    const map: Record<string, string> = {}
    classes.forEach((c, i) => { map[c] = getColor(i) })
    return map
  }, [classes])

  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [scale, setScale] = useState(1)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const dragging = useRef(false)
  const lastMouse = useRef({ x: 0, y: 0 })
  const imageLoaded = useRef(false)

  // Zoom
  const zoomIn = useCallback(() => setScale(prev => Math.min(prev * 1.2, 10)), [])
  const zoomOut = useCallback(() => setScale(prev => Math.max(prev / 1.2, 0.1)), [])
  const resetZoom = useCallback(() => { setScale(1); setPos({ x: 0, y: 0 }) }, [])

  // Pan & Zoom events
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const onMouseDown = (e: MouseEvent) => {
      if (e.button !== 0) return
      dragging.current = true
      lastMouse.current = { x: e.clientX, y: e.clientY }
      container.style.cursor = 'grabbing'
    }

    const onMouseMove = (e: MouseEvent) => {
      if (!dragging.current) return
      const dx = e.clientX - lastMouse.current.x
      const dy = e.clientY - lastMouse.current.y
      lastMouse.current = { x: e.clientX, y: e.clientY }
      setPos(prev => ({ x: prev.x + dx, y: prev.y + dy }))
    }

    const onMouseUp = () => {
      dragging.current = false
      if (container) container.style.cursor = 'grab'
    }

    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      const factor = e.deltaY < 0 ? 1.1 : 0.9
      setScale(prev => Math.max(0.1, Math.min(10, prev * factor)))
    }

    container.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
    container.addEventListener('wheel', onWheel, { passive: false })

    return () => {
      container.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
      container.removeEventListener('wheel', onWheel)
    }
  }, [])

  // Draw annotations on canvas
  const drawAnnotations = useCallback(() => {
    const canvas = canvasRef.current
    const img = imgRef.current
    if (!canvas || !img || !imageLoaded.current) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = img.naturalWidth
    canvas.height = img.naturalHeight
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    annotations.forEach((ann) => {
      const color = classColors[getClassName(ann)] ?? '#ffffff'
      const isHovered = hoveredId === ann.id
      const alpha = hoveredId != null && !isHovered ? 0.15 : 0.6

      ctx.strokeStyle = color
      ctx.fillStyle = color
      ctx.globalAlpha = alpha
      ctx.lineWidth = isHovered ? 3 : 1.5

      const bbox = getBbox(ann)
      if (bbox) {
        const [x, y, w, h] = bbox
        ctx.strokeRect(x, y, w, h)
        if (isHovered) {
          ctx.globalAlpha = 0.2
          ctx.fillRect(x, y, w, h)
        }
        // Label
        ctx.globalAlpha = 0.9
        ctx.font = '14px Jost, sans-serif'
        const text = `${getClassName(ann)} ${ann.view}`
        const metrics = ctx.measureText(text)
        ctx.fillStyle = color
        ctx.fillRect(x, y - 20, metrics.width + 8, 20)
        ctx.fillStyle = '#000'
        ctx.fillText(text, x + 4, y - 6)
      }

      const points = getSegmentationPoints(ann)
      if (points && points.length > 2) {
        ctx.beginPath()
        ctx.moveTo(points[0][0], points[0][1])
        for (let i = 1; i < points.length; i++) {
          ctx.lineTo(points[i][0], points[i][1])
        }
        ctx.closePath()
        ctx.stroke()
        if (isHovered) {
          ctx.globalAlpha = 0.15
          ctx.fill()
        }
      }
    })
  }, [annotations, classColors, hoveredId])

  useEffect(() => {
    drawAnnotations()
  }, [drawAnnotations, scale])

  const onImageLoad = useCallback(() => {
    imageLoaded.current = true
    drawAnnotations()
  }, [drawAnnotations])

  const imageUrl = asset.file ? (asset.file.startsWith('http') ? asset.file : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}${asset.file}`) : ''

  return (
    <div className="flex flex-col gap-4 lg:flex-row">
      {/* Canvas Area */}
      <div className="flex-1">
        <CardIconTitle
          icon={<ZoomIn className="h-5 w-5 text-primary" />}
          title={asset.file_name}
          caption={`${asset.file_format} • ${asset.width}×${asset.height}`}
        />

        <Card className="mt-3">
          <CardContent className="p-3">
            {/* Toolbar */}
            <div className="mb-2 flex items-center gap-2">
              <button onClick={zoomOut} className="rounded-md border border-border p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground">
                <ZoomOut className="h-4 w-4" />
              </button>
              <span className="text-xs tabular-nums text-muted-foreground">{(scale * 100).toFixed(0)}%</span>
              <button onClick={zoomIn} className="rounded-md border border-border p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground">
                <ZoomIn className="h-4 w-4" />
              </button>
              <button onClick={resetZoom} className="rounded-md border border-border p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground">
                <Move className="h-4 w-4" />
              </button>
              <span className="ml-auto text-xs text-muted-foreground">
                {annotations.length} аннотаций • {classes.length} классов
              </span>
            </div>

            {/* Image Canvas */}
            <div
              ref={containerRef}
              className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-lg bg-muted"
              style={{ cursor: 'grab' }}
            >
              <div
                className="relative inline-block"
                style={{
                  transform: `translate(${pos.x}px, ${pos.y}px) scale(${scale})`,
                  transformOrigin: 'top left',
                }}
              >
                {imageUrl ? (
                  <img
                    ref={imgRef}
                    src={imageUrl}
                    alt={asset.file_name}
                    className="max-w-none"
                    style={{ maxWidth: '100%', height: 'auto' }}
                    onLoad={onImageLoad}
                  />
                ) : (
                  <div className="flex h-64 w-96 items-center justify-center text-muted-foreground">
                    Изображение недоступно
                  </div>
                )}
                <canvas
                  ref={canvasRef}
                  className="absolute inset-0 pointer-events-none"
                  style={{ width: '100%', height: '100%' }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Annotations Sidebar */}
      <div className="w-full lg:w-80">
        <Card>
          <CardContent className="p-4">
            <h3 className="mb-3 text-sm font-semibold text-foreground">Аннотации ({annotations.length})</h3>

            {/* Class Legend */}
            <div className="mb-3 flex flex-wrap gap-1.5">
              {classes.map((cls) => (
                <Badge key={cls} variant="outline" style={{ borderColor: classColors[cls] }}>
                  <span
                    className="mr-1 inline-block h-2 w-2 rounded-full"
                    style={{ backgroundColor: classColors[cls] }}
                  />
                  {cls}
                </Badge>
              ))}
            </div>

            <Separator className="mb-3" />

            {/* Annotation List */}
            {annotations.length === 0 ? (
              <p className="py-4 text-center text-sm text-muted-foreground">Нет аннотаций</p>
            ) : (
              <ScrollArea className="h-[400px] pr-2">
                <div className="flex flex-col gap-1.5">
                  {annotations.map((ann) => (
                    <div
                      key={ann.id}
                      className={cn(
                        'flex items-center justify-between rounded-md border border-border p-2.5 transition-colors cursor-pointer',
                        hoveredId === ann.id && 'border-primary/50 bg-primary/5',
                      )}
                      onMouseEnter={() => setHoveredId(ann.id)}
                      onMouseLeave={() => setHoveredId(null)}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className="h-3 w-3 rounded-full flex-shrink-0"
                          style={{ backgroundColor: classColors[getClassName(ann)] }}
                        />
                        <span className="text-sm font-medium">{getClassName(ann)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">{ann.view}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
