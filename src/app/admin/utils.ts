import type {
	Category,
	CategorySlug,
	Service,
	ServiceSlug,
} from "@/src/shared/data/services/types";

export interface AdminData {
	categories: Record<CategorySlug, Category>;
	services: Record<ServiceSlug, Service>;
}

export function updateCategory(
	data: AdminData,
	slug: CategorySlug,
	changes: Partial<Category>,
): AdminData {
	return {
		...data,
		categories: {
			...data.categories,
			[slug]: {
				...data.categories[slug],
				...changes,
			},
		},
	};
}

export function updateService(
	data: AdminData,
	slug: ServiceSlug,
	changes: Partial<Service>,
): AdminData {
	return {
		...data,
		services: {
			...data.services,
			[slug]: {
				...data.services[slug],
				...changes,
			},
		},
	};
}

export function addService(data: AdminData, categorySlug: CategorySlug): AdminData {
	const category = data.categories[categorySlug];

	if (!category) return data;

	const maxId = Math.max(0, ...Object.values(data.services).map((service) => service.id));

	const id = maxId + 1;
	const slug = `new-service-${id}`;

	const newService: Service = {
		id,
		slug,
		title: "Новая услуга",
		shortDescription: "",
		description: "",
		price: 0,
		time: "30 мин",
		categorySlug,
		meta: {
			title: "Новая услуга",
			description: "",
		},
		items: [],
	};

	return {
		...data,
		services: {
			...data.services,
			[slug]: newService,
		},
		categories: {
			...data.categories,
			[categorySlug]: {
				...category,
				serviceSlugs: [...category.serviceSlugs, slug],
			},
		},
	};
}

export function deleteService(data: AdminData, serviceSlug: ServiceSlug): AdminData {
	const service = data.services[serviceSlug];

	if (!service) return data;

	const { [serviceSlug]: deleted, ...services } = data.services;
	const category = data.categories[service.categorySlug];

	if (!category) {
		return { ...data, services };
	}

	return {
		...data,
		services,
		categories: {
			...data.categories,
			[service.categorySlug]: {
				...category,
				serviceSlugs: category.serviceSlugs.filter((slug) => slug !== serviceSlug),
			},
		},
	};
}

export function addCategory(data: AdminData): AdminData {
	const maxId = Math.max(0, ...Object.values(data.categories).map((category) => category.id));

	const id = maxId + 1;
	const slug = `new-category-${id}`;

	const newCategory: Category = {
		id,
		slug,
		title: "Новая категория",
		description: "",
		serviceSlugs: [],
		meta: {
			title: "Новая категория",
			description: "",
		},
	};

	return {
		...data,
		categories: {
			...data.categories,
			[slug]: newCategory,
		},
	};
}

export function deleteCategory(data: AdminData, categorySlug: CategorySlug): AdminData {
	if (!data.categories[categorySlug]) return data;

	const { [categorySlug]: deleted, ...categories } = data.categories;

	const services = Object.fromEntries(
		Object.entries(data.services).filter(
			([, service]) => service.categorySlug !== categorySlug,
		),
	);

	return { categories, services };
}

// Переименование категории
export function renameCategory(data: AdminData, oldSlug: string, newSlug: string): AdminData {
	const slug = newSlug.trim();

	if (!slug) {
		throw new Error("Slug категории не может быть пустым");
	}

	if (oldSlug === slug) return data;

	if (data.categories[slug]) {
		throw new Error("Категория с таким slug уже существует");
	}

	const oldCategory = data.categories[oldSlug];

	if (!oldCategory) {
		throw new Error("Категория не найдена");
	}

	// Переносим категорию под новый ключ
	const { [oldSlug]: removedCategory, ...categories } = data.categories;

	const updatedCategories = {
		...categories,
		[slug]: {
			...removedCategory,
			slug,
		},
	};

	// Обновляем ссылки на категорию у услуг
	const updatedServices = Object.fromEntries(
		Object.entries(data.services).map(([serviceSlug, service]) => [
			serviceSlug,
			service.categorySlug === oldSlug ? { ...service, categorySlug: slug } : service,
		]),
	);

	return {
		categories: updatedCategories,
		services: updatedServices,
	};
}

// Переименование услуги
export function renameService(data: AdminData, oldSlug: string, newSlug: string): AdminData {
	const slug = newSlug.trim();

	if (!slug) {
		throw new Error("Slug услуги не может быть пустым");
	}

	if (oldSlug === slug) return data;

	if (data.services[slug]) {
		throw new Error("Услуга с таким slug уже существует");
	}

	const oldService = data.services[oldSlug];

	if (!oldService) {
		throw new Error("Услуга не найдена");
	}

	// Переносим услугу под новый ключ
	const { [oldSlug]: removedService, ...services } = data.services;

	const updatedServices = {
		...services,
		[slug]: {
			...removedService,
			slug,
		},
	};

	// Обновляем ссылку в категории
	const updatedCategories = Object.fromEntries(
		Object.entries(data.categories).map(([categorySlug, category]) => [
			categorySlug,
			{
				...category,
				serviceSlugs: category.serviceSlugs.map((serviceSlug) =>
					serviceSlug === oldSlug ? slug : serviceSlug,
				),
			},
		]),
	);

	return {
		categories: updatedCategories,
		services: updatedServices,
	};
}
