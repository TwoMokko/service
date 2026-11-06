// TODO: вынести данные в одно место и разделить где хелперы где что еще
import { brandsTitlesData } from "@/src/shared/data/brands";
import { About, Address, AddressId } from "@/src/shared/types/types";

export const about: About = {
	email: "info@peleton.ru",
	time: "с 08:00 до 22:00",
	addresses: [
		{
			id: "first",
			name: "PELETON Автомолл",
			address: "Москва, МКАД, 44-й км, 1Вс2",
			phone: "+7 (495) 111 11-11",
			email: "info@peleton.ru",
			time: "с 08:00 до 22:00",
			brands: brandsTitlesData.official44.slice(0, 8),
		},
		{
			id: "second",
			name: "PELETON CHERY | TENET",
			address: "Москва, МКАД, 33-й км, 6с6",
			phone: "+7 499 688 84 31",
			email: "info@peleton.ru",
			time: "с 08:00 до 22:00",
			brands: brandsTitlesData.official33,
		},
		{
			id: "third",
			name: "PELETON JELAND | OMODA",
			address: "Москва, МКАД, 38-й км, аа",
			phone: "+7 499 688 84 65",
			email: "info@peleton.ru",
			time: "с 08:00 до 22:00",
			brands: brandsTitlesData.official44.slice(7, 10),
		},
	],
};

// TODO: бренды настроить
// const brandsByAddressId: Record<AddressId, string[]> = {
// 	first: brandsTitlesData.official44.slice(0, 8),
// 	second: brandsTitlesData.official33,
// 	third: brandsTitlesData.official44.slice(7, 10),
// };
// export const contactsData: Address[]  = about.addresses.map((a) => ({
// 	...a,
// 	brands: brandsByAddressId[a.id] ?? [],
// }));

export const socialLinks = {
	instagram: "https://www.instagram.com/peleton_msk?igsh=MXYwZzMwdnFvaXRmaQ==",
	youtube: "https://youtube.com/@peleton_msk",
	vkontakte: "https://vk.com/peletonauto",
	telegram: "https://t.me/peletonofficial",
};
