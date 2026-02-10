import { BASE_ROOT_URL } from '@wcsc/system'

type HrefSlug = string | number

export const hrefFactory = (entity: HrefSlug) => {
	const base = `${BASE_ROOT_URL}${entity}`
	return {
		get index() {
			return base
		},
		get create() {
			return `${base}/create`
		},
		edit(id: HrefSlug) {
			return `${base}/${id}/edit`
		},
		view(id: HrefSlug) {
			return `${base}/${id}`
		},
	}
}

export const href = {
	get root() {
		return BASE_ROOT_URL
	},

	get home() {
		return this.root
	},

	get workspace() {
		return `${this.root}workspace`
	},

	get dashboard() {
		return `${this.root}dashboard`
	},

	cvat: {
		index: '/workspace/cvat',
		projects: hrefFactory('workspace/cvat/projects'),
		tasks: hrefFactory('workspace/cvat/tasks'),
		jobs: hrefFactory('workspace/cvat/jobs'),
		requests: hrefFactory('workspace/cvat/requests'),
	},

	directory: hrefFactory('workspace/directory'),

	projects: hrefFactory('workspace/projects'),

	recognitions: hrefFactory('workspace/recognitions'),

	datasets: hrefFactory('workspace/datasets'),

	models: hrefFactory('workspace/models'),

	users: hrefFactory('workspace/users'),

	guards: hrefFactory('workspace/guards'),
}
