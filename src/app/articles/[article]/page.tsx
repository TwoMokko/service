import { Metadata } from "next";
import { notFound } from "next/navigation";

import { sectionTitles } from "@/src/shared/config";
import { getArticleBySlug, getSimilarArticles } from "@/src/shared/data/articles";
import { getServices } from "@/src/shared/data/services";
import { CategoryWithServices } from "@/src/shared/data/services";
import { SectionId } from "@/src/shared/types/types";
import { Breadcrumbs } from "@/src/shared/ui/breadcrumbs/Breadcrumbs";
import { ArticleContent, ArticleSwiper } from "@/src/widgets/articles";
import { Contacts } from "@/src/widgets/contact";
import { Rating } from "@/src/widgets/rating";
import { ServicesMini } from "@/src/widgets/services";

interface ArticlePageProps {
	params: Promise<{ article: string }>;
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
	const { article } = await params;

	try {
		const articleData = getArticleBySlug(article);
		return articleData.meta;
	} catch {
		return {
			title: "Статья не найдена",
			description: "Страница статьи не найдена",
		};
	}
}

export default async function ArticlePage({ params }: ArticlePageProps) {
	const services: CategoryWithServices[] = getServices();
	const { article } = await params;

	let currentArticle;
	try {
		currentArticle = getArticleBySlug(article);
	} catch {
		notFound();
	}

	const breadcrumbs = [
		{ title: "Главная", href: "/" },
		{ title: "Статьи", href: "/articles" },
		{ title: currentArticle.title, href: `/articles/${article}` },
	];

	const similarByService = getSimilarArticles(article);

	return (
		<div className="other-page">
			<Breadcrumbs items={breadcrumbs} />
			<ArticleContent article={currentArticle} />
			<ArticleSwiper articles={similarByService} />
			<ServicesMini services={services} />
			<Contacts
				idSection={SectionId.CONTACTS}
				titleSection={sectionTitles[SectionId.CONTACTS]}
			/>
			<Rating />
		</div>
	);
}
