import { Metadata } from "next";

import { metaDataPricePage, sectionTitles } from "@/src/shared/config";
import { getAllBrandsArray } from "@/src/shared/data/brands";
import { Brand } from "@/src/shared/data/brands/brands";
import { getServices } from "@/src/shared/data/services";
import { CategoryWithServices } from "@/src/shared/data/services";
import { SectionId } from "@/src/shared/types/types";
import { Breadcrumbs } from "@/src/shared/ui/breadcrumbs/Breadcrumbs";
import { Brands } from "@/src/widgets/brand";
import { BrandsPriceListNav } from "@/src/widgets/brandsPriceList";
import { Contacts } from "@/src/widgets/contact";
import { FormSale, FormService } from "@/src/widgets/form";
import { PricePageBanner } from "@/src/widgets/price";
import { Rating } from "@/src/widgets/rating";
import { ServicesMini } from "@/src/widgets/services";
import { ServicesPriceList } from "@/src/widgets/servicesPriceList";

export const metadata: Metadata = metaDataPricePage;

export default function PricePage() {
	const services: CategoryWithServices[] = getServices();
	const brands: Brand[] = getAllBrandsArray();

	const breadcrumbs = [
		{ title: "Главная", href: "/" },
		{ title: "Прайс-лист", href: "/price" },
	];

	return (
		<div className="other-page">
			<Breadcrumbs items={breadcrumbs} />
			<PricePageBanner title="Прайс-лист" titlePage />
			<ServicesPriceList services={services} title="Цены по названию услуг" />
			<ServicesMini services={services} />
			<FormService />
			<BrandsPriceListNav brands={brands} />
			<Brands title="Ремонт и обслуживание популярных брендов" />
			<FormSale />
			<Contacts
				idSection={SectionId.CONTACTS}
				titleSection={sectionTitles[SectionId.CONTACTS]}
			/>
			<Rating />
		</div>
	);
}
