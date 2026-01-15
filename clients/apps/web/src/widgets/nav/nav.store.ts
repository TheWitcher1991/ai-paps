import { createEvent, createStore } from 'effector'

import { BreadcrumbsItem } from '@wcsc/toolkit'

export const setBreadcrumbs = createEvent<BreadcrumbsItem[]>()

export const $breadcrumbs = createStore<BreadcrumbsItem[]>([])

$breadcrumbs.on(setBreadcrumbs, (_, items) => items)
