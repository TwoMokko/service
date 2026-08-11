"use client";

import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

import Image from "next/image";

import { useModal } from "@/src/app/_providers/ModalProvider";
import { BrandPrices } from "@/src/shared/data/brands/brands";
import { formatPrice } from "@/src/shared/lib/utils/format-price";
import { Button } from "@/src/shared/ui/button/Button";

import styles from "./BrandsPriceList.module.scss";

interface BrandsPriceListProps {
	pricesBrandData: BrandPrices[];
	logoUrl: string;
	brandTitle: string;
	className?: string;
}
// TODO: дублирование!
export function BrandsPriceList({
	pricesBrandData,
	logoUrl,
	brandTitle,
	className,
}: BrandsPriceListProps) {
	const { openModal } = useModal();
	const [activeCategory, setActiveCategory] = useState<BrandPrices | null>(pricesBrandData[0]);

	const handleCategory = (category: BrandPrices) => {
		if (category.id === activeCategory?.id) {
			setActiveCategory(null);
			return;
		}

		setActiveCategory(category);
	};

	// TODO: разнести на компоненты
	return (
		<div className={`${styles.wrapper}${className ? ` ${className}` : ""}`}>
			<div className={`${styles.top} mob-hide`}>
				<div className={styles.top__imgWrap}>
					<Image src={logoUrl} alt="" width={56} height={56} />
				</div>
				<h3 className={styles.top__title}>{brandTitle}</h3>
			</div>
			<div className={styles.main}>
				<nav className={styles.categories} aria-label="Категории услуг">
					<ul className={styles.categories__list}>
						{pricesBrandData.map((category) => (
							<li key={category.id}>
								<button
									className={`${styles.categories__list_item} ${activeCategory?.id === category.id && styles.activeCategoryBtn}`}
									onClick={() => handleCategory(category)}
									aria-current={
										activeCategory?.id === category.id ? "page" : undefined
									}
									aria-label={`Категория ${category.title}`}
								>
									{/*<span className={styles.icon} aria-hidden="true">*/}
									{/*	☀︎*/}
									{/*</span>*/}
									<span>{category.title}</span>

									<IoIosArrowDown
										size={20}
										aria-hidden="true"
										className="desk-hide"
									/>
								</button>

								<div
									className={`${styles.services__list_wrap} ${activeCategory?.id === category.id && styles.activeCategoryListWrap} desk-hide`}
								>
									{pricesBrandData.map((category) => (
										<ul
											key={`mob-${category.id}`}
											className={`${styles.services__list} ${activeCategory?.id === category.id && styles.activeCategoryList}`}
										>
											{category.items.map((itm) => (
												<li
													className={styles.service__list_item}
													key={itm.title}
												>
													<div>
														<div
															className={
																styles.services__list_item__title
															}
														>
															{itm.title}
														</div>
														<div>{itm.subtitle}</div>
													</div>
													<span className={styles.price}>
														{formatPrice(itm.price)} ₽
													</span>
												</li>
											))}
										</ul>
									))}
								</div>
							</li>
						))}
					</ul>
				</nav>
				<div className={`${styles.services} mob-hide`}>
					<h3 className={styles.services__title}>{activeCategory?.title}</h3>
					<div className={styles.services__list_wrap}>
						{pricesBrandData.map((category) => (
							<ul
								className={`${styles.services__list} ${activeCategory?.id === category.id && styles.activeCategoryList}`}
								key={category.id}
							>
								{category.items.map((itm) => (
									<li className={styles.service__list_item} key={itm.title}>
										<div>
											<div className={styles.services__list_item__title}>
												{itm.title}
											</div>
											<div>{itm.subtitle}</div>
										</div>
										<span className={styles.price}>
											{formatPrice(itm.price)} ₽
										</span>
									</li>
								))}
							</ul>
						))}
					</div>
				</div>
			</div>
			<div className={styles.bottom}>
				<p>
					Указана ориентировочная стоимость. Цена может измениться. Конечная стоимость
					зависит от марки, модели и возраста вашего автомобиля, а также от выбранных
					запасных частей и расходных материалов. Предложение не является публичной
					офертой.
				</p>
				<Button
					minWidth={214}
					onClick={() => openModal("common")}
					className={styles.btn}
					aria-label="Записаться на сервис"
				>
					Записаться на сервис
				</Button>
			</div>
		</div>
	);
}
