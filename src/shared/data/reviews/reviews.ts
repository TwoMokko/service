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

export type ReviewSlide = ReviewPhotoCard | ReviewTextCard;

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

const sergeyKText2: ReviewTextCard = {
	id: 9,
	type: "text",
	author: {
		name: "Сергей К.",
		date: "Сентябрь 2",
		avatarSrc: "/images/reviews/avatar-text-1.webp",
	},
	text: "Приобрели Амбер Авто, спасибо Вадиму Н за подробный рассказ об авто👍",
	link: "https://yandex.ru/maps/org/178698124911/reviews?reviews%5BpublicId%5D=qprvwpnfwydrt3tqyv3d1ygg08&si=fup0zf9vy6nx3y6bgqmg2df09c&utm_source=review",
};

const evgenyChText2: ReviewTextCard = {
	id: 10,
	type: "text",
	author: {
		name: "Евгений Ч.",
		date: "Сентябрь 3",
		avatarSrc: "/images/reviews/avatar-text-2.webp",
	},
	text: "Покупал автомобиль в этом прекрасном салоне, всё очень понравилось, быстро удобно, не навязывают никаких дополнительных услуг!!! Отличный автосалон, всем рекомендую 👍🏼👍🏼👍🏼",
	link: "https://yandex.ru/maps/org/178698124911/reviews?reviews%5BpublicId%5D=32dv3yv6bf5qk7gh7kcd9z22nm&si=fup0zf9vy6nx3y6bgqmg2df09c&utm_source=review",
};
const evgenyChText3: ReviewTextCard = {
	id: 11,
	type: "text",
	author: {
		name: "Евгений Ч.",
		date: "Сентябрь 3",
		avatarSrc: "/images/reviews/avatar-text-2.webp",
	},
	text: "Покупал автомобиль в этом прекрасном салоне, всё очень понравилось, быстро удобно, не навязывают никаких дополнительных услуг!!! Отличный автосалон, всем рекомендую 👍🏼👍🏼👍🏼",
	link: "https://yandex.ru/maps/org/178698124911/reviews?reviews%5BpublicId%5D=32dv3yv6bf5qk7gh7kcd9z22nm&si=fup0zf9vy6nx3y6bgqmg2df09c&utm_source=review",
};

export const reviewsData: ReviewSlide[] = [
	evgenyChText,
	sergeyKText,
	evgenyChText2,
	sergeyKText2,
	evgenyChText3,
];
