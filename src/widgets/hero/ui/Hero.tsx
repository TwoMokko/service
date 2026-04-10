"use client";

import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import React from "react";

import Image from "next/image";

import { useModal } from "@/src/app/_providers/ModalProvider";
import { brandsTitlesData } from "@/src/shared/data/brands";
import { useDevice } from "@/src/shared/lib/hooks/useDevice";
import { Button } from "@/src/shared/ui/button/Button";

import styles from "./Hero.module.scss";

export function Hero() {
	const { openModal } = useModal();
	const { isMobile, isReady } = useDevice();

	const imageSrc = !isReady
		? "/images/hero/hero_desk.png"
		: isMobile
			? "/images/hero/hero-mob.png"
			: "/images/hero/hero_desk.png";

	return (
		<div className={styles.hero}>
			<Swiper
				modules={[Navigation, Pagination, Autoplay]}
				slidesPerView={1}
				pagination={{
					clickable: true,
				}}
				autoplay={{
					delay: 5000,
					disableOnInteraction: false,
				}}
				loop={true}
				className={styles.heroSwiper}
			>
				<SwiperSlide className={styles.heroItem}>
					<Image
						src={imageSrc}
						alt=""
						width={100}
						height={100}
						sizes="100vw"
						className={styles.heroImage}
						loading="eager"
					/>
					<div className="container">
						<div className={styles.content}>
							<div className={styles.slideTop}>
								<ul className={styles.benefits}>
									<li className={styles.benefits__item}>Опытные мастера</li>
									<li className={styles.benefits__item}>Проверенные запчасти</li>
									<li className={styles.benefits__item}>Гарантия на услуги</li>
								</ul>
								<h1 className={styles.heroTitle}>
									Мультибрендовый <br />
									сервис
								</h1>
								<p className={styles.subTitle}>
									Узнайте больше о работе Peleton
									<span className="text-primary"> за 1 мин</span>
									<Image
										className={styles.arrow}
										src="/images/hero/arrow.svg"
										alt=""
										width={74}
										height={45}
									/>
								</p>
							</div>
							<div className={styles.slideBottom}>
								<Button
									minWidth={242}
									onClick={() => openModal("common")}
									className={styles.btn}
								>
									Бесплатная консультация
								</Button>
								<a href="/video/video4.mp4" data-fancybox datatype="html5video">
									<Button variant="outline" minWidth={306} className={styles.btn}>
										Смотреть видео о сервисе
									</Button>
								</a>
							</div>

							<div className={styles.brands__wrap}>
								<h2 className={styles.brands__title}>Официальный сервис:</h2>
								<div className={styles.brands__list}>
									{brandsTitlesData.official44.map((brand) => (
										<div key={brand} className={styles.brands__item}>
											<Image
												src={`/images/brands/icons/${brand}.svg`}
												alt=""
												fill
											/>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</SwiperSlide>
			</Swiper>
		</div>
	);
}
