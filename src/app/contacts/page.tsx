import { Metadata } from "next";

import { metaDataContactsPage, sectionTitles } from "@/src/shared/config";
import { SectionId } from "@/src/shared/types/types";
import { Breadcrumbs } from "@/src/shared/ui/breadcrumbs/Breadcrumbs";
import { Contacts } from "@/src/widgets/contact";
import { Rating } from "@/src/widgets/rating";

export const metadata: Metadata = metaDataContactsPage;

export default function Policy() {
	const breadcrumbs = [
		{ title: "Главная", href: "/" },
		{ title: "Контакты", href: "/contacts" },
	];

	return (
		<div className="other-page">
			<Breadcrumbs items={breadcrumbs} />
			<Contacts
				idSection={SectionId.CONTACTS}
				titleSection={sectionTitles[SectionId.CONTACTS]}
				titlePage
			/>
			<Rating />
		</div>
	);
}
