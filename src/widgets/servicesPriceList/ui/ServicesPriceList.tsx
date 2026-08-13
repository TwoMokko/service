"use client";

import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

import { useModal } from "@/src/app/_providers/ModalProvider";
import type { CategoryWithServices } from "@/src/shared/data/services";
import { Service } from "@/src/shared/data/services";
import { useDevice } from "@/src/shared/lib/hooks/useDevice";
import { formatPrice } from "@/src/shared/lib/utils/format-price";
import { Button } from "@/src/shared/ui/button/Button";

import styles from "./ServicesPriceList.module.scss";

interface ServicesPriceListProps {
	services: CategoryWithServices[];
	title?: string;
}

// TODO: дублирование!
export function ServicesPriceList({ services, title }: ServicesPriceListProps) {
	const { openModal } = useModal();
	const { isMobile } = useDevice();
	const [activeCategory, setActiveCategory] = useState<CategoryWithServices | null>(services[0]);
	const [activeService, setActiveService] = useState<Service | null>(null);

	const handleCategory = (category: CategoryWithServices) => {
		if (isMobile && category.id === activeCategory?.id) {
			setActiveCategory(null);
			return;
		}

		setActiveCategory(category);
	};

	const handleService = (service: Service) => {
		if (service.id === activeService?.id) {
			setActiveService(null);
			return;
		}

		setActiveService(service);
	};

	// TODO: разнести на компоненты
	// TODO: переписать иконки
	return (
		<section
			className={`${styles.servicesPriceList} container block-bottom`}
			aria-label="Прайс-лист на услуги автосервиса"
		>
			<h2 className="section-title">{title ?? "Прайс-лист"}</h2>
			<div className={styles.wrapper}>
				<div className={styles.main}>
					<nav className={styles.categories} aria-label="Категории услуг">
						<ul className={styles.categories__list}>
							{services.map((category) => (
								<li key={category.id}>
									<button
										className={`${styles.categories__list_item} ${activeCategory?.id === category.id && styles.activeCategoryBtn}`}
										onClick={() => handleCategory(category)}
										aria-current={
											activeCategory?.id === category.id ? "page" : undefined
										}
										aria-label={`Категория ${category.title}`}
									>
										<span className={styles.icon} aria-hidden="true">
											☀︎
										</span>
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
										{services.map((category) => (
											<ul
												key={`mob-${category.id}`}
												className={`${styles.services__list} ${activeCategory?.id === category.id && styles.activeCategoryList}`}
											>
												{category.items.map((service) => (
													<li
														key={service.id}
														className={`${styles.services__list_item} ${activeService?.id === service.id && styles.activeService}`}
													>
														<article
															className={styles.service}
															onClick={() => handleService(service)}
															role="button"
															tabIndex={0}
															aria-expanded={
																activeService?.id === service.id
															}
															aria-label={`${service.title}${service.items?.length ? ", нажмите чтобы развернуть" : ""}`}
														>
															<div className={styles.service__title}>
																{service.title}
															</div>
															{service.items?.length && (
																<IoIosArrowDown
																	size={20}
																	aria-hidden="true"
																/>
															)}
														</article>
														{service.items?.length && (
															<ul className={styles.service__list}>
																{service.items?.map((itm) => (
																	<li
																		className={
																			styles.service__list_item
																		}
																		key={itm.title}
																	>
																		<span>{itm.title}</span>
																		<span
																			className={styles.price}
																		>
																			от{" "}
																			{formatPrice(itm.price)}{" "}
																			₽
																		</span>
																	</li>
																))}
															</ul>
														)}
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
							{services.map((category) => (
								<ul
									className={`${styles.services__list} ${activeCategory?.id === category.id && styles.activeCategoryList}`}
									key={category.id}
								>
									{category.items.map((service) => (
										<li
											key={service.id}
											className={`${styles.services__list_item} ${activeService?.id === service.id && styles.activeService}`}
										>
											<article
												className={styles.service}
												onClick={() => handleService(service)}
												role="button"
												tabIndex={0}
												aria-expanded={activeService?.id === service.id}
												aria-label={`${service.title}${service.items?.length ? ", нажмите чтобы развернуть" : ""}`}
											>
												<div className={styles.service__title}>
													{service.title}
												</div>
												{service.items?.length && (
													<IoIosArrowDown size={20} aria-hidden="true" />
												)}
											</article>
											{service.items?.length && (
												<ul className={styles.service__list}>
													{service.items?.map((itm) => (
														<li
															className={styles.service__list_item}
															key={itm.title}
														>
															<span>{itm.title}</span>
															<span className={styles.price}>
																от {formatPrice(itm.price)} ₽
															</span>
														</li>
													))}
												</ul>
											)}
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
		</section>
	);
}
