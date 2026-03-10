import { SectionId } from "@/src/shared/types/types";

export const sectionTitles = {
	[SectionId.SERVICES]: "Услуги",
	[SectionId.PRICE]: "Прайс-лист",
	[SectionId.ABOUT]: "О нас",
	[SectionId.REVIEWS]: "Отзывы",
	[SectionId.ARTICLE]: "Статьи",
	[SectionId.CONTACTS]: "Контакты",
} as const;
