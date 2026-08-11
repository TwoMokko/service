import { Metadata } from "next";
import Link from "next/link";

import { metaDataArticlePage, sectionTitles } from "@/src/shared/config";
import { getAllArticlesArray } from "@/src/shared/data/articles";
import { Article } from "@/src/shared/data/articles/articles";
import { SectionId } from "@/src/shared/types/types";
import { Breadcrumbs } from "@/src/shared/ui/breadcrumbs/Breadcrumbs";
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
			<div className="container block-bottom">
				<h1 className="page-title">article</h1>
				<div>
					{allArticles.map((itm) => (
						<div>
							<Link href={itm.href} prefetch={false}>
								{itm.title}
							</Link>
						</div>
					))}
				</div>
			</div>
			<Contacts
				idSection={SectionId.CONTACTS}
				titleSection={sectionTitles[SectionId.CONTACTS]}
			/>
			<Rating />
		</div>
	);
}
