export interface Service {
	id: number;
	slug: string;
	title: string;
	shortDescription: string;
	description: string;
	price: number;
	time: string;
	categoryId: string;
	meta: {
		title: string;
		description: string;
		keywords?: string[];
	};
}

export const serviceItems = {
	// Техническое обслуживание (8 услуг)
	"zamena-masla-v-dvigatele": {
		id: 1,
		slug: "zamena-masla-v-dvigatele",
		title: "Замена масла в двигателе",
		shortDescription: "Профессиональная замена масла",
		description:
			"Полная замена моторного масла с промывкой системы. Используем только качественные масла и фильтры.",
		price: 2500,
		time: "30 мин",
		categoryId: "tekhnicheskoe-obsluzhivanie",
		meta: {
			title: "Замена масла в двигателе | Автосервис",
			description: "Замена масла в двигателе по доступным ценам",
		},
	},
	"zamena-masla-v-mkpp": {
		id: 2,
		slug: "zamena-masla-v-mkpp",
		title: "Замена масла в МКПП",
		shortDescription: "Замена трансмиссионного масла",
		description: "Полная замена масла в механической коробке передач. Гарантия качества работ.",
		price: 1800,
		time: "20 мин",
		categoryId: "tekhnicheskoe-obsluzhivanie",
		meta: {
			title: "Замена масла в МКПП | Автосервис",
			description: "Профессиональная замена масла в МКПП",
		},
	},
	"zamena-vozdushnogo-filtra": {
		id: 3,
		slug: "zamena-vozdushnogo-filtra",
		title: "Замена воздушного фильтра",
		shortDescription: "Замена воздушного фильтра двигателя",
		description:
			"Замена воздушного фильтра с диагностикой системы впуска. Оригинальные и качественные аналоги.",
		price: 500,
		time: "10 мин",
		categoryId: "tekhnicheskoe-obsluzhivanie",
		meta: {
			title: "Замена воздушного фильтра | Автосервис",
			description: "Быстрая замена воздушного фильтра",
		},
	},
	"zamena-toplivnogo-filtra": {
		id: 4,
		slug: "zamena-toplivnogo-filtra",
		title: "Замена топливного фильтра",
		shortDescription: "Замена фильтра топливной системы",
		description:
			"Замена топливного фильтра с проверкой давления в системе. Для бензиновых и дизельных двигателей.",
		price: 1200,
		time: "30 мин",
		categoryId: "tekhnicheskoe-obsluzhivanie",
		meta: {
			title: "Замена топливного фильтра | Автосервис",
			description: "Профессиональная замена топливного фильтра",
		},
	},
	"zamena-maslyanogo-filtra": {
		id: 5,
		slug: "zamena-maslyanogo-filtra",
		title: "Замена масляного фильтра",
		shortDescription: "Замена масляного фильтра",
		description:
			"Замена масляного фильтра при замене масла. Только качественные фильтры известных брендов.",
		price: 300,
		time: "5 мин",
		categoryId: "tekhnicheskoe-obsluzhivanie",
		meta: {
			title: "Замена масляного фильтра | Автосервис",
			description: "Быстрая замена масляного фильтра",
		},
	},
	"zamena-salonnogo-filtra": {
		id: 6,
		slug: "zamena-salonnogo-filtra",
		title: "Замена салонного фильтра",
		shortDescription: "Замена фильтра салона",
		description:
			"Замена салонного фильтра. Обычные и угольные фильтры в наличии. Чистота воздуха в салоне.",
		price: 600,
		time: "10 мин",
		categoryId: "tekhnicheskoe-obsluzhivanie",
		meta: {
			title: "Замена салонного фильтра | Автосервис",
			description: "Замена салонного фильтра любой сложности",
		},
	},
	"zamena-ohlazhdayushchey-zhidkosti": {
		id: 7,
		slug: "zamena-ohlazhdayushchey-zhidkosti",
		title: "Замена охлаждающей жидкости",
		shortDescription: "Замена антифриза",
		description:
			"Полная замена охлаждающей жидкости с промывкой системы. Подбор антифриза по типу автомобиля.",
		price: 1500,
		time: "40 мин",
		categoryId: "tekhnicheskoe-obsluzhivanie",
		meta: {
			title: "Замена охлаждающей жидкости | Автосервис",
			description: "Профессиональная замена антифриза",
		},
	},
	"zamena-tormoznoy-zhidkosti": {
		id: 8,
		slug: "zamena-tormoznoy-zhidkosti",
		title: "Замена тормозной жидкости",
		shortDescription: "Замена тормозной жидкости",
		description:
			"Полная замена тормозной жидкости с прокачкой системы. Безопасность на дороге.",
		price: 1000,
		time: "30 мин",
		categoryId: "tekhnicheskoe-obsluzhivanie",
		meta: {
			title: "Замена тормозной жидкости | Автосервис",
			description: "Качественная замена тормозной жидкости",
		},
	},

	// Слесарный ремонт (5 услуг)
	"zamena-scepleniya": {
		id: 9,
		slug: "zamena-scepleniya",
		title: "Замена сцепления",
		shortDescription: "Замена комплекта сцепления",
		description:
			"Полная замена сцепления с регулировкой. Работа любой сложности на отечественных и иностранных авто.",
		price: 8000,
		time: "3 часа",
		categoryId: "slesarnyj-remont",
		meta: {
			title: "Замена сцепления | Автосервис",
			description: "Профессиональная замена сцепления",
		},
	},
	"remont-tormoznoj-sistemy": {
		id: 10,
		slug: "remont-tormoznoj-sistemy",
		title: "Ремонт тормозной системы",
		shortDescription: "Диагностика и ремонт тормозов",
		description:
			"Полная диагностика и ремонт тормозной системы. Замена колодок, дисков, суппортов.",
		price: 3000,
		time: "1 час",
		categoryId: "slesarnyj-remont",
		meta: {
			title: "Ремонт тормозной системы | Автосервис",
			description: "Профессиональный ремонт тормозов",
		},
	},
	"zamena-podshipnika-stupitsy": {
		id: 11,
		slug: "zamena-podshipnika-stupitsy",
		title: "Замена подшипника ступицы",
		shortDescription: "Замена ступичного подшипника",
		description:
			"Замена подшипника ступицы со снятием и установкой. Прессовка подшипников любой сложности.",
		price: 3500,
		time: "1.5 часа",
		categoryId: "slesarnyj-remont",
		meta: {
			title: "Замена подшипника ступицы | Автосервис",
			description: "Профессиональная замена ступичных подшипников",
		},
	},
	"zamena-sajlentblokov": {
		id: 12,
		slug: "zamena-sajlentblokov",
		title: "Замена сайлентблоков",
		shortDescription: "Замена резинометаллических шарниров",
		description: "Замена сайлентблоков рычагов подвески. Использование гидравлического пресса.",
		price: 4000,
		time: "2 часа",
		categoryId: "slesarnyj-remont",
		meta: {
			title: "Замена сайлентблоков | Автосервис",
			description: "Замена сайлентблоков любой сложности",
		},
	},
	"remont-rulevogo-upravleniya": {
		id: 13,
		slug: "remont-rulevogo-upravleniya",
		title: "Ремонт рулевого управления",
		shortDescription: "Диагностика и ремонт рулевой системы",
		description: "Ремонт рулевой рейки, замена наконечников, тяг. Диагностика люфтов.",
		price: 4500,
		time: "2 часа",
		categoryId: "slesarnyj-remont",
		meta: {
			title: "Ремонт рулевого управления | Автосервис",
			description: "Профессиональный ремонт рулевого управления",
		},
	},

	// Кузовной ремонт (4 услуги)
	"pokraska-avtomobilya": {
		id: 14,
		slug: "pokraska-avtomobilya",
		title: "Покраска автомобиля",
		shortDescription: "Полная или локальная покраска",
		description:
			"Качественная покраска автомобиля. Подбор краски, подготовка, нанесение, полировка.",
		price: 25000,
		time: "3-5 дней",
		categoryId: "kuzovnoj-remont",
		meta: {
			title: "Покраска автомобиля | Автосервис",
			description: "Профессиональная покраска автомобилей",
		},
	},
	"udalenie-vmyatin": {
		id: 15,
		slug: "udalenie-vmyatin",
		title: "Удаление вмятин без покраски",
		shortDescription: "PDR-ремонт вмятин",
		description: "Удаление вмятин без покраски методом PDR. Сохраняем заводское покрытие.",
		price: 2000,
		time: "30 мин",
		categoryId: "kuzovnoj-remont",
		meta: {
			title: "Удаление вмятин без покраски | Автосервис",
			description: "PDR-ремонт вмятин любой сложности",
		},
	},
	"remont-bampera": {
		id: 16,
		slug: "remont-bampera",
		title: "Ремонт бампера",
		shortDescription: "Восстановление пластикового бампера",
		description: "Ремонт трещин, сколов, деформаций бампера. Пайка, шпаклевка, покраска.",
		price: 3500,
		time: "1 день",
		categoryId: "kuzovnoj-remont",
		meta: {
			title: "Ремонт бампера | Автосервис",
			description: "Профессиональный ремонт бамперов",
		},
	},
	"polirovka-kuzova": {
		id: 17,
		slug: "polirovka-kuzova",
		title: "Полировка кузова",
		shortDescription: "Восстановительная или защитная полировка",
		description:
			"Восстановление ЛКП, удаление царапин, придание блеска. Защитная полировка керамикой.",
		price: 5000,
		time: "4 часа",
		categoryId: "kuzovnoj-remont",
		meta: {
			title: "Полировка кузова | Автосервис",
			description: "Качественная полировка кузова автомобиля",
		},
	},

	// Шиномонтаж (5 услуг)
	"sezonnaya-zamena-shin": {
		id: 18,
		slug: "sezonnaya-zamena-shin",
		title: "Сезонная замена шин",
		shortDescription: "Переобувка колес",
		description: "Сезонная замена шин с балансировкой. Хранение шин в подарок.",
		price: 2500,
		time: "1 час",
		categoryId: "shinomontazh",
		meta: {
			title: "Сезонная замена шин | Автосервис",
			description: "Профессиональный шиномонтаж",
		},
	},
	"remont-prokola-shiny": {
		id: 19,
		slug: "remont-prokola-shiny",
		title: "Ремонт прокола шины",
		shortDescription: "Герметизация прокола",
		description: "Быстрый ремонт прокола шины. Грибок или заплатка по ситуации.",
		price: 500,
		time: "20 мин",
		categoryId: "shinomontazh",
		meta: {
			title: "Ремонт прокола шины | Автосервис",
			description: "Быстрый ремонт проколов шин",
		},
	},
	"balansirovka-koles": {
		id: 20,
		slug: "balansirovka-koles",
		title: "Балансировка колес",
		shortDescription: "Компьютерная балансировка",
		description: "Динамическая балансировка колес на современном оборудовании.",
		price: 600,
		time: "15 мин",
		categoryId: "shinomontazh",
		meta: {
			title: "Балансировка колес | Автосервис",
			description: "Качественная балансировка колес",
		},
	},
	"pravka-diskov": {
		id: 21,
		slug: "pravka-diskov",
		title: "Правка дисков",
		shortDescription: "Восстановление геометрии дисков",
		description: "Правка литых и стальных дисков. Восстановление геометрии после ударов.",
		price: 1500,
		time: "1 час",
		categoryId: "shinomontazh",
		meta: {
			title: "Правка дисков | Автосервис",
			description: "Профессиональная правка дисков",
		},
	},
	"remont-bokovogo-poreza": {
		id: 22,
		slug: "remont-bokovogo-poreza",
		title: "Ремонт бокового пореза",
		shortDescription: "Восстановление боковины шины",
		description:
			"Ремонт боковых порезов шины методом вулканизации. Восстановление герметичности.",
		price: 1200,
		time: "40 мин",
		categoryId: "shinomontazh",
		meta: {
			title: "Ремонт бокового пореза шины | Автосервис",
			description: "Качественный ремонт боковых порезов",
		},
	},

	// Компьютерная диагностика (3 услуги)
	"diagnostika-dvigatelya": {
		id: 23,
		slug: "diagnostika-dvigatelya",
		title: "Диагностика двигателя",
		shortDescription: "Проверка всех систем двигателя",
		description: "Полная компьютерная диагностика двигателя. Поиск ошибок, анализ параметров.",
		price: 1500,
		time: "30 мин",
		categoryId: "kompyuternaya-diagnostika",
		meta: {
			title: "Диагностика двигателя | Автосервис",
			description: "Профессиональная диагностика двигателя",
		},
	},
	"diagnostika-elektroniki": {
		id: 24,
		slug: "diagnostika-elektroniki",
		title: "Диагностика электроники",
		shortDescription: "Проверка электронных систем",
		description: "Диагностика всех электронных блоков автомобиля. Поиск неисправностей.",
		price: 1500,
		time: "30 мин",
		categoryId: "kompyuternaya-diagnostika",
		meta: {
			title: "Диагностика электроники | Автосервис",
			description: "Диагностика электронных систем авто",
		},
	},
	"diagnostika-podveski": {
		id: 25,
		slug: "diagnostika-podveski",
		title: "Диагностика подвески",
		shortDescription: "Проверка ходовой части",
		description: "Полная диагностика подвески с выявлением люфтов и износа элементов.",
		price: 1000,
		time: "20 мин",
		categoryId: "kompyuternaya-diagnostika",
		meta: {
			title: "Диагностика подвески | Автосервис",
			description: "Профессиональная диагностика ходовой",
		},
	},

	// Ремонт кондиционера (4 услуги)
	"zapravka-konditsionera": {
		id: 26,
		slug: "zapravka-konditsionera",
		title: "Заправка кондиционера",
		shortDescription: "Заправка автокондиционера",
		description:
			"Заправка кондиционера с диагностикой системы. Вакуумирование, добавление масла.",
		price: 2000,
		time: "30 мин",
		categoryId: "remont-konditsionera",
		meta: {
			title: "Заправка кондиционера | Автосервис",
			description: "Профессиональная заправка автокондиционеров",
		},
	},
	"diagnostika-konditsionera": {
		id: 27,
		slug: "diagnostika-konditsionera",
		title: "Диагностика кондиционера",
		shortDescription: "Поиск неисправностей системы",
		description:
			"Полная диагностика системы кондиционирования. Поиск утечек, проверка давления.",
		price: 1000,
		time: "20 мин",
		categoryId: "remont-konditsionera",
		meta: {
			title: "Диагностика кондиционера | Автосервис",
			description: "Диагностика автокондиционеров",
		},
	},
	"chistka-sistemy-konditsionirovaniya": {
		id: 28,
		slug: "chistka-sistemy-konditsionirovaniya",
		title: "Чистка системы кондиционирования",
		shortDescription: "Антибактериальная обработка",
		description: "Чистка испарителя и всей системы от бактерий и неприятных запахов.",
		price: 2500,
		time: "1 час",
		categoryId: "remont-konditsionera",
		meta: {
			title: "Чистка системы кондиционирования | Автосервис",
			description: "Антибактериальная чистка автокондиционеров",
		},
	},
	"remont-kompressora-konditsionera": {
		id: 29,
		slug: "remont-kompressora-konditsionera",
		title: "Ремонт компрессора кондиционера",
		shortDescription: "Восстановление компрессора",
		description: "Диагностика и ремонт компрессора кондиционера. Замена муфты, подшипников.",
		price: 5000,
		time: "3 часа",
		categoryId: "remont-konditsionera",
		meta: {
			title: "Ремонт компрессора кондиционера | Автосервис",
			description: "Профессиональный ремонт компрессоров",
		},
	},

	// Ремонт двигателя (2 услуги)
	"kapitalnyj-remont-dvigatelya": {
		id: 30,
		slug: "kapitalnyj-remont-dvigatelya",
		title: "Капитальный ремонт двигателя",
		shortDescription: "Полное восстановление двигателя",
		description:
			"Капитальный ремонт двигателя любой сложности. Расточка, гильзовка, замена поршневой.",
		price: 45000,
		time: "5-7 дней",
		categoryId: "remont-dvigatelya",
		meta: {
			title: "Капитальный ремонт двигателя | Автосервис",
			description: "Профессиональный ремонт двигателей",
		},
	},
	"zamena-remnya-grm": {
		id: 31,
		slug: "zamena-remnya-grm",
		title: "Замена ремня ГРМ",
		shortDescription: "Замена ремня газораспределительного механизма",
		description: "Замена ремня ГРМ с проверкой натяжителей и роликов. Профилактика обрыва.",
		price: 4000,
		time: "2 часа",
		categoryId: "remont-dvigatelya",
		meta: {
			title: "Замена ремня ГРМ | Автосервис",
			description: "Профессиональная замена ремня ГРМ",
		},
	},

	// Ремонт электрооборудования (4 услуги)
	"zamena-generatora": {
		id: 32,
		slug: "zamena-generatora",
		title: "Замена генератора",
		shortDescription: "Диагностика и замена генератора",
		description:
			"Диагностика генератора, замена при необходимости. Проверка работы системы зарядки.",
		price: 3500,
		time: "1.5 часа",
		categoryId: "remont-elektrooborudovaniya",
		meta: {
			title: "Замена генератора | Автосервис",
			description: "Профессиональная замена генераторов",
		},
	},
	"zamena-startera": {
		id: 33,
		slug: "zamena-startera",
		title: "Замена стартера",
		shortDescription: "Диагностика и замена стартера",
		description: "Диагностика стартера, замена при неисправности. Проверка цепи питания.",
		price: 3000,
		time: "1.5 часа",
		categoryId: "remont-elektrooborudovaniya",
		meta: {
			title: "Замена стартера | Автосервис",
			description: "Замена стартеров любой сложности",
		},
	},
	"zamena-akkumulyatora": {
		id: 34,
		slug: "zamena-akkumulyatora",
		title: "Замена аккумулятора",
		shortDescription: "Подбор и замена АКБ",
		description: "Диагностика аккумулятора, подбор нового, замена с сохранением настроек.",
		price: 500,
		time: "10 мин",
		categoryId: "remont-elektrooborudovaniya",
		meta: {
			title: "Замена аккумулятора | Автосервис",
			description: "Быстрая замена аккумулятора",
		},
	},
	"remont-far": {
		id: 35,
		slug: "remont-far",
		title: "Ремонт фар",
		shortDescription: "Восстановление оптики",
		description: "Ремонт фар, полировка стекол, замена отражателей, установка линз.",
		price: 2500,
		time: "1 час",
		categoryId: "remont-elektrooborudovaniya",
		meta: {
			title: "Ремонт фар | Автосервис",
			description: "Профессиональный ремонт автомобильной оптики",
		},
	},
} as const satisfies Record<string, Service>;

export type ServiceSlug = keyof typeof serviceItems;
