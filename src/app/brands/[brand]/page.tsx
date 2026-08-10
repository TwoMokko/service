import { Metadata } from "next";
import { notFound } from "next/navigation";

import { sectionTitles } from "@/src/shared/config";
import { getBrandBySlug } from "@/src/shared/data/brands";
import { SectionId } from "@/src/shared/types/types";
import { Breadcrumbs } from "@/src/shared/ui/breadcrumbs/Breadcrumbs";
import { Contacts } from "@/src/widgets/contact";
import { Rating } from "@/src/widgets/rating";

interface ServicePageProps {
	params: Promise<{ brand: string }>;
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
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

export default async function BrandPage({ params }: ServicePageProps) {
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
				<div>{currentBrand.description}</div>
			</section>
			<Contacts
				idSection={SectionId.CONTACTS}
				titleSection={sectionTitles[SectionId.CONTACTS]}
			/>
			<Rating />
		</div>
	);
}
