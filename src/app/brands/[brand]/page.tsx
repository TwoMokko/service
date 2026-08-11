import { Metadata } from "next";
import { notFound } from "next/navigation";

import { sectionTitles } from "@/src/shared/config";
import { getBrandBySlug } from "@/src/shared/data/brands";
import { getServices } from "@/src/shared/data/services";
import { CategoryWithServices } from "@/src/shared/data/services/categories";
import { SectionId } from "@/src/shared/types/types";
import { Breadcrumbs } from "@/src/shared/ui/breadcrumbs/Breadcrumbs";
import { About } from "@/src/widgets/about";
import { Brands } from "@/src/widgets/brand";
import { BrandsPriceListOnce } from "@/src/widgets/brandsPriceList";
import { Contacts } from "@/src/widgets/contact";
import { FormService } from "@/src/widgets/form";
import { Rating } from "@/src/widgets/rating";
import { Services } from "@/src/widgets/services";

interface BrandPageProps {
	params: Promise<{ brand: string }>;
}

export async function generateMetadata({ params }: BrandPageProps): Promise<Metadata> {
	const { brand } = await params;

	try {
		const brandData = getBrandBySlug(brand);
		return brandData.meta;
	} catch {
		return {
			title: "Бренд не найден",
			description: "Страница бренда не найдена",
		};
	}
}

export default async function BrandPage({ params }: BrandPageProps) {
	const services: CategoryWithServices[] = getServices();
	const { brand } = await params;

	let currentBrand;
	try {
		currentBrand = getBrandBySlug(brand);
	} catch {
		notFound();
	}

	const breadcrumbs = [
		{ title: "Главная", href: "/" },
		{ title: "Бренды", href: "/brands" },
		{ title: currentBrand.title, href: `/brands/${brand}` },
	];

	return (
		<div className="other-page">
			<Breadcrumbs items={breadcrumbs} />
			<section className="container block-bottom">
				<h1>{currentBrand.title}</h1>
				<p>{currentBrand.description}</p>
			</section>
			<BrandsPriceListOnce brand={currentBrand} />
			<Services services={services} />
			<section className="brand-info container block-bottom ">{currentBrand.text}</section>
			<About />
			<FormService />
			<Brands title="Официальный сервис брендовых автомобилей" />
			<Contacts
				idSection={SectionId.CONTACTS}
				titleSection={sectionTitles[SectionId.CONTACTS]}
			/>
			<Rating />
		</div>
	);
}
