import {
	ReviewDesktopSlide,
	ReviewMobileSlide,
	ReviewPhotoCard,
	ReviewTextCard,
} from "@/src/shared/types/types";

const romanVPhoto: ReviewPhotoCard = {
	id: 1,
	type: "photo",
	author: {
		name: "Роман В.",
		date: "Сентябрь 2",
		avatarSrc: "/images/reviews/avatar-1.webp",
	},
	photoSrc: "/images/reviews/photo-1.webp",
};

const vyacheslavMPhoto: ReviewPhotoCard = {
	id: 2,
	type: "photo",
	author: {
		name: "Вячеслав М.",
		date: "Сентябрь 2",
		avatarSrc: "/images/reviews/avatar-2.webp",
	},
	photoSrc: "/images/reviews/photo-2.webp",
};

const pavelDPhoto: ReviewPhotoCard = {
	id: 3,
	type: "photo",
	author: {
		name: "Павел Д.",
		date: "Сентябрь 2",
		avatarSrc: null,
	},
	photoSrc: "/images/reviews/photo-3.webp",
};

const igorNPhoto: ReviewPhotoCard = {
	id: 4,
	type: "photo",
	author: {
		name: "Игорь Н.",
		date: "Сентябрь 2",
		avatarSrc: "/images/reviews/avatar-3.webp",
	},
	photoSrc: "/images/reviews/photo-4.webp",
};

const annaDPhoto: ReviewPhotoCard = {
	id: 5,
	type: "photo",
	author: {
		name: "Анна Д.",
		date: "Сентябрь 2",
		avatarSrc: "/images/reviews/avatar-4.webp",
	},
	photoSrc: "/images/reviews/photo-5.webp",
};

const mariaMPhoto: ReviewPhotoCard = {
	id: 6,
	type: "photo",
	author: {
		name: "Мария М.",
		date: "Сентябрь 2",
		avatarSrc: "/images/reviews/avatar-5.webp",
	},
	photoSrc: "/images/reviews/photo-6.webp",
};

const sergeyKText: ReviewTextCard = {
	id: 7,
	type: "text",
	author: {
		name: "Сергей К.",
		date: "Сентябрь 2",
		avatarSrc: "/images/reviews/avatar-text-1.webp",
	},
	text: "Приобрели Амбер Авто, спасибо Вадиму Н за подробный рассказ об авто👍",
	link: "https://yandex.ru/maps/org/178698124911/reviews?reviews%5BpublicId%5D=qprvwpnfwydrt3tqyv3d1ygg08&si=fup0zf9vy6nx3y6bgqmg2df09c&utm_source=review",
};

const evgenyChText: ReviewTextCard = {
	id: 8,
	type: "text",
	author: {
		name: "Евгений Ч.",
		date: "Сентябрь 3",
		avatarSrc: "/images/reviews/avatar-text-2.webp",
	},
	text: "Покупал автомобиль в этом прекрасном салоне, всё очень понравилось, быстро удобно, не навязывают никаких дополнительных услуг!!! Отличный автосалон, всем рекомендую 👍🏼👍🏼👍🏼",
	link: "https://yandex.ru/maps/org/178698124911/reviews?reviews%5BpublicId%5D=32dv3yv6bf5qk7gh7kcd9z22nm&si=fup0zf9vy6nx3y6bgqmg2df09c&utm_source=review",
};

export const reviewsDesktopSlides: ReviewDesktopSlide[] = [
	romanVPhoto,
	vyacheslavMPhoto,
	{
		id: 9,
		type: "double",
		items: [sergeyKText, evgenyChText],
	},
	pavelDPhoto,
	igorNPhoto,
	annaDPhoto,
	mariaMPhoto,
];

export const reviewsMobileSlides: ReviewMobileSlide[] = [
	igorNPhoto,
	evgenyChText,
	pavelDPhoto,
	sergeyKText,
	romanVPhoto,
	vyacheslavMPhoto,
	annaDPhoto,
	mariaMPhoto,
];
