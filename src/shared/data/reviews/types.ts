export interface ReviewAuthor {
	name: string;
	date: string;
	avatarSrc?: string | null;
}

export interface ReviewBase {
	id: number;
	author: ReviewAuthor;
	rating: number;
	link?: string;
}

export interface ReviewPhoto {
	type: "photo";
	src: string;
	alt?: string;
}

export interface ReviewVideo {
	type: "video";
	src: string;
	poster: string;
	alt?: string;
}

type ReviewWithPhoto = ReviewBase & {
	media: ReviewPhoto[];
};

type ReviewWithVideo = ReviewBase & {
	media: ReviewVideo[];
};

export type Review =
	| (ReviewBase & {
			type: "text";
			text: string;
			media?: never;
	  })
	| (ReviewWithPhoto & {
			type: "photo";
			text?: never;
	  })
	| (ReviewWithVideo & {
			type: "video";
			text?: never;
	  })
	| (ReviewWithPhoto & {
			type: "text-photo";
			text: string;
	  })
	| (ReviewWithVideo & {
			type: "text-video";
			text: string;
	  });

export interface ReviewsData {
	reviews: Review[];
}
export type ReviewMedia = ReviewPhoto | ReviewVideo;
