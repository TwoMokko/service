import { ReactNode } from "react";

import { brandsTitlesData } from "@/src/shared/data/brands";

import { BrandList } from "./BrandList";

import styles from "./Brands.module.scss";

interface BrandsProps {
	title: string;
	titlePage?: boolean;
}

export function Brands({ title, titlePage = false }: BrandsProps): ReactNode {
	const brandsData = {
		official: {
			title: "Официальный сервис",
			brands: [...brandsTitlesData.official44],
			showMoreBtn: false,
			className: styles.list__bg,
		},
		other: {
			title: "Другие обслуживаемые бренды",
			brands: [...brandsTitlesData.other],
			showMoreBtn: true,
			className: null,
		},
	};

	return (
		<section className="container block-bottom">
			{titlePage ? (
				<h1 className="page-title">{title}</h1>
			) : (
				<h2 className="section-title">{title}</h2>
			)}
			<BrandList {...brandsData.official} />
			<BrandList {...brandsData.other} />
		</section>
	);
}
