import { Metadata } from "next";
import { notFound } from "next/navigation";

import { sectionTitles } from "@/src/shared/config";
import {
	getAllArticles,
	getArticleBySlug,
	getArticleWithService,
	getSimilarArticles,
} from "@/src/shared/data/articles";
import { getAllCategoriesWithServices } from "@/src/shared/data/services";
import { SectionId } from "@/src/shared/types/types";
import { Breadcrumbs } from "@/src/shared/ui/breadcrumbs/Breadcrumbs";
import { ArticleContent, ArticleSwiper } from "@/src/widgets/articles";
import { Contacts } from "@/src/widgets/contact";
import { Rating } from "@/src/widgets/rating";
import { ServicesMini } from "@/src/widgets/services";

export const dynamicParams = false;
interface ArticlePageProps {
	params: Promise<{ articleSlug: string }>;
}

export function generateStaticParams() {
	return getAllArticles().map((article) => ({
		articleSlug: article.slug,
	}));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
	const { articleSlug } = await params;

	const articleData = getArticleBySlug(articleSlug);

	if (!articleData)
		return {
			title: "Категория не найдена",
			description: "Страница категории не найдена",
		};

	return articleData.meta;
}

export default async function ArticlePage({ params }: ArticlePageProps) {
	const { articleSlug } = await params;

	const article = getArticleWithService(articleSlug);

	if (!article) notFound();

	const categories = getAllCategoriesWithServices();

	const breadcrumbs = [
		{ title: "Главная", href: "/" },
		{ title: "Статьи", href: "/articles" },
		{ title: article.title, href: `/articles/${articleSlug}` },
	];

	const similarByService = getSimilarArticles(articleSlug);

	return (
		<div className="other-page">
			<Breadcrumbs items={breadcrumbs} />
			<ArticleContent article={article} />
			<ArticleSwiper articles={similarByService} />
			<ServicesMini services={categories} />
			<Contacts
				idSection={SectionId.CONTACTS}
				titleSection={sectionTitles[SectionId.CONTACTS]}
			/>
			<Rating />
		</div>
	);
}
