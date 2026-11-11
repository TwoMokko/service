import { Metadata } from "next";

import { metaDataArticlePage, sectionTitles } from "@/src/shared/config";
import { getAllArticlesArray } from "@/src/shared/data/articles";
import { Article } from "@/src/shared/data/articles/articles";
import { SectionId } from "@/src/shared/types/types";
import { Breadcrumbs } from "@/src/shared/ui/breadcrumbs/Breadcrumbs";
import { ArticleGrid } from "@/src/widgets/articles";
import { Contacts } from "@/src/widgets/contact";
import { Rating } from "@/src/widgets/rating";

export const metadata: Metadata = metaDataArticlePage;

export default function ArticlePage() {
	const allArticles: Article[] = getAllArticlesArray();
	const breadcrumbs = [
		{ title: "Главная", href: "/" },
		{ title: "Статьи", href: "/articles" },
	];

	return (
		<div className="other-page">
			<Breadcrumbs items={breadcrumbs} />
			<h1 className="page-title container">Статьи</h1>
			<ArticleGrid articles={allArticles} />
			<Contacts
				idSection={SectionId.CONTACTS}
				titleSection={sectionTitles[SectionId.CONTACTS]}
			/>
			<Rating />
		</div>
	);
}
