"use client";

import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import React from "react";

import Image from "next/image";

import { useModal } from "@/src/app/_providers/ModalProvider";
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
						alt="hero"
						width={100}
						height={100}
						sizes="100vw"
						className={styles.heroImage}
						loading="eager"
					/>
					<div className="container">
						<div className={styles.slideTop}>
							<h1 className={styles.heroTitle}>
								Мультибрендовый <br />
								сервис
							</h1>
							<div className={styles.subTitle}>
								Узнайте больше о работе Peleton
								<span className={styles.heroAccent}> за 1 мин</span>
							</div>
						</div>
						<div className={styles.slideBottom}>
							<Button
								minWidth={242}
								onClick={() => openModal("order")}
								className={styles.btn}
							>
								Бесплатная консультация
							</Button>
						</div>
					</div>
				</SwiperSlide>
			</Swiper>
		</div>
	);
}
