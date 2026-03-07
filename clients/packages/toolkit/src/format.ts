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

export const formatDuration = (started_date, finished_date): string => {
    // Проверяем, есть ли дата начала
    if (!started_date) {
        return 'не начат';
    }

    // Парсим дату начала
    const startDate = new Date(started_date);
    
    // Определяем дату окончания (если процесс завершён, иначе - текущее время)
    let endDate: Date;
    if (finished_date) {
        endDate = new Date(finished_date);
    } else {
        endDate = new Date();
    }

    // Вычисляем разницу в миллисекундах
    const diffMs = endDate.getTime() - startDate.getTime();
    
    // Конвертируем в минуты и часы
    const totalMinutes = Math.floor(diffMs / (1000 * 60));
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    // Форматируем результат
    if (hours > 0 && minutes > 0) {
        return `${hours} ч ${minutes} мин`;
    } else if (hours > 0) {
        return `${hours} ч`;
    } else if (minutes > 0) {
        return `${minutes} мин`;
    } else {
        return 'менее минуты';
    }
}

export const removeHostInUrl = (url: string): string => {
	try {
		const urlObject = new URL(url)

		let result = urlObject.pathname

		if (urlObject.search) {
			result += urlObject.search
		}

		if (urlObject.hash) {
			result += urlObject.hash
		}

		return result || '/'
	} catch (error) {
		return url
	}
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
