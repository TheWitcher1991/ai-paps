import { createStore, createEvent } from 'effector'

export interface BreadcrumbItem {
  text: string
  href?: string
}

export const $breadcrumbs = createStore<BreadcrumbItem[]>([])
export const setBreadcrumbs = createEvent<BreadcrumbItem[]>()

$breadcrumbs.on(setBreadcrumbs, (_, crumbs) => crumbs)
