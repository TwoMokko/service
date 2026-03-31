export interface Brands {
	[category: string]: string[];
}
export type BrandsKey = keyof typeof brandsData;

// уточнить какая логика разделения брендов
export const brandsData = {
	allBrands: ["tenet", "chery", "rox", "swm", "solaris", "amberauto", "kaiyi", "haima"],
	official44: ["tenet", "chery", "rox", "swm", "solaris", "amberauto", "kaiyi", "haima"],
	official33: ["tenet", "chery"],
	other: [""],
};
