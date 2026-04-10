import { Brand, BrandSlug, brands } from "./brands";

export const brandsTitlesData = {
	allBrands: Object.keys(brands) as BrandSlug[],
	official44: (Object.keys(brands) as BrandSlug[]).filter((key) => brands[key].isOfficial44),
	official33: (Object.keys(brands) as BrandSlug[]).filter((key) => brands[key].isOfficial33),
	other: (Object.keys(brands) as BrandSlug[]).filter(
		(key) => !brands[key].isOfficial44 && !brands[key].isOfficial33,
	),
};

// Получить все бренды
export function getAllBrands(): Brand[] {
	return Object.values(brands);
}

// Получить бренд по слагу (с проверкой, бросает ошибку)
export function getBrandBySlug(slug: string): Brand {
	if (!(slug in brands)) {
		throw new Error(`Brand "${slug}" not found`);
	}
	return brands[slug as BrandSlug];
}
