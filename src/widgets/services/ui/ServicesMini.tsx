"use client";

import { Swiper, SwiperSlide } from "swiper/react";

import React from "react";
import { LuArrowUpRight } from "react-icons/lu";

import Image from "next/image";
import Link from "next/link";

import type { CategoryWithServices } from "@/src/shared/data/services/categories";
import { Button } from "@/src/shared/ui/button/Button";

import styles from "./ServicesMini.module.scss";

interface ServicesMiniProps {
	services: CategoryWithServices[];
}
export function ServicesMini({ services }: ServicesMiniProps) {
	// TODO: pagination и кнопка показать все услуги

	return (
		<section className={`${styles.servicesMini} container block-bottom`}>
			<h2 className="section-title">
				Узнать подробнее <br className="desk-hide" />о наших услугах
			</h2>
			<div className={`${styles.servicesMini__list} mob-hide`}>
				{services.map((category) => (
					<article key={category.id} className={styles.servicesMini__card}>
						<div className={styles.imgWrap}>
							<Image
								className={styles.imgBackground}
								src={`/images/services/cards/${category.href}.png`}
								alt=""
								width={220}
								height={144}
							/>
						</div>
						<div className={styles.content}>
							<div className={styles.title__wrap}>
								<h3 className={styles.title}>{category.title}</h3>
								<span className={styles.topCount}>({category.items.length})</span>
							</div>
							<Link
								prefetch={false}
								href={`/services/${category.href}`}
								className={styles.link}
							>
								<Button variant="outline" minWidth={128} className={styles.btn}>
									Подробнее
								</Button>
								<div className={styles.link_arrow}>
									<LuArrowUpRight size={18} />
								</div>
							</Link>
						</div>
					</article>
				))}
			</div>

			<div className={`${styles.servicesMini__list} desk-hide`}>
				<Swiper
					spaceBetween={8}
					slidesPerView="auto"
					className={styles.servicesMini__swiper}
				>
					{services.map((category) => (
						<SwiperSlide key={category.id} className={styles.servicesMini__slide}>
							<article className={styles.servicesMini__card}>
								<div className={styles.imgWrap}>
									<Image
										className={styles.imgBackground}
										src={`/images/services/cards/${category.href}.png`}
										alt=""
										width={180}
										height={100}
									/>
								</div>
								<div className={styles.content}>
									<div className={styles.title__wrap}>
										<h3 className={styles.title}>{category.title}</h3>
										<span className={styles.topCount}>
											({category.items.length})
										</span>
									</div>
									<Link
										prefetch={false}
										href={`/services/${category.href}`}
										className={styles.link}
									>
										<Button
											variant="outline"
											minWidth={128}
											className={styles.btn}
										>
											Подробнее
										</Button>
										<div className={styles.link_arrow}>
											<LuArrowUpRight size={18} />
										</div>
									</Link>
								</div>
							</article>
						</SwiperSlide>
					))}
				</Swiper>

				<Link prefetch={false} href="/services" className={styles.link_showMore}>
					<Button variant="secondary" minWidth={128} className={styles.btn_showMore}>
						Смотреть все отзывы
					</Button>
				</Link>
			</div>
		</section>
	);
}
