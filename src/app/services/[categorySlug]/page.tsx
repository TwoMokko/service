import { Metadata } from "next";
import { notFound } from "next/navigation";

import { sectionTitles } from "@/src/shared/config";
import { getAllCategoriesWithServices, getCategoryWithServices } from "@/src/shared/data/services";
import { SectionId } from "@/src/shared/types/types";
import { Breadcrumbs } from "@/src/shared/ui/breadcrumbs/Breadcrumbs";
import { About } from "@/src/widgets/about";
import { Brands } from "@/src/widgets/brand";
import { Contacts } from "@/src/widgets/contact";
import { FormService } from "@/src/widgets/form";
import { Rating } from "@/src/widgets/rating";
import { ServicesPageInfo } from "@/src/widgets/services";

export const dynamicParams = false;
interface ServicePageProps {
	params: Promise<{ categorySlug: string }>;
}

export async function generateStaticParams() {
	return getAllCategoriesWithServices().map((category) => ({
		categorySlug: category.slug,
	}));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
	const { categorySlug } = await params;

	const category = getCategoryWithServices(categorySlug);

	if (!category)
		return {
			title: "Категория не найдена",
			description: "Страница категории не найдена",
		};

	return category.meta;
}

export default async function CategoryPage({ params }: ServicePageProps) {
	const { categorySlug } = await params;

	const category = getCategoryWithServices(categorySlug);

	if (!category) notFound();

	const breadcrumbs = [
		{ title: "Главная", href: "/" },
		{ title: "Услуги", href: "/services" },
		{ title: category.title, href: `/services/${categorySlug}` },
	];

	return (
		<div className="other-page">
			<Breadcrumbs items={breadcrumbs} />
			<ServicesPageInfo category={category} />
			<About />
			<FormService />
			<Brands title="Ремонт и обслуживание популярных брендов" />
			<Contacts
				idSection={SectionId.CONTACTS}
				titleSection={sectionTitles[SectionId.CONTACTS]}
			/>
			<Rating />
		</div>
	);
}
