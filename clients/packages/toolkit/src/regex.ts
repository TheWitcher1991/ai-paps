export const regexPatterns = {
	email: {
		value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
		message: 'Некорректный email',
	},
	password: {
		value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
		message: 'Пароль должен содержать минимум 8 символов',
	},
	numeric: {
		value: /^[0-9.,]+$/,
		message: 'Поле должно содержать только цифры',
	},
	alpha: {
		value: /^[А-Яа-яёЁA-Za-z]+$/,
		message: 'Поле должно содержать только буквы',
	},
	specialChars: {
		value: /[!@#$%^&*(),.?":{}|<>]$/,
		message: 'Поле должно содержать хотя бы один спецсимвол',
	},
	russianPhone: {
		value: /^\+7[\d+]{10}$/,
		message: 'Некорректный номер телефона',
	},
	url: {
		value: /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/gi,
		message: 'Некорректный url',
	},
	telegramUrl: {
		value: /^https:\/\/t\.me\/[\w\+\-]+$/,
		message: 'Некорректный telegram url',
	},
	tg: {
		value: /.*\B@(?=\w{5,32}\b)[a-zA-Z0-9]+(?:_[a-zA-Z0-9]+)*.*/gi,
		message: 'Некорректный telegram',
	},
	positive: {
		value: /^[1-9]\d*$/,
		message: 'Поле должно содержать только положительные числа',
	},
	decimal: {
		value: /^\d+(\.\d{1,2})?$/,
		message: 'Поле должно содержать только положительные числа',
	},
	cityWithRegion: {
		value: /^[А-Яа-я-]+(?:[\s-][А-Яа-я]+)?, [А-Яа-я]+(?:[\s-][А-Яа-я]+)*$/,
		message: 'Некорректное расположение. Формат: город, регион',
	},
	yandexCloudVideo: {
		value: /^https:\/\/runtime\.video\.cloud\.yandex\.net\/player\/video\/[A-Za-z0-9_-]+(?:\?[A-Za-z0-9._~=&%-]*)?$/i,
		message: 'Некорректный Yandex Video Video URL',
	},
}

export const defaultRules = {
	required: 'Это поле не может быть пустым',
	minLength: { value: 2, message: 'Поле должно содержать минимум 2 символа' },
}