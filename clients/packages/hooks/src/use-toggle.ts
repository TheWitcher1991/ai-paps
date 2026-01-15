'use client'

import { Dispatch, SetStateAction, useCallback, useState } from 'react'

import { useMemoizedFn } from './use-memoized-fn'

export const useToggle = (
	init = false,
): [boolean, () => void, Dispatch<SetStateAction<boolean>>] => {
	const [value, setValue] = useState(init)

	const toggle = useMemoizedFn(() => {
		setValue(x => !x)
	})

	return [value, toggle, setValue]
}