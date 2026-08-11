import { Article, ArticleSlug, articlesData } from "./articles";

export function getAllArticlesArray(): Article[] {
	return Object.values(articlesData);
}
export function getArticleBySlug(slug: string): Article {
	if (!(slug in articlesData)) {
		throw new Error(`Article "${slug}" not found`);
	}
	return articlesData[slug as ArticleSlug];
}
