import { Metadata } from "next";
import { notFound } from "next/navigation";

import { getServiceCategory } from "@/src/shared/api/services";
import { ServiceItem } from "@/src/shared/types/types";
import { Breadcrumbs } from "@/src/shared/ui/breadcrumbs/Breadcrumbs";

interface ServicePageProps {
	params: Promise<{ category: string; service: string }>;
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
	const { category, service } = await params;

	try {
		const serviceCategory = await getServiceCategory(category);
		const selectedItem = serviceCategory.items?.find((i: ServiceItem) => i.href === service);

		if (!selectedItem) {
			return {
				title: "Услуга не найдена",
				description: "Страница услуги не найдена",
			};
		}

		return {
			title: selectedItem.title,
			description: selectedItem.description,
		};
	} catch {
		return {
			title: "Услуга не найдена",
			description: "Страница услуги не найдена",
		};
	}
}

export default async function ServicePage({ params }: ServicePageProps) {
	const { category, service } = await params;
	const currentCategory = await getServiceCategory(category);

	const selectedItem = currentCategory.items?.find((i: ServiceItem) => i.href === service);

	if (!selectedItem) {
		notFound();
	}

	const breadcrumbs = [
		{ title: "Главная", href: "/" },
		{ title: "Услуги", href: "/services" },
		{ title: currentCategory.title, href: `/services/${category}` },
		{ title: selectedItem.title, href: `/services/${category}/${service}` },
	];

	return (
		<div className="other-page container">
			<Breadcrumbs items={breadcrumbs} />
			<h1>{selectedItem.title}</h1>

			<div>
				<div>{selectedItem.title}</div>
				<div>{selectedItem.description}</div>
			</div>
		</div>
	);
}
