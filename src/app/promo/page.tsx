import { Metadata } from "next";

import { metaDataPromoPage, sectionTitles } from "@/src/shared/config";
import { SectionId } from "@/src/shared/types/types";
import { Breadcrumbs } from "@/src/shared/ui/breadcrumbs/Breadcrumbs";
import { Contacts } from "@/src/widgets/contact";
import { FormSale } from "@/src/widgets/form";
import { PromoGrid } from "@/src/widgets/promo";
import { Rating } from "@/src/widgets/rating";

export const metadata: Metadata = metaDataPromoPage;

export default function PromoPage() {
	const breadcrumbs = [
		{ title: "Главная", href: "/" },
		{ title: "Акции", href: "/promo" },
	];

	return (
		<div className="other-page">
			<Breadcrumbs items={breadcrumbs} />
			<div className="container">
				<h1 className="page-title">Акции</h1>
			</div>
			<FormSale />
			<PromoGrid />
			<Contacts
				idSection={SectionId.CONTACTS}
				titleSection={sectionTitles[SectionId.CONTACTS]}
			/>
			<Rating />
		</div>
	);
}
