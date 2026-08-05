import { Metadata } from "next";

import { metaDataServicesPage, sectionTitles } from "@/src/shared/config";
import { getServices } from "@/src/shared/data/services";
import { CategoryWithServices } from "@/src/shared/data/services/categories";
import { SectionId } from "@/src/shared/types/types";
import { Breadcrumbs } from "@/src/shared/ui/breadcrumbs/Breadcrumbs";
import { Contacts } from "@/src/widgets/contact";
import { Rating } from "@/src/widgets/rating";
import { Services } from "@/src/widgets/services/ui/Services";

export const metadata: Metadata = metaDataServicesPage;

export default function ServicesPage() {
	const services: CategoryWithServices[] = getServices();

	const breadcrumbs = [
		{ title: "Главная", href: "/" },
		{ title: "Услуги", href: "/services" },
	];

	return (
		<div className="other-page">
			<Breadcrumbs items={breadcrumbs} />
			<Services services={services} titlePage />
			<Contacts
				idSection={SectionId.CONTACTS}
				titleSection={sectionTitles[SectionId.CONTACTS]}
			/>
			<Rating />
		</div>
	);
}
