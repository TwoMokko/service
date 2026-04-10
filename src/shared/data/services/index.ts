import { type CategorySlug, CategoryWithServices, categories } from "./categories";
import { Service, type ServiceSlug, serviceItems } from "./items";

// Получить все категории
export function getAllCategories() {
	return Object.values(categories);
}

// Получить категорию по слагу
export function getCategoryBySlug(slug: CategorySlug) {
	return categories[slug];
}

// Получить категорию с полными услугами (это пока для старой работы с данными в карточке выводится так, можно переписать)
export function getCategoryWithServices(slug: string) {
	const category = categories[slug as CategorySlug];
	if (!category) return null;

	return {
		...category,
		items: category.items.map((itemSlug: string) => serviceItems[itemSlug as ServiceSlug]),
	};
}

// Получить услугу по слагу
export function getServiceBySlug(slug: ServiceSlug) {
	return serviceItems[slug];
}

// Получить услугу подкатегории с доп информацие о категории
export function getServiceWithCategory(slug: ServiceSlug) {
	const service = serviceItems[slug];
	if (!service) return null;

	const category = getCategoryWithServices(service.categoryId as CategorySlug);
	if (!category) return null;

	return {
		...service,
		category,
	};
}

// Поиск услуг по категории
export function getServicesByCategory(categoryId: CategorySlug): Service[] {
	return categories[categoryId].items
		.map((slug: string) => serviceItems[slug as ServiceSlug])
		.filter(Boolean);
}

// получение всех категорий и добавление массива услуг к каждой
export function getServices(): CategoryWithServices[] {
	return getAllCategories().map((category) => ({
		...category,
		items: getServicesByCategory(category.href as CategorySlug),
	}));
}

// получение информации только об одной категории по href/slug, но со всей инфо о подкатегориях
export function getServiceCategory(href: string): CategoryWithServices {
	const category = getCategoryWithServices(href as CategorySlug);
	if (!category) throw new Error(`Category ${href} not found`);
	return category;
}

// получение подкатегории с доп информацие о категории
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

// Для generateStaticParams
export function getAllCategorySlugs() {
	return Object.keys(categories).map((slug) => ({ category: slug }));
}

export function getAllServiceSlugs() {
	return (Object.keys(serviceItems) as ServiceSlug[]).map((slug) => ({
		category: serviceItems[slug].categoryId,
		service: slug,
	}));
}
