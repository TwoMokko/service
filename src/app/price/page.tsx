import { Metadata } from "next";

import { metaDataPricePage, sectionTitles } from "@/src/shared/config";
import { getServices } from "@/src/shared/data/services";
import { CategoryWithServices } from "@/src/shared/data/services/categories";
import { SectionId } from "@/src/shared/types/types";
import { Breadcrumbs } from "@/src/shared/ui/breadcrumbs/Breadcrumbs";
import { Contacts } from "@/src/widgets/contact";
import { Rating } from "@/src/widgets/rating";
import { ServicesPriceList } from "@/src/widgets/servicesPriceList";

export const metadata: Metadata = metaDataPricePage;

export default function Policy() {
	const services: CategoryWithServices[] = getServices();

	const breadcrumbs = [
		{ title: "Главная", href: "/" },
		{ title: "Прайс-лист", href: "/price" },
	];

	return (
		<div className="other-page">
			<Breadcrumbs items={breadcrumbs} />
			<div className="container block-bottom">
				<h1 className="page-title">Price</h1>
			</div>
			<ServicesPriceList services={services} title="Цены по названию услуг" />
			<Contacts
				idSection={SectionId.CONTACTS}
				titleSection={sectionTitles[SectionId.CONTACTS]}
			/>
			<Rating />
		</div>
	);
}
