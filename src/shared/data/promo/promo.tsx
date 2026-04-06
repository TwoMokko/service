import React from "react";

export interface Promo {
	id: string;
	title: React.ReactNode;
	subtitle: React.ReactNode;
	dateEnd: string;
	serviceTag: string;
	serviceHref: string; // должно совпадать с href услуги (если будет ссылаться на услугу)
	img: string;
}

export const promoData: Promo[] = [
	{
		id: "1",
		title: (
			<>
				Места под ручками оклеим <span className="text-primary">бесплатно</span>
			</>
		),
		subtitle: <p>При оклейке зон риска - Подарок</p>,
		dateEnd: "05.02.26",
		serviceTag: "Детейлинг",
		serviceHref: "detailing",
		img: "1.png",
	},
	{
		id: "2",
		title: <>Перезаправка кондиционера</>,
		subtitle: (
			<p className="promo__prices">
				<span className="text-primary">3000₽</span>
				<span className="text-strikethrough"> 4700₽</span>
			</p>
		),
		dateEnd: "string",
		serviceTag: "Техническое обслуживание",
		serviceHref: "detailing",
		img: "2.png",
	},
	{
		id: "3",
		title: (
			<>
				Проверка Сход-развала <span className="text-primary">со скидкой 50%</span>
			</>
		),
		subtitle: <p>Точный курс: Безупречная управляемость!</p>,
		dateEnd: "string",
		serviceTag: "Сход развал",
		serviceHref: "detailing",
		img: "3.png",
	},
	{
		id: "4",
		title: "string5",
		subtitle: "string",
		dateEnd: "string",
		serviceTag: "string",
		serviceHref: "detailing",
		img: "2.png",
	},
];
