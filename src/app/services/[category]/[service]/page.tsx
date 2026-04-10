import { Metadata } from "next";
import { notFound } from "next/navigation";

import { sectionTitles } from "@/src/shared/config";
import { getAllServiceSlugs, getServiceItem } from "@/src/shared/data/services";
import { SectionId } from "@/src/shared/types/types";
import { Breadcrumbs } from "@/src/shared/ui/breadcrumbs/Breadcrumbs";
import { Contacts } from "@/src/widgets/contact";
import { Rating } from "@/src/widgets/rating";

interface ServicePageProps {
	params: Promise<{ category: string; service: string }>;
}

export async function generateStaticParams() {
	return getAllServiceSlugs();
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
	const { category, service } = await params;

	try {
		const serviceItem = getServiceItem(category, service);
		return serviceItem.meta;
	} catch {
		return {
			title: "Услуга не найдена",
			description: "Страница услуги не найдена",
		};
	}
}

export default async function ServicePage({ params }: ServicePageProps) {
	const { category, service } = await params;

	let serviceItem;
	try {
		serviceItem = getServiceItem(category, service);
	} catch {
		notFound();
	}

	const breadcrumbs = [
		{ title: "Главная", href: "/" },
		{ title: "Услуги", href: "/services" },
		{ title: serviceItem.category.title, href: `/services/${category}` },
		{ title: serviceItem.title, href: `/services/${category}/${service}` },
	];

	return (
		<div className="other-page">
			<Breadcrumbs items={breadcrumbs} />
			<section className="container block-bottom">
				<h1>{serviceItem.title}</h1>
				<div>{serviceItem.description}</div>
				{serviceItem.price && <div>Цена: {serviceItem.price} ₽</div>}
				{serviceItem.time && <div>Время: {serviceItem.time}</div>}
			</section>
			<Contacts
				idSection={SectionId.CONTACTS}
				titleSection={sectionTitles[SectionId.CONTACTS]}
			/>
			<Rating />
		</div>
	);
}
