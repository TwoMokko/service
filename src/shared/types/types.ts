import { ModalType } from "@/src/app/_providers/ModalProvider";

export interface Service {
	id: number;
	title: string;
	href: string;
	items: ServiceItem[];
}

export interface ServiceItem {
	title: string;
	href: string;
	description: string;
}
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
export type ModalData = SubmitModel | ReelsData | null;
export interface ReelsData {
	videos: ReelsItem[];
	initialIndex?: number;
}

export interface ReelsItem {
	id: string | number;
	url: string;
	title: string;
	subtitle: string;
	icon: string;
}
export interface ReviewAuthor {
	name: string;
	date: string;
	avatarSrc?: string | null;
}

export interface ReviewPhotoCard {
	id: number;
	type: "photo";
	author: ReviewAuthor;
	photoSrc: string;
}

export interface ReviewTextCard {
	id: number;
	type: "text";
	author: ReviewAuthor;
	text: string;
	link: string;
}

export interface ReviewDoubleSlide {
	id: number;
	type: "double";
	items: [ReviewTextCard, ReviewTextCard];
}

export type ReviewDesktopSlide = ReviewPhotoCard | ReviewDoubleSlide;
export type ReviewMobileSlide = ReviewPhotoCard | ReviewTextCard;

export interface SubmitModel {
	slug?: string;
	brand?: string;
	model?: string;
	equipment?: string;
	price?: number;
	reprice?: number;
	color?: string;
}
export interface SubmitData {
	name: string;
	phone: string;
	model?: SubmitModel;
}
export type FormData = Pick<SubmitData, "name" | "phone">;

export enum SectionId {
	SERVICES = "services",
	PRICE = "price",
	ABOUT = "about",
	REVIEWS = "reviews",
	ARTICLE = "article",
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
