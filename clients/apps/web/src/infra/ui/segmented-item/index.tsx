import { Icon, IconData } from '@gravity-ui/uikit'
import cn from 'clsx'
import { PropsWithChildren } from 'react'

import styles from './index.module.scss'

interface SegmentedItemProps extends PropsWithChildren {
	active?: boolean
	height?: number
	minWidth?: number
	onClick?: () => void
	icon?: IconData
	view?: 'outline' | 'filled'
}

const activeView = {
	outline: styles.segmentedItemOutlineActive,
	filled: styles.segmentedItemFilledActive,
}

export const SegmentedItem = ({
	active,
	children,
	onClick,
	view = 'filled',
	height = 36,
	icon,
}: SegmentedItemProps) => {
	return (
		<div
			onClick={onClick}
			className={cn(styles.segmentedItem, active && activeView[view])}
			style={{
				height,
			}}
		>
			{icon && <Icon data={icon} size={16} />}
			{children}
		</div>
	)
}
