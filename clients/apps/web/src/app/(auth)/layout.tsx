'use client'

import { Icon } from '@gravity-ui/uikit'
import { PropsWithChildren } from 'react'

import { projectConfig } from '~packages/system'

import styles from './layout.module.scss'

export default function AuthLayout({ children }: Readonly<PropsWithChildren>) {
	return (
		<div className={styles.auth__layout}>
			<div className={styles.logo}>
				<Icon
					data={projectConfig.icon}
					size={26}
					className={styles.logo__icon}
				/>
				{projectConfig.long_name}
			</div>
			{children}
		</div>
	)
}
