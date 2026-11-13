import {
	Category,
	CategorySlug,
	CategoryWithServices,
	Service,
	ServiceSlug,
	ServiceWithCategory,
} from "./types";
import rawData from "@/data/services.json";

interface ServicesData {
	categories: Record<CategorySlug, Category>;
	services: Record<ServiceSlug, Service>;
}

const data = rawData as ServicesData;

export const categories = data.categories;
export const services = data.services;

export function getAllCategories(): Category[] {
	return Object.entries(categories).map(([slug, category]) => ({
		...category,
		slug,
	}));
}

export function getAllServices(): Service[] {
	return Object.entries(services).map(([slug, service]) => ({
		...service,
		slug,
	}));
}

export function getCategoryBySlug(slug: CategorySlug): Category | null {
	const category = categories[slug];

	return category ? { ...category, slug } : null;
}

export function getServiceBySlug(slug: ServiceSlug): Service | null {
	const service = services[slug];

	return service ? { ...service, slug } : null;
}

export function getServicesByCategory(categorySlug: CategorySlug): Service[] {
	const category = categories[categorySlug];

	if (!category) return [];

	return category.serviceSlugs
		.map((slug) => getServiceBySlug(slug))
		.filter((service): service is Service => service !== null);
}

export function getCategoryWithServices(slug: CategorySlug): CategoryWithServices | null {
	const category = getCategoryBySlug(slug);

	if (!category) return null;

	return {
		...category,
		items: getServicesByCategory(slug),
	};
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

export function getAllCategoriesWithServices(): CategoryWithServices[] {
	return getAllCategories()
		.map((category) => getCategoryWithServices(category.slug))
		.filter((category): category is CategoryWithServices => category !== null);
}
