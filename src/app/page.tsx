import { Metadata } from "next";

import { metaDataHomePage, sectionTitles } from "@/src/shared/config";
import { getServices } from "@/src/shared/data/services";
import { CategoryWithServices } from "@/src/shared/data/services/categories";
import { SectionId } from "@/src/shared/types/types";
import { About } from "@/src/widgets/about";
import { Brands } from "@/src/widgets/brand";
import { Contacts } from "@/src/widgets/contact";
import { FormSale, FormService } from "@/src/widgets/form";
import { Hero } from "@/src/widgets/hero";
import { PromoSwiper } from "@/src/widgets/promo";
import { Rating } from "@/src/widgets/rating";
import { Services } from "@/src/widgets/services/ui/Services";
import { ServicesPriceList } from "@/src/widgets/servicesPriceList";

export const metadata: Metadata = metaDataHomePage;

export default async function Home() {
	const services: CategoryWithServices[] = getServices();

	return (
		<>
			<Hero />

			<Services services={services} />
			<FormService />
			<Brands title="Официальный сервис брендовых автомобилей" />
			<FormSale />

			<ServicesPriceList services={services} title="Прайс-лист" />
			<PromoSwiper
				idSection={SectionId.PROMO}
				titleSection={sectionTitles[SectionId.PROMO]}
			/>
			<About />
			<Contacts
				idSection={SectionId.CONTACTS}
				titleSection={sectionTitles[SectionId.CONTACTS]}
			/>
			<Rating />
		</>
	);
}
