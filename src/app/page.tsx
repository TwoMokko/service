import { Metadata } from "next";

import { metaDataHomePage, sectionTitles } from "@/src/shared/config";
import { SectionId } from "@/src/shared/types/types";
import { Actions } from "@/src/widgets/actions";
import { Contacts } from "@/src/widgets/contact";
import { Hero } from "@/src/widgets/hero";
import { Rating } from "@/src/widgets/rating";
import { Services } from "@/src/widgets/services";

export const metadata: Metadata = metaDataHomePage;

export default async function Home() {
	return (
		<>
			<Hero />

			<Services />
			<Actions
				idSection={SectionId.ACTIONS}
				titleSection={sectionTitles[SectionId.ACTIONS]}
			/>
			<Contacts
				idSection={SectionId.CONTACTS}
				titleSection={sectionTitles[SectionId.CONTACTS]}
			/>
			<Rating />
		</>
	);
}
