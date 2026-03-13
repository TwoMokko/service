import { type CategorySlug, categories } from "./categories";
import { Service, type ServiceSlug, serviceItems } from "./items";

export { type CategoryWithServices, type CategorySlug } from "./categories";
export { type Service, type ServiceSlug } from "./items";

// Получить все категории
export function getAllCategories() {
	return Object.values(categories);
}

// Получить категорию по слагу
export function getCategoryBySlug(slug: CategorySlug) {
	return categories[slug];
}

// Получить категорию с полными услугами (это пока для старой работы с данными в карточке выводится так, можно переписать)
export function getCategoryWithServices(slug: CategorySlug) {
	const category = categories[slug];
	if (!category) return null;

	return {
		...category,
		items: category.items.map((itemSlug) => serviceItems[itemSlug as ServiceSlug]),
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

	// категория с полными услугами (можно переписать получить только категорию по slug без инфо о всех услугах)
	const category = getCategoryWithServices(service.categoryId as CategorySlug);
	if (!category) return null;

	return {
		...service,
		category, // теперь это CategoryWithServices (с items = Service[]), а можно чтобы было items = string[]
	};
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

// Поиск услуг по категории
export function getServicesByCategory(categoryId: CategorySlug): Service[] {
	return categories[categoryId].items
		.map((slug) => serviceItems[slug as ServiceSlug])
		.filter(Boolean);
}
