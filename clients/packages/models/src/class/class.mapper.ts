import { ClassCon } from './class.enums'

export const ClassConMapper: Record<ClassCon, string> = {
	[ClassCon.leaf]: 'Лист',
	[ClassCon.stem]: 'Стебель',
	[ClassCon.flower]: 'Цветок',
	[ClassCon.fruit]: 'Плод',

	[ClassCon.tomato_leaf]: 'Лист томата',
	[ClassCon.tomato_stem]: 'Стебель томата',
	[ClassCon.tomato_root]: 'Корень томата',
	[ClassCon.tomato_flower]: 'Цветок томата',
	[ClassCon.tomato_bud]: 'Бутон томата',
	[ClassCon.tomato_fruit]: 'Плод томата',
	[ClassCon.tomato_plant]: 'Растение томата',
	[ClassCon.tomato_petiole]: 'Черешок томата',

	[ClassCon.tomato_powdery_mildew]: 'Мучнистая роса',

	[ClassCon.tomato_powdery_mildew_severity_1]: 'Мучнистая роса',
	[ClassCon.tomato_powdery_mildew_severity_2]: 'Мучнистая роса',
	[ClassCon.tomato_powdery_mildew_severity_3]: 'Мучнистая роса',
	[ClassCon.tomato_powdery_mildew_severity_4]: 'Мучнистая роса',
	[ClassCon.tomato_powdery_mildew_severity_5]: 'Мучнистая роса',
	[ClassCon.tomato_powdery_mildew_severity_6]: 'Мучнистая роса',
	[ClassCon.tomato_powdery_mildew_severity_7]: 'Мучнистая роса',
	[ClassCon.tomato_powdery_mildew_severity_8]: 'Мучнистая роса',

	[ClassCon.powdery_mildew]: 'Мучнистая роса',

	[ClassCon.powdery_mildew_severity_1]: 'Мучнистая роса',
	[ClassCon.powdery_mildew_severity_2]: 'Мучнистая роса',
	[ClassCon.powdery_mildew_severity_3]: 'Мучнистая роса',
	[ClassCon.powdery_mildew_severity_4]: 'Мучнистая роса',
	[ClassCon.powdery_mildew_severity_5]: 'Мучнистая роса',
	[ClassCon.powdery_mildew_severity_6]: 'Мучнистая роса',
	[ClassCon.powdery_mildew_severity_7]: 'Мучнистая роса',
	[ClassCon.powdery_mildew_severity_8]: 'Мучнистая роса',
}
