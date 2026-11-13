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

// все, кроме этой
// export function getSimilarArticles(articleSlug: string, limit = 5): Article[] {
// 	return Object.values(articlesData)
// 		.filter((article) => article.href !== articleSlug)
// 		.slice(0, limit);
// }

// все, кроме этой и по похожести
type SimilarityKey = "serviceTag" | "serviceHref";
export function getSimilarArticles(
	articleSlug: string,
	by: SimilarityKey = "serviceHref",
	limit = 5,
): Article[] {
	const current = Object.values(articlesData).find((a) => a.href === articleSlug);
	if (!current) return [];

	return Object.values(articlesData)
		.filter((a) => a.href !== articleSlug && a[by] === current[by])
		.slice(0, limit);
}
