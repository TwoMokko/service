import { Metadata } from "next";

import { metaDataAboutPage, sectionTitles } from "@/src/shared/config";
import { SectionId } from "@/src/shared/types/types";
import { Breadcrumbs } from "@/src/shared/ui/breadcrumbs/Breadcrumbs";
import { Contacts } from "@/src/widgets/contact";
import { Rating } from "@/src/widgets/rating";
import { Reels } from "@/src/widgets/reels";
import { Reviews } from "@/src/widgets/reviews";

export const metadata: Metadata = metaDataAboutPage;

export default function Policy() {
	const breadcrumbs = [
		{ title: "Главная", href: "/" },
		{ title: "О нас", href: "/about" },
	];

	return (
		<div className="other-page">
			<Breadcrumbs items={breadcrumbs} />
			<div className="container block-bottom">
				<h1>О нас</h1>
				<p>баннер тут</p>
			</div>
			<Reels />
			<Reviews
				idSection={SectionId.REVIEWS}
				titleSection={sectionTitles[SectionId.REVIEWS]}
			/>
			<section className="container block-bottom">блок: О сервисе</section>
			<section className="container block-bottom">
				блок: Узнать подробнее о наших услугах
			</section>
			<Contacts
				idSection={SectionId.CONTACTS}
				titleSection={sectionTitles[SectionId.CONTACTS]}
			/>
			<Rating />
		</div>
	);
}
