import { useStore } from 'effector-react'
import { $breadcrumbs } from './nav.store'

export function useBreadcrumbs() {
  return useStore($breadcrumbs)
}
