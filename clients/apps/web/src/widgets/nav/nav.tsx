'use client'

import { Person } from '@gravity-ui/icons'
import { ActionBar } from '@gravity-ui/navigation'
import { Button, Icon } from '@gravity-ui/uikit'
import { useRouter } from 'next/navigation'

import { DepartmentButton } from '~features/department'
import Notifications from '~features/notifications'
import { ThemeButton } from '~features/shared'

import { ImportButton } from '~features/import'

import { Breadcrumbs } from '~infra/ui'

import { useMemoizedFn } from '@wcsc/hooks'
import { href } from '@wcsc/href'

import { useBreadcrumbs } from './nav.hooks'
import styles from './nav.module.scss'

export default function Nav() {
	const items = useBreadcrumbs()

	const router = useRouter()

	const handleNewDocClick = useMemoizedFn(() => {
		router.push(href.workspace)
	})

	return (
		<ActionBar aria-label='Навигация' className={styles.nav}>
			<ActionBar.Section type='secondary'>
				<ActionBar.Group>
					<ActionBar.Item>
						<DepartmentButton />
					</ActionBar.Item>
				</ActionBar.Group>
			</ActionBar.Section>
			<ActionBar.Section type='primary'>
				<ActionBar.Group pull='left'>
					<ActionBar.Item>
						<Breadcrumbs items={items} />
					</ActionBar.Item>
				</ActionBar.Group>
				<ActionBar.Group pull='right'>
					<ActionBar.Item>
						<ImportButton />
					</ActionBar.Item>
					<ActionBar.Item>
						<ThemeButton />
					</ActionBar.Item>
					<ActionBar.Item>
						<Notifications />
					</ActionBar.Item>
					<ActionBar.Item>
						<Button view={'outlined'} onClick={handleNewDocClick}>
							<Icon data={Person} size={16} />
						</Button>
					</ActionBar.Item>
				</ActionBar.Group>
			</ActionBar.Section>
		</ActionBar>
	)
}
