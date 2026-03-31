import { Metadata } from "next";

import { metaDataServicesPage, sectionTitles } from "@/src/shared/config";
import { SectionId } from "@/src/shared/types/types";
import { Contacts } from "@/src/widgets/contact";
import { Services } from "@/src/widgets/services";

export const metadata: Metadata = metaDataServicesPage;

export default function Policy() {
	return (
		<div className="other-page">
			<Services />
			<Contacts
				idSection={SectionId.CONTACTS}
				titleSection={sectionTitles[SectionId.CONTACTS]}
			/>
		</div>
	);
}
