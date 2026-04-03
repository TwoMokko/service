import { Metadata } from "next";

import { metaDataHomePage, sectionTitles } from "@/src/shared/config";
import { SectionId } from "@/src/shared/types/types";
import { Contacts } from "@/src/widgets/contact";
import { FormSale, FormService } from "@/src/widgets/form";
import { Hero } from "@/src/widgets/hero";
import { Promo } from "@/src/widgets/promo";
import { Rating } from "@/src/widgets/rating";
import { Services } from "@/src/widgets/services";

export const metadata: Metadata = metaDataHomePage;

export default async function Home() {
	return (
		<>
			<Hero />

			<Services />
			<FormService />
			<section className="container block-bottom">
				<h2 className="section-title">Официальный сервис брендовых автомобилей</h2>
			</section>
			<FormSale />
			<section className="container block-bottom">
				<h2 className="section-title">Прайс-лист</h2>
			</section>
			<Promo idSection={SectionId.PROMO} titleSection={sectionTitles[SectionId.PROMO]} />
			<section className="container block-bottom">
				<h2 className="section-title">О сервисе</h2>
			</section>
			<Contacts
				idSection={SectionId.CONTACTS}
				titleSection={sectionTitles[SectionId.CONTACTS]}
			/>
			<Rating />
		</>
	);
}
