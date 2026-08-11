import { ReviewPhotoCard, ReviewTextCard } from "@/src/shared/data/reviews/reviews";

export interface Model {
	id: number;
	brand: string;
	name: string;
	price: number;
	recprice: number;
	slug: string;
	creditPay: number;
	colors: string[];
}
export interface Equipment {
	id: number;
	name: string;
	model: string;
	imagePath: string;
	brand: string;
	engine_capacity: number;
	power: string;
	kpp: string;
	drive: string;
}
export type ModalData = SubmitModel | ReelsData | ReviewModalData | null;
export interface ReelsData {
	videos: ReelsItem[];
	initialIndex?: number;
}

export type ReviewModalData = ReviewPhotoCard | ReviewTextCard;

export interface ReelsItem {
	id: string | number;
	url: string;
	title: string;
	subtitle: string;
	icon: string;
}

export interface SubmitModel {
	href?: string;
	brand?: string;
	model?: string;
	equipment?: string;
	price?: number;
	reprice?: number;
	color?: string;
}
export interface SubmitData {
	name?: string;
	phone: string;
	url: string;
	model?: SubmitModel;
}
export type FormData = Pick<SubmitData, "name" | "phone" | "url">;

export enum SectionId {
	SERVICES = "services",
	BRANDS = "brands",
	PRICE = "price",
	PROMO = "promo",
	ABOUT = "about",
	REVIEWS = "reviews",
	ARTICLE = "articles",
	CONTACTS = "contacts",
}

export type SectionKey = keyof typeof SectionId;

export interface NavigationLink {
	title: string;
	href: string;
}

export interface YaMapConfig {
	center: [number, number];
	zoom: number;
	address: string;
	apiKey: string;
}

export interface PinConfig {
	size: [number, number];
	offset: [number, number];
}

export interface YaMapProps {
	address: string;
	className?: string;
}

export interface UseYandexMapProps {
	address: string;
	isMobile: boolean;
}

export interface UseYandexMapReturn {
	mapRef: React.RefObject<HTMLDivElement | null>;
	isLoading: boolean;
	error: string | null;
}

export interface SearchResult {
	title: string;
	href: string;
	type: "category" | "service";
	description: string;
}
