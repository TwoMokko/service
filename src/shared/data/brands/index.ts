import { Brand, BrandSlug, SalonId, brands } from "./brands";

export const allSalons: SalonId[] = ["salon1", "salon2", "salon3"];
const allBrandSlugs = Object.keys(brands) as BrandSlug[];

// бренд есть в конкретном салоне?
const isInSalon = (slug: BrandSlug, salon: SalonId) => brands[slug].salons.includes(salon);

export const brandsTitlesData = {
	allBrands: allBrandSlugs,

	// есть хотя бы в одном салоне
	official: allBrandSlugs.filter((slug) => brands[slug].salons.length > 0),

	// нет ни в одном салоне
	other: allBrandSlugs.filter((slug) => brands[slug].salons.length === 0),

	// динамически: salon1 / salon2 / salon3
	...Object.fromEntries(
		allSalons.map((salon) => [salon, allBrandSlugs.filter((slug) => isInSalon(slug, salon))]),
	),
} as {
	allBrands: BrandSlug[];
	official: BrandSlug[];
	other: BrandSlug[];
} & Record<SalonId, BrandSlug[]>;

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
