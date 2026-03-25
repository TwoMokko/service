import { SectionId } from "@/src/shared/types/types";

export const sectionTitles = {
	[SectionId.SERVICES]: "Услуги",
	[SectionId.BRANDS]: "Бренды",
	[SectionId.PRICE]: "Прайс-лист",
	[SectionId.ACTIONS]: "Акции",
	[SectionId.ABOUT]: "О нас",
	[SectionId.REVIEWS]: "Отзывы",
	[SectionId.ARTICLE]: "Статьи",
	[SectionId.CONTACTS]: "Контакты",
} as const;
