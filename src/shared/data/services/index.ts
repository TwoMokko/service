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
	categoryId: string; // Это ключ категории в объекте categories
	meta: {
		title: string;
		description: string;
		keywords?: string[];
	};
	items: ServiceItem[];
}

export interface Category {
	id: number;
	title: string;
	href: string;
	// slug: string; // УДАЛЕНО - используем ключ объекта
	description: string;
	items: string[]; // Массив ключей услуг
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
	if (typeof window !== "undefined") {
		// На клиенте ничего не загружаем
		return;
	}

	try {
		const fs = require("fs");
		const path = require("path");
		const DATA_PATH = path.join(process.cwd(), "data/services.json");
		const raw = fs.readFileSync(DATA_PATH, "utf-8");
		const data = JSON.parse(raw);

		// Обновляем экспортируемые данные
		serviceItems = data.services || {};
		categories = data.categories || {};

		return data;
	} catch (error) {
		console.error("❌ Ошибка загрузки данных:", error);
		serviceItems = {};
		categories = {};
		return { services: {}, categories: {} };
	}
}

// Загружаем данные при старте (только на сервере)
if (typeof window === "undefined") {
	loadData();
}

// ============================================
// АСИНХРОННЫЕ ФУНКЦИИ ДЛЯ КЛИЕНТА
// ============================================

async function fetchData() {
	try {
		const res = await fetch("/api/admin/data");
		return await res.json();
	} catch {
		return { services: {}, categories: {} };
	}
}

export async function getServicesAsync(): Promise<CategoryWithServices[]> {
	const data = await fetchData();
	// Получаем все категории с их ключами
	return Object.entries(data.categories).map(([key, category]: [string, any]) => ({
		...category,
		// Добавляем ключ как slug для обратной совместимости
		slug: key,
		items: category.items.map((slug: string) => data.services[slug]).filter(Boolean),
	}));
}

export async function getAllCategoriesAsync() {
	const data = await fetchData();
	return Object.entries(data.categories).map(([key, category]: [string, any]) => ({
		...category,
		slug: key, // Добавляем ключ как slug
	}));
}

export async function getServicesByCategoryAsync(categoryId: string) {
	const data = await fetchData();
	const category = data.categories[categoryId];
	if (!category) return [];
	return category.items.map((slug: string) => data.services[slug]).filter(Boolean);
}

export async function getCategoryWithServicesAsync(slug: string) {
	const data = await fetchData();
	const category = data.categories[slug];
	if (!category) return null;
	return {
		...category,
		slug: slug, // Добавляем ключ как slug
		items: category.items.map((slug: string) => data.services[slug]).filter(Boolean),
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
	return Object.entries(categories).map(([key, category]) => ({
		...category,
		slug: key,
	}));
}

export function getCategoryBySlug(slug: CategorySlug) {
	const category = categories[slug];
	if (!category) return null;
	return {
		...category,
		slug: slug,
	};
}

export function getCategoryWithServices(slug: string) {
	const category = categories[slug as CategorySlug];
	if (!category) return null;
	return {
		...category,
		slug: slug, // Добавляем ключ как slug
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
	return category.items.map((slug: string) => serviceItems[slug as ServiceSlug]).filter(Boolean);
}

export function getServices(): CategoryWithServices[] {
	// Используем ключи категорий, а не поле slug
	return Object.entries(categories).map(([key, category]) => ({
		...category,
		slug: key, // Добавляем ключ как slug для совместимости
		items: category.items
			.map((slug: string) => serviceItems[slug as ServiceSlug])
			.filter(Boolean),
	}));
}

export function getServiceCategory(href: string): CategoryWithServices {
	// Ищем категорию по href
	const entry = Object.entries(categories).find(([key, category]) => category.href === href);
	if (!entry) throw new Error(`Category with href ${href} not found`);
	const [key, category] = entry;
	return {
		...category,
		// slug: key, // Убираем эту строку
		items: category.items
			.map((slug: string) => serviceItems[slug as ServiceSlug])
			.filter(Boolean),
	};
}

// export function getServiceItem(
// 	categoryHref: string,
// 	serviceSlug: string,
// ): Service & { category: CategoryWithServices } {
// 	const service = getServiceBySlug(serviceSlug as ServiceSlug);
// 	if (!service) throw new Error(`Service ${serviceSlug} not found`);
//
// 	const category = getServiceCategory(categoryHref);
// 	if (!category) throw new Error(`Category ${categoryHref} not found`);
//
// 	// Проверяем, что услуга принадлежит категории
// 	if (!category.items.some(s => s.href === serviceSlug)) {
// 		throw new Error(`Service ${serviceSlug} not found in category ${categoryHref}`);
// 	}
//
// 	return { ...service, category };
// }

export function getServiceItem(
	categoryHref: string,
	serviceSlug: string,
): Service & { category: CategoryWithServices } {
	// Ищем услугу по slug (ключу объекта)
	const service = getServiceBySlug(serviceSlug as ServiceSlug);
	if (!service) {
		// Если не нашли по slug, пробуем найти по href
		const entry = Object.entries(serviceItems).find(
			([key, s]) => s.href === serviceSlug || s.href.endsWith(`/${serviceSlug}`),
		);
		if (!entry) throw new Error(`Service ${serviceSlug} not found`);
		const [key, foundService] = entry;

		// Проверяем, что услуга принадлежит правильной категории
		const category = getServiceCategory(categoryHref);
		if (!category) throw new Error(`Category ${categoryHref} not found`);

		// Проверяем, что услуга есть в категории
		if (!category.items.some((s) => s.id === foundService.id)) {
			throw new Error(`Service ${serviceSlug} not found in category ${categoryHref}`);
		}

		return { ...foundService, category };
	}

	// Проверяем, что услуга принадлежит правильной категории
	const category = getServiceCategory(categoryHref);
	if (!category) throw new Error(`Category ${categoryHref} not found`);

	// Проверяем, что услуга есть в категории
	if (!category.items.some((s) => s.id === service.id)) {
		throw new Error(`Service ${serviceSlug} not found in category ${categoryHref}`);
	}

	return { ...service, category };
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

export function getCategoryByHref(href: string) {
	const entry = Object.entries(categories).find(([key, category]) => category.href === href);
	if (!entry) return null;
	const [key, category] = entry;
	return {
		...category,
		slug: key,
		items: category.items.map((itemSlug: string) => serviceItems[itemSlug as ServiceSlug]),
	};
}
