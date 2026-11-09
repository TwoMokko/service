// TODO: вынести данные в одно место и разделить где хелперы где что еще
import { brandsTitlesData } from "@/src/shared/data/brands";
import { About, ContactsSocialRatingItem } from "@/src/shared/types/types";

export const about: About = {
	email: "info@peleton.ru",
	time: "с 08:00 до 22:00",
	addresses: [
		{
			id: "first",
			name: "PELETON Автомолл",
			address: "Москва, квартал № 6, 3с1",
			phone: "+7 (495) 111 11 11",
			email: "info@peleton.ru",
			time: "с 08:00 до 22:00",
			brands: brandsTitlesData.salon1,
			gallery: [1, 2, 3, 4, 5, 6, 7, 8, 9],
		},
		{
			id: "second",
			name: "PELETON CHERY | TENET",
			address: "Москва, МКАД, 33-й км, 6с6",
			phone: "+7 (499) 688 84 31",
			email: "info@peleton.ru",
			time: "с 08:00 до 22:00",
			brands: brandsTitlesData.salon2,
			gallery: [1, 2, 3, 4, 5, 6],
		},
		{
			id: "third",
			name: "PELETON JELAND | OMODA",
			address: "Москва, МКАД, 33-й км, 6с7",
			phone: "+7 (499) 688 84 65",
			email: "info@peleton.ru",
			time: "с 08:00 до 22:00",
			brands: brandsTitlesData.salon3,
			gallery: [1, 2, 3, 4, 5, 6, 7, 8],
		},
	],
};

export const socialLinks = {
	instagram: "https://www.instagram.com/peleton_msk?igsh=MXYwZzMwdnFvaXRmaQ==",
	youtube: "https://youtube.com/@peleton_msk",
	vkontakte: "https://vk.com/peletonauto",
	telegram: "https://t.me/peletonofficial",
};

export const contactsSocialRating: ContactsSocialRatingItem[] = [
	{
		brand_logo: "service",
		social: "avito",
		rating: "4,9",
		stars_count: 5,
		reviews_count: 5000,
	},
	{
		brand_logo: "service",
		social: "yandex",
		rating: "4,9",
		stars_count: 5,
		reviews_count: 5000,
	},
	{
		brand_logo: "service",
		social: "2gis",
		rating: "4,9",
		stars_count: 5,
		reviews_count: 5000,
	},
	{
		brand_logo: "chery",
		social: "avito",
		rating: "4,9",
		stars_count: 5,
		reviews_count: 5000,
	},
	{
		brand_logo: "chery",
		social: "yandex",
		rating: "4,9",
		stars_count: 5,
		reviews_count: 5000,
	},
	{
		brand_logo: "chery",
		social: "2gis",
		rating: "4,9",
		stars_count: 5,
		reviews_count: 5000,
	},
	{
		brand_logo: "tenet",
		social: "avito",
		rating: "4,9",
		stars_count: 5,
		reviews_count: 5000,
	},
	{
		brand_logo: "tenet",
		social: "yandex",
		rating: "4,9",
		stars_count: 5,
		reviews_count: 5000,
	},
	{
		brand_logo: "tenet",
		social: "2gis",
		rating: "4,9",
		stars_count: 5,
		reviews_count: 5000,
	},
];
