'use client'

import { useCallback, useRef } from 'react'

import { useMemoizedFn } from './use-memoized-fn'

export function useSafeRequestFrame() {
	const requestIdRef = useRef<number | null>(null)

	const safeRequestFrame = useMemoizedFn((callback: () => void) => {
		if (requestIdRef.current !== null) {
			cancelAnimationFrame(requestIdRef.current)
		}
		requestIdRef.current = requestAnimationFrame(callback)
	})

	const cancelFrame = useMemoizedFn(() => {
		if (requestIdRef.current !== null) {
			cancelAnimationFrame(requestIdRef.current)
			requestIdRef.current = null
		}
	})

	return { safeRequestFrame, cancelFrame }
}