// ============================================
// ДАННЫЕ
// ============================================
import rawData from "@/data/services.json";

// ============================================
// ТИПЫ
// ============================================

export interface ServiceItem {
	title: string;
	price: number;
}

export interface Meta {
	title: string;
	description: string;
	keywords?: string[];
}

export interface Service {
	id: number;
	href: string;
	title: string;
	shortDescription: string;
	description: string;
	price: number;
	time: string;
	categorySlug: string;
	meta: Meta;
	items: ServiceItem[];
}

export interface Category {
	id: number;
	title: string;
	href: string;
	description: string;
	serviceSlugs: string[];
	meta: Omit<Meta, "keywords">;
}

// Категория с добавленным slug — ключом из JSON
export type CategoryWithSlug = Category & {
	slug: string;
};

// Категория с услугами вместо списка slug
export type CategoryWithServices = CategoryWithSlug & {
	items: Service[];
};

export type ServiceWithCategory = Service & {
	category: CategoryWithServices;
};

interface ServicesData {
	services: Record<string, Service>;
	categories: Record<string, Category>;
}

const data = rawData as ServicesData;

export const serviceItems = data.services;
export const categories = data.categories;

// Slug — это ключ объекта в JSON.
// Оставляем string, так как slug также может приходить из URL.
export type ServiceSlug = string;
export type CategorySlug = string;

// ============================================
// ВНУТРЕННИЕ ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
// ============================================

function getCategoryEntryByHref(href: string) {
	return Object.entries(categories).find(([, category]) => category.href === href);
}

function getServiceEntryBySlugOrHref(slug: string) {
	// Сначала ищем по ключу объекта
	const directMatch = serviceItems[slug];

	if (directMatch) {
		return [slug, directMatch] as const;
	}

	// Если по ключу не нашли — ищем по href
	return (
		Object.entries(serviceItems).find(
			([, service]) => service.href === slug || service.href.endsWith(`/${slug}`),
		) ?? null
	);
}

function getServicesFromCategory(category: Category): Service[] {
	return category.serviceSlugs
		.map((slug) => serviceItems[slug])
		.filter((service): service is Service => Boolean(service));
}

// ============================================
// КАТЕГОРИИ
// ============================================

export function getAllCategories(): CategoryWithSlug[] {
	return Object.entries(categories).map(([slug, category]) => ({
		...category,
		slug,
	}));
}

export function getCategoryBySlug(slug: CategorySlug): CategoryWithSlug | null {
	const category = categories[slug];

	if (!category) return null;

	return {
		...category,
		slug,
	};
}

export function getCategoryWithServices(slug: CategorySlug): CategoryWithServices | null {
	const category = categories[slug];

	if (!category) return null;

	return {
		...category,
		slug,
		items: getServicesFromCategory(category),
	};
}

export function getCategoryByHref(href: string): CategoryWithServices | null {
	const entry = getCategoryEntryByHref(href);

	if (!entry) return null;

	const [slug, category] = entry;

	return {
		...category,
		slug,
		items: getServicesFromCategory(category),
	};
}

export function getServiceCategory(href: string): CategoryWithServices {
	const category = getCategoryByHref(href);

	if (!category) {
		throw new Error(`Category with href "${href}" not found`);
	}

	return category;
}

// ============================================
// УСЛУГИ
// ============================================

export function getServiceBySlug(slug: ServiceSlug): Service | null {
	return serviceItems[slug] ?? null;
}

export function getServicesByCategory(categorySlug: CategorySlug): Service[] {
	const category = categories[categorySlug];

	if (!category) return [];

	return getServicesFromCategory(category);
}

export function getServices(): CategoryWithServices[] {
	return Object.entries(categories).map(([slug, category]) => ({
		...category,
		slug,
		items: getServicesFromCategory(category),
	}));
}

export function getServiceWithCategory(slug: ServiceSlug): ServiceWithCategory | null {
	const service = getServiceBySlug(slug);

	if (!service) return null;

	const category = getCategoryWithServices(service.categorySlug);

	if (!category) return null;

	return {
		...service,
		category,
	};
}

// ============================================
// УСЛУГА НА СТРАНИЦЕ КАТЕГОРИИ
// ============================================

export function getServiceItem(categoryHref: string, serviceSlug: string): ServiceWithCategory {
	const category = getServiceCategory(categoryHref);
	const serviceEntry = getServiceEntryBySlugOrHref(serviceSlug);

	if (!serviceEntry) {
		throw new Error(`Service "${serviceSlug}" not found`);
	}

	const [slug, service] = serviceEntry;

	// Проверяем, что услуга действительно относится к категории
	if (!category.serviceSlugs.includes(slug)) {
		throw new Error(`Service "${serviceSlug}" not found in category "${categoryHref}"`);
	}

	return {
		...service,
		category,
	};
}

// ============================================
// SLUGS ДЛЯ СТАТИЧЕСКИХ СТРАНИЦ
// ============================================

export function getAllCategorySlugs() {
	return Object.keys(categories).map((slug) => ({
		category: slug,
	}));
}

export function getAllServiceSlugs() {
	return Object.entries(serviceItems).map(([slug, service]) => ({
		category: service.categorySlug,
		service: slug,
	}));
}
