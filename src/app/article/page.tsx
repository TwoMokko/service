import { Metadata } from "next";

import { metaDataArticlePage, sectionTitles } from "@/src/shared/config";
import { SectionId } from "@/src/shared/types/types";
import { Breadcrumbs } from "@/src/shared/ui/breadcrumbs/Breadcrumbs";
import { Contacts } from "@/src/widgets/contact";
import { Rating } from "@/src/widgets/rating";

export const metadata: Metadata = metaDataArticlePage;

export default function ArticlePage() {
	const breadcrumbs = [
		{ title: "Главная", href: "/" },
		{ title: "Статьи", href: "/article" },
	];

	return (
		<div className="other-page">
			<Breadcrumbs items={breadcrumbs} />
			<div className="container block-bottom">
				<h1 className="page-title">article</h1>
			</div>
			<Contacts
				idSection={SectionId.CONTACTS}
				titleSection={sectionTitles[SectionId.CONTACTS]}
			/>
			<Rating />
		</div>
	);
}
