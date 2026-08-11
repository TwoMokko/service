"use client";

import { useState } from "react";

import { Brand } from "@/src/shared/data/brands/brands";
import { Button } from "@/src/shared/ui/button/Button";
import { BrandsPriceList } from "@/src/widgets/brandsPriceList";

import styles from "./BrandsPriceList.module.scss";

interface BrandsPriceListNavProps {
	brands: Brand[];
}

export function BrandsPriceListNav({ brands }: BrandsPriceListNavProps) {
	const [activeBrand, setActiveBrand] = useState<Brand | null>(brands[0]);

	const handleBrand = (brand: Brand) => {
		if (brand.id === activeBrand?.id) {
			setActiveBrand(null);
			return;
		}

		setActiveBrand(brand);
	};

	return (
		<section className={`container block-bottom`} aria-label="Прайс-лист на услуги автосервиса">
			<h2 className={`${styles.title} section-title`}>Бренды</h2>
			<div className={styles.brandsNav__wrap}>
				<div className={styles.brandsNav__nav}>
					<div className={`${styles.brandsNav__nav_mob} desk-hide`}>
						<span>{activeBrand?.href}</span>
						<Button variant="secondary">Выбрать другую марку</Button>
					</div>
					<nav className="mob-hide">
						{brands.map((brand) => (
							<button
								key={brand.id}
								onClick={() => handleBrand(brand)}
								className={`${activeBrand?.id === brand.id ? styles.activeBrand : ""} ${styles.brandsNav__nav_item}`}
							>
								{brand.title}
							</button>
						))}
					</nav>
				</div>

				<div className={`${styles.brandsNav__content}`}>
					{brands.map((brand) => (
						<BrandsPriceList
							key={brand.id}
							pricesBrandData={brand.prices}
							logoUrl={`/images/brands/icons/${brand.href}.svg`}
							brandTitle={brand.title}
							className={`${styles.brandsNav__list} ${activeBrand?.id === brand.id ? styles.activeBrandListPrices : ""}`}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
