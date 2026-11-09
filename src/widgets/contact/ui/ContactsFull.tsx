"use client";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import React from "react";
import { IoIosArrowBack, IoIosArrowForward, IoMdStar } from "react-icons/io";

import Image from "next/image";

import { about } from "@/src/shared/config";
import { contactsSocialRating } from "@/src/shared/config/model-base";
import { ContactsSocialRatingItem } from "@/src/shared/types/types";

import { ContactsFullItem } from "./ContactsFullItem";

import styles from "./ContactsFull.module.scss";

export function ContactsFull() {
	const contactsData = about.addresses;

	return (
		<section className="container block-bottom">
			<h1 className="page-title margin-bot">Контакты сервисных центров PELETON</h1>
			<div className={styles.wrapper}>
				{contactsData.map((contact, idx) => (
					<ContactsFullItem contact={contact} key={contact.id} />
				))}
			</div>

			<div className={styles.socials}>
				<Swiper
					modules={[Pagination, Navigation]}
					slidesPerView={"auto"}
					spaceBetween={16}
					loop={false}
					navigation={{
						prevEl: `.social-rating-prev`,
						nextEl: `.social-rating-next`,
					}}
					pagination={{
						el: ".social-rating-pagination",
					}}
					className={styles.socials__swiper}
				>
					{contactsSocialRating.map((itm) => (
						<SwiperSlide
							key={`${itm.brand_logo}-${itm.social}`}
							className={styles.socials__slide}
						>
							<ContactsSocialCard data={itm} />
						</SwiperSlide>
					))}
				</Swiper>

				<div className={styles.socialsControls}>
					<button
						type="button"
						className={`social-rating-prev ${styles.socialsControls__buttonPrev}`}
						aria-label="Предыдущий слайд"
					>
						<IoIosArrowBack size={16} color="white" />
					</button>
					<div
						className={`social-rating-pagination ${styles.socialsControls__pagination}`}
					></div>
					<button
						type="button"
						className={`social-rating-next ${styles.socialsControls__buttonNext}`}
						aria-label="Следующий слайд"
					>
						<IoIosArrowForward size={16} color="white" />
					</button>
				</div>
			</div>
		</section>
	);
}

const ContactsSocialCard = ({ data }: { data: ContactsSocialRatingItem }) => {
	return (
		<div className={styles.socials__card}>
			<div className={styles.socials__brand}>
				<Image
					src={`/images/rating/brand/${data.brand_logo}.svg`}
					alt={data.brand_logo}
					width={64}
					height={64}
				/>
			</div>
			<div className={styles.socials__info}>
				<Image
					src={`/images/rating/logo/${data.social}.svg`}
					alt={data.social}
					height={24}
					width={160}
					className={styles.socials__logo}
				/>
				<div className={styles.socials__rating}>
					<span className={styles.socials__rating_text}>{data.rating}</span>
					{[...Array(data.stars_count)].map((_, i) => (
						<IoMdStar key={i} color="#F8CD46" size={24} />
					))}
				</div>
				<div className={styles.socials__reviewsCount}>
					На основе {data.reviews_count} отзывов
				</div>
			</div>
		</div>
	);
};
