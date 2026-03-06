import { PropsWithChildren } from 'react'

import styles from './index.module.scss'

export const IconCard = ({ children }: PropsWithChildren) => (
	<span className={styles.modelCardIcon}>{children}</span>
)
