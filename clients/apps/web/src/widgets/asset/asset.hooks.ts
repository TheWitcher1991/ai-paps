import { useCallback, useEffect, useRef } from 'react'

import { IAnnotation, IAsset } from '@wcsc/models'
import { Nullable } from '@wcsc/types'

export const useAssetSegmentation = (
	hoveredId: Nullable<number>,
	asset: IAsset,
	results: IAnnotation[],
	loading?: boolean,
) => {
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const imgRef = useRef<HTMLImageElement>(null)

	const drawAnnotations = useCallback(
		(scale = 1) => {
			const canvas = canvasRef.current
			const img = imgRef.current
			if (!canvas || !img || loading) return

			const ctx = canvas.getContext('2d')
			if (!ctx) return

			canvas.width = img.clientWidth
			canvas.height = img.clientHeight

			const scaleX = (canvas.width / asset.width) * scale
			const scaleY = (canvas.height / asset.height) * scale

			ctx.clearRect(0, 0, canvas.width, canvas.height)

			results.forEach(ann => {
				const isActive = ann.id === hoveredId
				ctx.strokeStyle = isActive ? 'yellow' : 'lime'
				ctx.fillStyle = isActive
					? 'rgba(255,255,0,0.4)'
					: 'rgba(0,255,0,0.25)'
				ctx.lineWidth = isActive ? 3 : 2

				if (ann.segmentation?.length) {
					ann.segmentation.forEach(polygon => {
						ctx.beginPath()
						for (let i = 0; i < polygon.length; i += 2) {
							const x = polygon[i] * scaleX
							const y = polygon[i + 1] * scaleY
							if (i === 0) ctx.moveTo(x, y)
							else ctx.lineTo(x, y)
						}
						ctx.closePath()
						ctx.fill()
						ctx.stroke()
					})
				}
			})
		},
		[hoveredId, results, asset.width, asset.height, loading],
	)

	useEffect(() => {
		const img = imgRef.current
		if (img?.complete) drawAnnotations()
		else img.onload = () => drawAnnotations()
	}, [drawAnnotations])

	return { canvasRef, imgRef, drawAnnotations }
}
