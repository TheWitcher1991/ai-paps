export const formatFileSize = (size: number): string => {
	if (size >= 1024 * 1024 * 1024) {
		return `${(size / (1024 * 1024 * 1024)).toFixed(2)} ГБ`
	} else if (size >= 1024 * 1024) {
		return `${(size / (1024 * 1024)).toFixed(2)} МБ`
	} else if (size >= 1024) {
		return `${(size / 1024).toFixed(2)} КБ`
	}
	return `${size} байт`
}

export const spaced = (val?: number | string): string => {
	if (!val) return '—'

	if (Number(val) < 10000) {
		return val.toString()
	}

	return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

export const formatBytes = (
	bytes?: number,
	system: 'b' | 'kb' | 'mb' | 'gb' = 'mb',
): string => {
	if (!bytes || bytes === 0) return '0 Б'

	switch (system) {
		case 'b':
			return `${spaced(bytes)} Б`
		case 'kb':
			return `${spaced((bytes / 1024).toFixed(2))} КБ`
		case 'mb':
			return `${spaced((bytes / (1024 * 1024)).toFixed(2))} МБ`
		case 'gb':
			return `${spaced((bytes / (1024 * 1024 * 1024)).toFixed(2))} ГБ`
		default:
			return `${spaced(bytes)} Б`
	}
}