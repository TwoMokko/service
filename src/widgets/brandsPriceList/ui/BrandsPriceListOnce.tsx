"use client";

import { Brand } from "@/src/shared/data/brands/brands";
import { BrandsPriceList } from "@/src/widgets/brandsPriceList";

import styles from "./BrandsPriceList.module.scss";

interface BrandsPriceListOnceProps {
	brand: Brand;
}

export function BrandsPriceListOnce({ brand }: BrandsPriceListOnceProps) {
	return (
		<section
			className={`${styles.servicesPriceList} container block-bottom`}
			aria-label="Прайс-лист на услуги автосервиса"
		>
			<h2 className={`${styles.title} section-title`}>Прайс-лист</h2>

			<BrandsPriceList
				key={brand.id}
				pricesBrandData={brand.prices}
				logoUrl={`/images/brands/icons/${brand.href}.svg`}
				brandTitle={brand.title}
			/>
		</section>
	);
}
