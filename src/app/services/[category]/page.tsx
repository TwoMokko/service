import { Metadata } from "next";

import { getAllCategorySlugs, getServiceCategory } from "@/src/shared/api/services";
import { sectionTitles } from "@/src/shared/config";
import { SectionId } from "@/src/shared/types/types";
import { Breadcrumbs } from "@/src/shared/ui/breadcrumbs/Breadcrumbs";
import { Contacts } from "@/src/widgets/contact";

interface ServicePageProps {
	params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
	return getAllCategorySlugs();
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
	const { category } = await params;

	try {
		const serviceCategory = getServiceCategory(category);
		return serviceCategory.meta;
	} catch {
		return {
			title: "Услуга не найдена",
			description: "Страница услуги не найдена",
		};
	}
}

export default async function CategoryPage({ params }: ServicePageProps) {
	const { category } = await params;
	const currentCategory = getServiceCategory(category);

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
			<Contacts
				idSection={SectionId.CONTACTS}
				titleSection={sectionTitles[SectionId.CONTACTS]}
			/>
		</div>
	);
}
