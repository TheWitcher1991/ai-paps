import { useCallback, useState } from 'react'

import { useTimeoutCleanup } from './use-timeout-cleanup'

export const useTimerAnimation = (delay = 600) => {
	const [isAnimating, setIsAnimating] = useState(false)

	const setSafeTimeout = useTimeoutCleanup()

	const trigger = useCallback(() => {
		setIsAnimating(true)

		setSafeTimeout(() => setIsAnimating(false), delay)
	}, [delay, setIsAnimating, setSafeTimeout])

	return { isAnimating, trigger }
}