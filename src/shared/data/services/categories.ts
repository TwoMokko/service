import { Service } from "@/src/shared/data/services/items";

export interface Category {
	id: number;
	title: string;
	href: string;
	description: string;
	items: string[];
	meta: {
		title: string;
		description: string;
	};
}

export interface CategoryWithServices extends Omit<Category, "items"> {
	items: Service[];
}
export const categories = {
	"tekhnicheskoe-obsluzhivanie": {
		id: 1,
		title: "Техническое обслуживание",
		href: "tekhnicheskoe-obsluzhivanie",
		description:
			"Полный спектр работ по ТО автомобиля: замена масел, фильтров, технических жидкостей. Регулярное обслуживание для продления ресурса авто.",
		items: [
			"zamena-masla-v-dvigatele",
			"zamena-masla-v-mkpp",
			"zamena-vozdushnogo-filtra",
			"zamena-toplivnogo-filtra",
			"zamena-maslyanogo-filtra",
			"zamena-salonnogo-filtra",
			"zamena-ohlazhdayushchey-zhidkosti",
			"zamena-tormoznoy-zhidkosti",
		],
		meta: {
			title: "Техническое обслуживание автомобилей | Цены и услуги",
			description:
				"Техническое обслуживание всех марок авто. Замена масла, фильтров, жидкостей. Доступные цены.",
		},
	},

	"slesarnyj-remont": {
		id: 2,
		title: "Слесарный ремонт",
		href: "slesarnyj-remont",
		description:
			"Слесарный ремонт любой сложности: ремонт тормозной системы, замена сцепления, подшипников, сайлентблоков.",
		items: [
			"zamena-scepleniya",
			"remont-tormoznoj-sistemy",
			"zamena-podshipnika-stupitsy",
			"zamena-sajlentblokov",
			"remont-rulevogo-upravleniya",
		],
		meta: {
			title: "Слесарный ремонт автомобилей в Москве",
			description: "Профессиональный слесарный ремонт. Любая сложность. Гарантия.",
		},
	},

	"kuzovnoj-remont": {
		id: 3,
		title: "Кузовной ремонт",
		href: "kuzovnoj-remont",
		description:
			"Кузовной ремонт любой сложности: покраска, рихтовка, удаление вмятин без покраски, ремонт бамперов.",
		items: ["pokraska-avtomobilya", "udalenie-vmyatin", "remont-bampera", "polirovka-kuzova"],
		meta: {
			title: "Кузовной ремонт автомобилей | Цены",
			description:
				"Качественный кузовной ремонт. Покраска, рихтовка, полировка. Работаем с любыми повреждениями.",
		},
	},

	shinomontazh: {
		id: 4,
		title: "Шиномонтаж",
		href: "shinomontazh",
		description:
			"Профессиональный шиномонтаж: сезонная замена, ремонт проколов, балансировка, правка дисков.",
		items: [
			"sezonnaya-zamena-shin",
			"remont-prokola-shiny",
			"balansirovka-koles",
			"pravka-diskov",
			"remont-bokovogo-poreza",
		],
		meta: {
			title: "Шиномонтаж в Москве | Цены на услуги",
			description:
				"Профессиональный шиномонтаж. Сезонное хранение шин. Ремонт проколов и порезов.",
		},
	},

	"kompyuternaya-diagnostika": {
		id: 5,
		title: "Компьютерная диагностика",
		href: "kompyuternaya-diagnostika",
		description:
			"Полная компьютерная диагностика всех систем автомобиля. Поиск ошибок и неисправностей.",
		items: ["diagnostika-dvigatelya", "diagnostika-elektroniki", "diagnostika-podveski"],
		meta: {
			title: "Компьютерная диагностика автомобилей",
			description:
				"Профессиональная диагностика двигателя, электроники, подвески. Современное оборудование.",
		},
	},

	"remont-konditsionera": {
		id: 6,
		title: "Ремонт кондиционера",
		href: "remont-konditsionera",
		description:
			"Полный спектр услуг по ремонту и обслуживанию автокондиционеров: заправка, диагностика, чистка.",
		items: [
			"zapravka-konditsionera",
			"diagnostika-konditsionera",
			"chistka-sistemy-konditsionirovaniya",
			"remont-kompressora-konditsionera",
		],
		meta: {
			title: "Ремонт и заправка кондиционеров авто",
			description:
				"Заправка, диагностика, ремонт автокондиционеров. Чистка системы от запахов.",
		},
	},

	"remont-dvigatelya": {
		id: 7,
		title: "Ремонт двигателя",
		href: "remont-dvigatelya",
		description:
			"Профессиональный ремонт двигателей любой сложности: от замены ГРМ до капремонта.",
		items: ["kapitalnyj-remont-dvigatelya", "zamena-remnya-grm"],
		meta: {
			title: "Ремонт двигателей в Москве | Цены",
			description:
				"Качественный ремонт двигателей. Замена ГРМ, капитальный ремонт. Гарантия.",
		},
	},

	"remont-elektrooborudovaniya": {
		id: 8,
		title: "Ремонт электрооборудования",
		href: "remont-elektrooborudovaniya",
		description: "Диагностика и ремонт электрооборудования: генераторы, стартеры, АКБ, оптика.",
		items: ["zamena-generatora", "zamena-startera", "zamena-akkumulyatora", "remont-far"],
		meta: {
			title: "Ремонт электрооборудования автомобилей",
			description: "Профессиональный ремонт генераторов, стартеров, замена АКБ, ремонт фар.",
		},
	},
} as const;

export type CategorySlug = keyof typeof categories;
