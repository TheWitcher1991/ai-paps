'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

import { useAnnotations } from '~models/annotation'

import { WithAsset } from '@wcsc/models'

import AssetAnnotations from './asset-annotations'
import { useAssetSegmentation } from './asset.hooks'
import styles from './asset.module.scss'

export default function Asset({ asset }: WithAsset) {
	const { data, isLoading } = useAnnotations({ asset: asset.id })

	const results = useMemo(
		() => data?.data?.results ?? [],
		[data?.data?.results],
	)

	const [hoveredId, setHoveredId] = useState<number | null>(null)

	const containerRef = useRef<HTMLDivElement>(null)
	const [scale, setScale] = useState(1)
	const [pos, setPos] = useState({ x: 0, y: 0 })
	const dragging = useRef(false)
	const lastMouse = useRef({ x: 0, y: 0 })

	const { canvasRef, imgRef, drawAnnotations } = useAssetSegmentation(
		hoveredId,
		asset,
		results,
		isLoading,
	)

	useEffect(() => {
		const container = containerRef.current
		if (!container) return

		const onMouseDown = (e: MouseEvent) => {
			if (e.button !== 0) return
			dragging.current = true
			lastMouse.current = { x: e.clientX, y: e.clientY }
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
		}

		const onWheel = (e: WheelEvent) => {
			e.preventDefault()
			const zoomFactor = e.deltaY < 0 ? 1.1 : 0.9
			setScale(prev => Math.max(0.1, Math.min(10, prev * zoomFactor)))
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

	useEffect(() => {
		drawAnnotations(scale)
	}, [scale, drawAnnotations])

	return (
		<div className={styles.annotationConter}>
			<div className={styles.annotationBlocker}>
				<div
					ref={containerRef}
					className={styles.annotationRelative}
					style={{
						transform: `translate(${pos.x}px, ${pos.y}px) scale(${scale})`,
						transformOrigin: 'top left',
						cursor: dragging.current ? 'grabbing' : 'grab',
					}}
				>
					<img
						ref={imgRef}
						src={asset.file}
						alt=''
						className={styles.annotationAsset}
					/>
					<canvas
						ref={canvasRef}
						className={styles.annotationCanvas}
					/>
				</div>
			</div>

			<AssetAnnotations
				annotations={results}
				hoveredId={hoveredId}
				onHovered={hoveredId => setHoveredId(hoveredId)}
			/>
		</div>
	)
}
