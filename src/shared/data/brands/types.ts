export type SalonId = "salon1" | "salon2" | "salon3";

export interface Brand {
	id: string;
	title: string;
	href: string;
	description: string;
	info: {
		content: {
			title: string;
			paragraphs: string[];
		}[];
		title?: string;
	};
	prices: BrandPrices[];
	meta: {
		title: string;
		description: string;
	};
	salons: SalonId[];
}

export interface BrandPrices {
	id: number;
	title: string;
	items: {
		title: string;
		subtitle: string;
		price: number;
	}[];
}

export type BrandSlug = string;
