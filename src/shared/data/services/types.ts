export interface Meta {
	title: string;
	description: string;
	keywords?: string[];
}

export interface PriceItem {
	title: string;
	price: number;
}

// Общие поля, которые нужны и категории, и услуге
export interface ServicePageBase {
	id: number;
	slug: string;
	title: string;
	description: string;
	meta: Meta;
}

// Категория в JSON
export interface Category extends ServicePageBase {
	serviceSlugs: string[];
}

// Услуга в JSON
export interface Service extends ServicePageBase {
	shortDescription: string;
	price: number;
	time: string;
	categorySlug: string;
	items: PriceItem[];
}

// Подготовленная категория с услугами
export interface CategoryWithServices extends Category {
	slug: string;
	items: Service[];
}

// Подготовленная услуга с родительской категорией
export interface ServiceWithCategory extends Service {
	slug: string;
	category: CategoryWithServices;
}

export type CategorySlug = string;
export type ServiceSlug = string;
