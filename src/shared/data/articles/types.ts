import { Meta, ServiceSlug } from "@/src/shared/data/services/types";

export interface Article {
	slug: string;
	title: string;
	subtitle: ContentBlock[];
	content: ContentBlock[];
	dateEnd: string;
	serviceSlug: ServiceSlug;
	img: string;
	meta: Meta;
}
export type ArticleSlug = string;

export type ContentBlock =
	| {
			type: "paragraph";
			text: string;
	  }
	| {
			type: "heading";
			level: 2 | 3;
			text: string;
	  }
	| {
			type: "list";
			ordered?: boolean;
			items: string[];
	  }
	| {
			type: "image";
			src: string;
			alt: string;
	  }
	| {
			type: "price";
			price: number;
			oldPrice?: number;
	  };
