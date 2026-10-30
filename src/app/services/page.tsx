import { Metadata } from "next";

import { metaDataServicesPage, sectionTitles } from "@/src/shared/config";
import { getServices } from "@/src/shared/data/services";
import { CategoryWithServices } from "@/src/shared/data/services";
import { SectionId } from "@/src/shared/types/types";
import { Banner } from "@/src/shared/ui/banner/Banner";
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

	const description = (
		<>
			Любые услуги по ремонту и обслуживанию автомобилей.
			<br />В стоимость услуг уже включены необходимые работы, запасные части и расходные
			материалы.
		</>
	);

	return (
		<div className="other-page">
			<Breadcrumbs items={breadcrumbs} />
			<Banner
				titlePage
				title="Услуги официального сервиса"
				description={description}
				imageSrc="/images/services/services-banner-desk.png"
			/>
			<Services services={services} />
			<Contacts
				idSection={SectionId.CONTACTS}
				titleSection={sectionTitles[SectionId.CONTACTS]}
			/>
			<Rating />
		</div>
	);
}
