export interface Rating {
	name: string;
	subtitle: string;
	location: "44-й км" | "Юг 33-й км";
	rating: string;
	link: string;
	linkTitle: string;
	bg: string;
	logo: string;
	brand: string;
}

export const ratingData: Rating[] = [
	{
		name: "avito",
		subtitle: "На основе 5 000 отзывов",
		location: "44-й км",
		rating: "4,9",
		link: "string",
		linkTitle: "Перейти в Авито",
		bg: "avito",
		logo: "avito",
		brand: "service",
	},
	{
		name: "yandex",
		subtitle: "На основе 216 отзывов",
		location: "44-й км",
		rating: "4,9",
		link: "string",
		linkTitle: "Перейти в Я.Карты",
		bg: "yandex",
		logo: "yandex",
		brand: "service",
	},
	{
		name: "2gis",
		subtitle: "На основе 44 отзывов",
		location: "44-й км",
		rating: "4,8",
		link: "string",
		linkTitle: "Перейти в 2ГИС",
		bg: "2gis",
		logo: "2gis",
		brand: "service",
	},
	{
		name: "otzovik",
		subtitle: "На основе 43 отзывов",
		location: "44-й км",
		rating: "4,1",
		link: "string",
		linkTitle: "Перейти в Отзовик",
		bg: "otzovik",
		logo: "otzovik",
		brand: "service",
	},
	{
		name: "2gis",
		subtitle: "На основе 2 отзывов",
		location: "Юг 33-й км",
		rating: "5,0",
		link: "string",
		linkTitle: "Перейти в 2ГИС",
		bg: "2gis",
		logo: "2gis",
		brand: "service",
	},
	{
		name: "yandex",
		subtitle: "На основе 45 отзывов",
		location: "Юг 33-й км",
		rating: "4,9",
		link: "string",
		linkTitle: "Перейти в Я.Карты",
		bg: "yandex",
		logo: "yandex",
		brand: "chery",
	},
	{
		name: "autospot",
		subtitle: "На основе 5 000 отзывов",
		location: "Юг 33-й км",
		rating: "5,0",
		link: "string",
		linkTitle: "Перейти в Autospot",
		bg: "autospot",
		logo: "autospot",
		brand: "chery",
	},
	{
		name: "yandex",
		subtitle: "На основе 24 отзывов",
		location: "Юг 33-й км",
		rating: "4,9",
		link: "string",
		linkTitle: "Перейти в Я.Карты",
		bg: "yandex",
		logo: "yandex",
		brand: "tenet",
	},
	{
		name: "autospot",
		subtitle: "На основе 5 000 отзывов",
		location: "Юг 33-й км",
		rating: "5,0",
		link: "string",
		linkTitle: "Перейти в Autospot",
		bg: "autospot",
		logo: "autospot",
		brand: "tenet",
	},
];
