import { Metadata } from "next";

import { metaDataHomePage, sectionTitles } from "@/src/shared/config";
import { SectionId } from "@/src/shared/types/types";
import { Contacts } from "@/src/widgets/contact";
import { Hero } from "@/src/widgets/hero";
import { Services } from "@/src/widgets/services";

export const metadata: Metadata = metaDataHomePage;

export default async function Home() {
	return (
		<>
			<Hero />

			<Services />
			<Contacts
				idSection={SectionId.CONTACTS}
				titleSection={sectionTitles[SectionId.CONTACTS]}
			/>
		</>
	);
}
