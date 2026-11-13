import {
	getCategoryWithServices,
} from "@/src/shared/data/services";
import { CategoryWithServices } from "@/src/shared/data/services/types";

import { Article, ArticleSlug } from "./types";
import rawData from "@/data/articles.json";

type ArticlesData = Record<ArticleSlug, Article>;

const articles = rawData as ArticlesData;

export function getAllArticles(): Article[] {
	return Object.values(articles);
}

export function getArticleBySlug(slug: ArticleSlug): Article | null {
	return articles[slug] ?? null;
}

export interface ArticleWithService extends Article {
	category: CategoryWithServices;
}

export function getAllArticlesWithService(): ArticleWithService[] {
	return getAllArticles()
		.map((article) => {
			const category = getCategoryWithServices(article.serviceSlug);
			if (!category) return null;
			return { ...article, category };
		})
		.filter((a): a is ArticleWithService => a !== null);
}
export function getArticleWithService(slug: ArticleSlug): ArticleWithService | null {
	const article = getArticleBySlug(slug);
	if (!article) return null;

	const category = getCategoryWithServices(article.serviceSlug);
	// нужно ли вместе с услугами?
	// const service = getServiceBySlug(article.serviceSlug);

	if (!category) return null;

	return {
		...article,
		category,
	};
}

type SimilarityKey = "serviceSlug";

export function getSimilarArticles(
	articleSlug: ArticleSlug,
	by: SimilarityKey = "serviceSlug",
	limit = 5,
): ArticleWithService[] {
	const current = getArticleBySlug(articleSlug);

	if (!current) return [];

	return getAllArticlesWithService()
		.filter((article) => article.slug !== current.slug && article[by] === current[by])
		.slice(0, limit);
}
