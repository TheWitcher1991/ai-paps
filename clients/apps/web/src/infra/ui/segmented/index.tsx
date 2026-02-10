import cn from 'clsx'
import { type PropsWithChildren } from 'react'

import styles from './index.module.scss'

interface SegmentedProps extends PropsWithChildren {
	width?: 'auto' | 'max'
}

export const Segmented = ({ children, width }: SegmentedProps) => (
	<div
		className={cn(
			styles.segmented,
			width === 'max' && styles.segmentedWidth,
		)}
	>
		{children}
	</div>
)
