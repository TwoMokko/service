import { Metadata } from "next";

import { metaDataPricePage, sectionTitles } from "@/src/shared/config";
import { getServices } from "@/src/shared/data/services";
import { CategoryWithServices } from "@/src/shared/data/services/categories";
import { SectionId } from "@/src/shared/types/types";
import { Breadcrumbs } from "@/src/shared/ui/breadcrumbs/Breadcrumbs";
import { Brands } from "@/src/widgets/brand";
import { Contacts } from "@/src/widgets/contact";
import { FormSale, FormService } from "@/src/widgets/form";
import { Rating } from "@/src/widgets/rating";
import { ServicesMini } from "@/src/widgets/services";
import { ServicesPriceList } from "@/src/widgets/servicesPriceList";

export const metadata: Metadata = metaDataPricePage;

export default function PricePage() {
	const services: CategoryWithServices[] = getServices();

	const breadcrumbs = [
		{ title: "Главная", href: "/" },
		{ title: "Прайс-лист", href: "/price" },
	];

	return (
		<div className="other-page">
			<Breadcrumbs items={breadcrumbs} />
			<div className="container block-bottom">
				<h1 className="page-title">Прайс-лист</h1>
			</div>
			<ServicesPriceList services={services} title="Цены по названию услуг" />
			<ServicesMini services={services} />
			<FormService />
			<div className="container block-bottom">
				<h2 className="section-title">Бренды</h2>
			</div>
			<Brands title="Официальный сервис брендовых автомобилей" />
			<FormSale />
			<Contacts
				idSection={SectionId.CONTACTS}
				titleSection={sectionTitles[SectionId.CONTACTS]}
			/>
			<Rating />
		</div>
	);
}
