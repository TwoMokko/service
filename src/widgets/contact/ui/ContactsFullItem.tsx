"use client";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import React, { useState } from "react";
import { FaClock, FaPhone } from "react-icons/fa";
import { HiMapPin } from "react-icons/hi2";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import Image from "next/image";

import { formatPhoneToLink } from "@/src/shared/lib/utils/format-phone";
import { Address } from "@/src/shared/types/types";
import { Button } from "@/src/shared/ui/button/Button";
import { YaMap } from "@/src/widgets/contact/ui/YaMap";

import styles from "./ContactsFull.module.scss";

export function ContactsFullItem({ contact }: { contact: Address }) {
	const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

	return (
		<div id={contact.id} className={styles.item}>
			<div className={styles.gallery}>
				<Swiper
					modules={[Thumbs, Navigation]}
					slidesPerView={1}
					thumbs={{ swiper: thumbsSwiper }}
					loop={false}
					navigation={{
						prevEl: `.salon-${contact.id}-prev`,
						nextEl: `.salon-${contact.id}-next`,
					}}
					className={styles.swiper}
				>
					{contact.gallery.map((numImg, index) => (
						<SwiperSlide key={`thumb-${numImg}-${index}`} className={styles.slide}>
							<a
								href={`/images/contacts/gallery/salon-${contact.id}/${numImg}.webp`}
								data-fancybox={`contacts-salon-${contact.id}`}
							>
								<Image
									src={`/images/contacts/gallery/salon-${contact.id}/${numImg}.webp`}
									alt=""
									fill
								/>
							</a>
						</SwiperSlide>
					))}
				</Swiper>

				<div className={styles.controls}>
					<button
						type="button"
						className={`salon-${contact.id}-prev ${styles.controls__buttonPrev}`}
						aria-label="Предыдущий слайд"
					>
						<IoIosArrowBack size={20} color="white" />
					</button>
					<button
						type="button"
						className={`salon-${contact.id}-next ${styles.controls__buttonNext}`}
						aria-label="Следующий слайд"
					>
						<IoIosArrowForward size={20} color="white" />
					</button>
				</div>
			</div>
			<div className={styles.content}>
				<div className={styles.gallery__thumb}>
					<Swiper
						onSwiper={setThumbsSwiper}
						modules={[Thumbs]}
						slidesPerView={"auto"}
						spaceBetween={6}
						loop={false}
						watchSlidesProgress={true}
						className={styles.thumbsSwiper}
					>
						{contact.gallery.map((numImg, index) => (
							<SwiperSlide
								key={`thumb-${numImg}-${index}`}
								className={styles.thumbsSlide}
							>
								<Image
									src={`/images/contacts/gallery/salon-${contact.id}/${numImg}.webp`}
									alt={`thumb ${numImg}`}
									width={140}
									height={140}
									className={styles.thumbImage}
								/>
							</SwiperSlide>
						))}
					</Swiper>
				</div>
				<ul className={styles.list}>
					<li className={styles.list__item}>
						<HiMapPin />
						{contact.address}
					</li>
					<li className={styles.list__item}>
						<FaPhone />
						<a href={`tel:${formatPhoneToLink(contact.phone)}`}>{contact.phone}</a>
					</li>
					<li className={styles.list__item}>
						<FaClock />
						{contact.time}
					</li>
				</ul>

				<div className={styles.brands}>
					<div className={styles.brands__title}>Официальный дилер:</div>
					<div className={styles.brands__list}>
						{contact.brands.map((brand) => (
							<div key={brand} className={styles.brands__item}>
								<Image
									src={`/images/brands/icons/${brand}.svg`}
									alt=""
									width={78}
									height={78}
								/>
							</div>
						))}
					</div>
				</div>

				<div className={styles.map}>
					{/*<YaMap className={styles.map__content} address={contact.address} />*/}
					<a
						href={`https://yandex.ru/maps/?rtext=~${contact.address}`}
						target="_blank"
						className={styles.map__link}
					>
						<Button>Показать на карте</Button>
					</a>
				</div>
			</div>
		</div>
	);
}
