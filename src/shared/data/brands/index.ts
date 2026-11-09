import { Brand, BrandSlug, brands } from "./brands";

export const brandsTitlesData = {
	allBrands: Object.keys(brands) as BrandSlug[],
	salon1: (Object.keys(brands) as BrandSlug[]).filter((k) => brands[k].salon1),
	salon2: (Object.keys(brands) as BrandSlug[]).filter((k) => brands[k].salon2),
	salon3: (Object.keys(brands) as BrandSlug[]).filter((k) => brands[k].salon3),

	official: (Object.keys(brands) as BrandSlug[]).filter(
		(k) => brands[k].salon1 || brands[k].salon2 || brands[k].salon3,
	),

	other: (Object.keys(brands) as BrandSlug[]).filter(
		(k) => !brands[k].salon1 && !brands[k].salon2 && !brands[k].salon3,
	),
};

// Получить все бренды
export function getAllBrandsArray(): Brand[] {
	return Object.values(brands);
}

// Получить бренд по слагу (с проверкой, бросает ошибку)
export function getBrandBySlug(slug: string): Brand {
	if (!(slug in brands)) {
		throw new Error(`Brand "${slug}" not found`);
	}
	return brands[slug as BrandSlug];
}
