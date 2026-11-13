import { Metadata } from "next";
import { notFound } from "next/navigation";

import { sectionTitles } from "@/src/shared/config";
import { getAllCategoriesWithServices, getServiceWithCategory } from "@/src/shared/data/services";
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
	params: Promise<{ categorySlug: string; serviceSlug: string }>;
}

export async function generateStaticParams() {
	return getAllCategoriesWithServices().flatMap((category) =>
		category.items.map((service) => ({
			categorySlug: category.slug,
			serviceSlug: service.slug,
		})),
	);
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
	const { categorySlug, serviceSlug } = await params;

	const service = getServiceWithCategory(serviceSlug);

	if (!service)
		return {
			title: "Услуга не найдена",
			description: "Страница услуги не найдена",
		};

	return service.meta;
}

export default async function ServicePage({ params }: ServicePageProps) {
	const { categorySlug, serviceSlug } = await params;

	const service = getServiceWithCategory(serviceSlug);

	if (!service || service.category.slug !== categorySlug) {
		notFound();
	}

	const breadcrumbs = [
		{ title: "Главная", href: "/" },
		{ title: "Услуги", href: "/services" },
		{ title: service.category.title, href: `/services/${categorySlug}` },
		{ title: service.title, href: `/services/${categorySlug}/${serviceSlug}` },
	];

	return (
		<div className="other-page">
			<Breadcrumbs items={breadcrumbs} />
			<ServicesPageInfo service={service} />
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
