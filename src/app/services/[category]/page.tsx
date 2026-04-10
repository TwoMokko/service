import { Metadata } from "next";
import { notFound } from "next/navigation";

import { sectionTitles } from "@/src/shared/config";
import { getAllCategorySlugs, getCategoryWithServices } from "@/src/shared/data/services";
import { SectionId } from "@/src/shared/types/types";
import { Breadcrumbs } from "@/src/shared/ui/breadcrumbs/Breadcrumbs";
import { Contacts } from "@/src/widgets/contact";
import { Rating } from "@/src/widgets/rating";

interface ServicePageProps {
	params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
	return getAllCategorySlugs();
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
	const { category } = await params;

	try {
		const categoryData = getCategoryWithServices(category);
		if (!categoryData) throw new Error("Category not found");
		return categoryData.meta;
	} catch {
		return {
			title: "Категория не найдена",
			description: "Страница категории не найдена",
		};
	}
}

export default async function CategoryPage({ params }: ServicePageProps) {
	const { category } = await params;

	let currentCategory;
	try {
		currentCategory = getCategoryWithServices(category);
		if (!currentCategory) throw new Error("Category not found");
	} catch {
		notFound();
	}

	const breadcrumbs = [
		{ title: "Главная", href: "/" },
		{ title: "Услуги", href: "/services" },
		{ title: currentCategory.title, href: `/services/${category}` },
	];

	return (
		<div className="other-page">
			<Breadcrumbs items={breadcrumbs} />
			<section className="container block-bottom">
				<h1>{currentCategory.title}</h1>
				<div>{currentCategory.description}</div>
			</section>
			<Contacts
				idSection={SectionId.CONTACTS}
				titleSection={sectionTitles[SectionId.CONTACTS]}
			/>
			<Rating />
		</div>
	);
}
