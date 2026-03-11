import { Metadata } from "next";

import { getServiceCategory } from "@/src/shared/api/services";
import { Breadcrumbs } from "@/src/shared/ui/breadcrumbs/Breadcrumbs";

interface ServicePageProps {
	params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
	const { category } = await params;

	try {
		const serviceCategory = await getServiceCategory(category);

		return {
			title: serviceCategory.title,
			description: serviceCategory.description,
		};
	} catch {
		return {
			title: "Услуга не найдена",
			description: "Страница услуги не найдена",
		};
	}
}

export default async function ServicePage({ params }: ServicePageProps) {
	const { category } = await params;
	const currentCategory = await getServiceCategory(category);

	const breadcrumbs = [
		{ title: "Главная", href: "/" },
		{ title: "Услуги", href: "/services" },
		{ title: currentCategory.title, href: `/services/${category}` },
	];

	return (
		<div className="other-page container">
			<Breadcrumbs items={breadcrumbs} />
			<h1>{currentCategory.title}</h1>
			<div>{currentCategory.description}</div>
		</div>
	);
}
