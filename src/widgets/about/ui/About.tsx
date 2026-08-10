"use client";
import type { Swiper as SwiperType } from "swiper";
import { Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import React, { useState } from "react";

import { Button } from "@/src/shared/ui/button/Button";

import styles from "./About.module.scss";

export function About() {
	const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
	const images = [
		"/images/about/1.webp",
		"/images/about/2.webp",
		"/images/about/3.webp",
		"/images/about/4.webp",
		"/images/about/5.webp",
	];

	//TODO: доделать моб версию (перерисовка) и переключатели для thumb
	//TODO: вынести в данные массив изображений
	return (
		<section className={`${styles.about} block-bottom`}>
			<div className="container">
				<div className={styles.content}>
					<div>
						<h2 className={`${styles.title} section-title`}>О сервисе</h2>
						<p className={styles.subtitle}>
							<span className="text-primary">Качество</span> – главный{" "}
							<br className="desk-hide" />
							принцип нашей работы
						</p>
						<p className={styles.text}>
							Мы специализируемся на диагностике, ремонте <br className="mob-hide" />и
							техническом обслуживании всех марок автомобилей.
						</p>
						<div className={styles.actions}>
							<p className={styles.actions__text}>
								Узнайте больше о работе
								<br className="desk-hide" />
								Peleton <span className="text-primary">за 1 мин</span>
							</p>
							<div className={styles.actions__separator}></div>
							<a
								href="/video/video4.mp4"
								data-fancybox
								datatype="html5video"
								className={styles.link}
							>
								<Button minWidth={306} className={styles.btn}>
									Смотреть видео о сервисе
								</Button>
							</a>
						</div>
						<div className={styles.thumbsSwiper__wrap}>
							<Swiper
								onSwiper={setThumbsSwiper}
								modules={[Thumbs, Navigation]}
								slidesPerView={"auto"}
								spaceBetween={8}
								watchSlidesProgress={true}
								className={styles.thumbsSwiper}
								navigation={true}
								breakpoints={{
									320: {
										slidesPerView: "auto",
									},
									1024: {
										slidesPerView: 5,
									},
								}}
							>
								{images.map((img, index) => (
									<SwiperSlide
										key={`thumb-${img}-${index}`}
										className={styles.thumbsSlide}
									>
										<img
											src={img}
											alt={`thumb ${img}`}
											width={140}
											height={140}
											className={styles.thumbImage}
											loading={index < 4 ? "eager" : "lazy"}
										/>
									</SwiperSlide>
								))}
							</Swiper>
						</div>
					</div>
					<div className={styles.swiper__wrap}>
						<Swiper
							modules={[Thumbs]}
							slidesPerView={1}
							thumbs={{ swiper: thumbsSwiper }}
							loop={false}
							className={styles.swiper}
						>
							{images.map((img, index) => (
								<SwiperSlide key={`${img}-${index}`} className={styles.slide}>
									<a href={img} data-fancybox={`gallery-about`}>
										<img
											src={img}
											alt=""
											sizes="(max-width: 768px) 100vw, 70vw"
											className={styles.image}
										/>
									</a>
								</SwiperSlide>
							))}
						</Swiper>
					</div>
				</div>
			</div>
		</section>
	);
}
