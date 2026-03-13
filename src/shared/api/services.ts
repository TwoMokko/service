import {
	type CategorySlug,
	type CategoryWithServices,
	type Service,
	type ServiceSlug,
	getAllCategories,
	getAllCategorySlugs,
	getAllServiceSlugs,
	getCategoryWithServices,
	getServiceWithCategory,
	getServicesByCategory,
} from "@/src/shared/data/services";

// получение всех категорий и добавление массива услуг к каждой (можно и без этого переписать, но и в компонентах переписать)
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

// Для статических путей в page.tsx
export { getAllCategorySlugs, getAllServiceSlugs };
