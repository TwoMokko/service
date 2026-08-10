import { Metadata } from "next";

import { metaDataAboutPage, sectionTitles } from "@/src/shared/config";
import { getServices } from "@/src/shared/data/services";
import { CategoryWithServices } from "@/src/shared/data/services/categories";
import { SectionId } from "@/src/shared/types/types";
import { Breadcrumbs } from "@/src/shared/ui/breadcrumbs/Breadcrumbs";
import { About } from "@/src/widgets/about";
import { Contacts } from "@/src/widgets/contact";
import { Rating } from "@/src/widgets/rating";
import { Reels } from "@/src/widgets/reels";
import { Reviews } from "@/src/widgets/reviews";
import { ServicesMini } from "@/src/widgets/services/ui/ServicesMini";

export const metadata: Metadata = metaDataAboutPage;

export default function AboutPage() {
	const services: CategoryWithServices[] = getServices();
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
			<About />
			<ServicesMini services={services} />
			<Contacts
				idSection={SectionId.CONTACTS}
				titleSection={sectionTitles[SectionId.CONTACTS]}
			/>
			<Rating />
		</div>
	);
}
