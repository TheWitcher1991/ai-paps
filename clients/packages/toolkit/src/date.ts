import { Nullable } from '@fgis/types'

export function format(date: Date, formatStr: string): string {
	const pad = (n: number, width = 2) => n.toString().padStart(width, '0')

	const replacements: Record<string, string> = {
		yyyy: date.getFullYear().toString(),
		MM: pad(date.getMonth() + 1),
		dd: pad(date.getDate()),
		HH: pad(date.getHours()),
		mm: pad(date.getMinutes()),
		ss: pad(date.getSeconds()),
	}

	return formatStr.replace(
		/yyyy|MM|dd|HH|mm|ss/g,
		match => replacements[match],
	)
}

export function intervalToDuration({
	start,
	end,
}: {
	start: number | Date
	end: number | Date
}): {
	hours: number
	minutes: number
	seconds: number
} {
	const startMs = typeof start === 'number' ? start : start.getTime()
	const endMs = typeof end === 'number' ? end : end.getTime()

	let delta = Math.max(endMs - startMs, 0)

	const hours = Math.floor(delta / (1000 * 60 * 60))
	delta -= hours * 60 * 60 * 1000

	const minutes = Math.floor(delta / (1000 * 60))
	delta -= minutes * 60 * 1000

	const seconds = Math.floor(delta / 1000)

	return { hours, minutes, seconds }
}

export const formatDateInRu = (date: string): string => {
	if (!date) return '—'

	return format(new Date(date), 'dd.MM.yyyy')
}

export function formatMilliseconds(time: number): string {
	const min = Math.floor(time / 60)
	const sec = Math.floor(time - min * 60)

	return [min, sec].map(n => (n < 10 ? '0' + n : n)).join(':')
}

export function getEnding(value: number, type: 'мин' | 'сек' | 'ч'): string {
	if (!value) return ''

	if (value % 10 === 1 && value % 100 !== 11) {
		if (type === 'мин') return 'а'
		if (type === 'сек') return 'а'
		if (type === 'ч') return ''
	}

	if ([2, 3, 4].includes(value % 10) && ![12, 13, 14].includes(value % 100)) {
		if (type === 'мин') return 'ы'
		if (type === 'сек') return 'ы'
		if (type === 'ч') return 'а'
	}

	return ''
}

export function formatDuration(seconds: Nullable<number>): string {
	if (!seconds) return 'неизвестно'

	if (seconds <= 0 || isNaN(seconds)) return 'неизвестно'

	const duration = intervalToDuration({ start: 0, end: seconds * 1000 })

	const parts: string[] = []

	if (!duration.minutes && !duration.hours) {
		return `${seconds} сек`
	}

	if (duration.hours) {
		parts.push(`${duration.hours} ч`)
	}
	if (duration.minutes) {
		parts.push(`${duration.minutes} мин`)
	}
	if (duration.seconds && !duration.minutes && !duration.hours) {
		parts.push(`${duration.seconds} сек`)
	}

	return parts.join(' ')
}

export const formatYears = (years: number | string): string => {
	if (!years) {
		return ''
	}

	const numberYears = Number(years)

	const lastDigit = Number(numberYears) % 10

	if (numberYears % 100 >= 11 && numberYears % 100 <= 14) {
		return `${numberYears} лет`
	} else if (lastDigit === 1) {
		return `${numberYears} год`
	} else if (lastDigit >= 2 && lastDigit <= 4) {
		return `${numberYears} года`
	} else {
		return `${numberYears} лет`
	}
}
