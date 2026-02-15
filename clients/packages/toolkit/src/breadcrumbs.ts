import { href } from '@wcsc/href'
import { ResourceType } from '@wcsc/types'

export type BreadcrumbVariant = 'index' | 'create' | 'edit' | 'view'

export interface BreadcrumbsItem {
	text: string
	href: string
	action?: () => void
	icon?: string
}

export const breadcrumbsMapper: Record<
	Partial<ResourceType>,
	Record<BreadcrumbVariant, string>
> = {
	users: {
		index: 'Пользователи',
		create: 'Добавить пользователя',
		edit: 'Редактировать пользователя',
		view: 'Просмотр пользователя',
	},
	datasets: {
		index: 'Датасеты',
		create: 'Добавить датасет',
		edit: 'Редактировать датасет',
		view: 'Просмотр датасета',
	},
	models: {
		index: 'Модели',
		create: 'Добавить модель',
		edit: 'Редактировать модель',
		view: 'Просмотр модели',
	},
	assets: {
		index: 'Ассеты',
		create: 'Добавить ассет',
		edit: 'Редактировать ассет',
		view: 'Просмотр ассета',
	},
}

export interface GenerateBreadcrumbsOptions {
	resource: ResourceType
	variant: BreadcrumbVariant
	id?: number
}

export const generateBreadcrumbs = (
	resource: ResourceType,
	variant?: BreadcrumbVariant,
	id?: number,
): BreadcrumbsItem[] => {
	const baseText = breadcrumbsMapper[resource]['index']
	const baseHref = href[resource].index

	const breadcrumbs: BreadcrumbsItem[] = [{ text: baseText, href: baseHref }]

	switch (variant) {
		case 'create':
			breadcrumbs.push({
				text: breadcrumbsMapper[resource]['create'],
				href: href[resource].create,
			})
			break
		case 'edit':
			breadcrumbs.push({
				text: breadcrumbsMapper[resource]['edit'],
				href: id ? href[resource].edit(id) : '#',
			})
			break
		case 'view':
			breadcrumbs.push({
				text: breadcrumbsMapper[resource]['view'],
				href: id ? href[resource].view(id) : '#',
			})
			break
	}

	return breadcrumbs
}
