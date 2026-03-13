import { Metadata } from "next";
import { notFound } from "next/navigation";

import { getAllServiceSlugs, getServiceItem } from "@/src/shared/api/services";
import { Breadcrumbs } from "@/src/shared/ui/breadcrumbs/Breadcrumbs";

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
	const serviceItem = getServiceItem(category, service);

	if (!serviceItem) {
		notFound();
	}

	const breadcrumbs = [
		{ title: "Главная", href: "/" },
		{ title: "Услуги", href: "/services" },
		{ title: serviceItem.category.title, href: `/services/${category}` },
		{ title: serviceItem.title, href: `/services/${category}/${service}` },
	];

	return (
		<div className="other-page container">
			<Breadcrumbs items={breadcrumbs} />
			<h1>{serviceItem.title}</h1>
			<div>{serviceItem.description}</div>
			{serviceItem.price && <div>Цена: {serviceItem.price} ₽</div>}
			{serviceItem.time && <div>Время: {serviceItem.time}</div>}
		</div>
	);
}
