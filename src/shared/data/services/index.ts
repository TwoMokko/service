// ============================================
// ТИПЫ
// ============================================

export interface ServiceItem {
	title: string;
	price: number;
}

export interface Service {
	id: number;
	href: string;
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
	items?: ServiceItem[];
}

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

// ============================================
// ДАННЫЕ (пустые по умолчанию)
// ============================================

export let serviceItems: Record<string, Service> = {};
export let categories: Record<string, Category> = {};

export type ServiceSlug = keyof typeof serviceItems;
export type CategorySlug = keyof typeof categories;

// ============================================
// ФУНКЦИЯ ДЛЯ ЗАГРУЗКИ (только на сервере)
// ============================================

export function loadData() {
	if (typeof window !== 'undefined') {
		// На клиенте ничего не загружаем
		return;
	}

	try {
		const fs = require('fs');
		const path = require('path');
		const DATA_PATH = path.join(process.cwd(), 'data/services.json');
		const raw = fs.readFileSync(DATA_PATH, 'utf-8');
		const data = JSON.parse(raw);

		// Обновляем экспортируемые данные
		serviceItems = data.services || {};
		categories = data.categories || {};

		return data;
	} catch (error) {
		console.error('❌ Ошибка загрузки данных:', error);
		serviceItems = {};
		categories = {};
		return { services: {}, categories: {} };
	}
}

// Загружаем данные при старте (только на сервере)
if (typeof window === 'undefined') {
	loadData();
}

// ============================================
// АСИНХРОННЫЕ ФУНКЦИИ ДЛЯ КЛИЕНТА
// ============================================

async function fetchData() {
	try {
		const res = await fetch('/api/admin/data');
		return await res.json();
	} catch {
		return { services: {}, categories: {} };
	}
}

export async function getServicesAsync(): Promise<CategoryWithServices[]> {
	const data = await fetchData();
	return Object.values(data.categories).map((category: any) => ({
		...category,
		items: category.items.map((slug: string) => data.services[slug]).filter(Boolean)
	}));
}

export async function getAllCategoriesAsync() {
	const data = await fetchData();
	return Object.values(data.categories);
}

export async function getServicesByCategoryAsync(categoryId: string) {
	const data = await fetchData();
	const category = data.categories[categoryId];
	if (!category) return [];
	return category.items
		.map((slug: string) => data.services[slug])
		.filter(Boolean);
}

export async function getCategoryWithServicesAsync(slug: string) {
	const data = await fetchData();
	const category = data.categories[slug];
	if (!category) return null;
	return {
		...category,
		items: category.items.map((slug: string) => data.services[slug]).filter(Boolean)
	};
}

export async function getServiceBySlugAsync(slug: string) {
	const data = await fetchData();
	return data.services[slug] || null;
}

// ============================================
// СИНХРОННЫЕ ФУНКЦИИ (для сервера)
// ============================================

export function getAllCategories() {
	return Object.values(categories);
}

export function getCategoryBySlug(slug: CategorySlug) {
	return categories[slug];
}

export function getCategoryWithServices(slug: string) {
	const category = categories[slug as CategorySlug];
	if (!category) return null;
	return {
		...category,
		items: category.items.map((itemSlug: string) => serviceItems[itemSlug as ServiceSlug]),
	};
}

export function getServiceBySlug(slug: ServiceSlug) {
	return serviceItems[slug];
}

export function getServiceWithCategory(slug: ServiceSlug) {
	const service = serviceItems[slug];
	if (!service) return null;
	const category = getCategoryWithServices(service.categoryId as CategorySlug);
	if (!category) return null;
	return { ...service, category };
}

export function getServicesByCategory(categoryId: CategorySlug): Service[] {
	const category = categories[categoryId];
	if (!category) return [];
	return category.items
		.map((slug: string) => serviceItems[slug as ServiceSlug])
		.filter(Boolean);
}

export function getServices(): CategoryWithServices[] {
	return getAllCategories().map((category) => ({
		...category,
		items: getServicesByCategory(category.href as CategorySlug),
	}));
}

export function getServiceCategory(href: string): CategoryWithServices {
	const category = getCategoryWithServices(href as CategorySlug);
	if (!category) throw new Error(`Category ${href} not found`);
	return category;
}

export function getServiceItem(
	categoryHref: string,
	serviceSlug: string,
): Service & { category: CategoryWithServices } {
	const service = getServiceWithCategory(serviceSlug as ServiceSlug);
	if (!service || service.category.href !== categoryHref) {
		throw new Error(`Service ${serviceSlug} not found in category ${categoryHref}`);
	}
	return service;
}

export function getAllCategorySlugs() {
	return Object.keys(categories).map((slug) => ({ category: slug }));
}

export function getAllServiceSlugs() {
	return (Object.keys(serviceItems) as ServiceSlug[]).map((slug) => ({
		category: serviceItems[slug].categoryId,
		service: slug,
	}));
}