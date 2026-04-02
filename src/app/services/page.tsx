import { Metadata } from "next";

import { metaDataServicesPage, sectionTitles } from "@/src/shared/config";
import { SectionId } from "@/src/shared/types/types";
import { Breadcrumbs } from "@/src/shared/ui/breadcrumbs/Breadcrumbs";
import { Contacts } from "@/src/widgets/contact";
import { Rating } from "@/src/widgets/rating";
import { Services } from "@/src/widgets/services";

export const metadata: Metadata = metaDataServicesPage;

export default function Policy() {
	const breadcrumbs = [
		{ title: "Главная", href: "/" },
		{ title: "Услуги", href: "/services" },
	];

	return (
		<div className="other-page">
			<Breadcrumbs items={breadcrumbs} />
			<Services titlePage />
			<Contacts
				idSection={SectionId.CONTACTS}
				titleSection={sectionTitles[SectionId.CONTACTS]}
			/>
			<Rating />
		</div>
	);
}
