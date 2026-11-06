import { Metadata } from "next";

import { metaDataContactsPage } from "@/src/shared/config";
import { Breadcrumbs } from "@/src/shared/ui/breadcrumbs/Breadcrumbs";
import { Brands } from "@/src/widgets/brand";
import { ContactsFull } from "@/src/widgets/contact";

export const metadata: Metadata = metaDataContactsPage;

export default function ContactsPage() {
	const breadcrumbs = [
		{ title: "Главная", href: "/" },
		{ title: "Контакты", href: "/contacts" },
	];

	return (
		<div className="other-page">
			<Breadcrumbs items={breadcrumbs} />
			<ContactsFull />
			<Brands title="Ремонт и обслуживание популярных брендов" />
		</div>
	);
}
