"use client";

import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import Link from "next/link";

import { reviewsData } from "@/src/shared/data/reviews/reviews";
import { SectionId } from "@/src/shared/types/types";
import { Button } from "@/src/shared/ui/button/Button";
import { SwiperControls } from "@/src/shared/ui/swiperControls/SwiperControls";
import ReviewCard from "@/src/widgets/reviews/ui/ReviewCard";

import styles from "./Reviews.module.scss";

interface ReviewsProps {
	idSection: string;
	titleSection: string;
}

export function Reviews({ idSection, titleSection }: ReviewsProps) {
	const navigation = {
		prevEl: "[data-reviews-prev]",
		nextEl: "[data-reviews-next]",
	};

	return (
		<section className={`${styles.reviews} block-bottom`} id={idSection}>
			<div className="container">
				<div className={styles.top}>
					<h2 className="section-title">{titleSection}</h2>
					<Link prefetch={false} href={`/${SectionId.REVIEWS}`}>
						<Button variant="secondary">Смотреть все отзывы</Button>
					</Link>
				</div>
				<div className={styles.reviews__wrapper}>
					<Swiper
						modules={[Navigation, Pagination]}
						spaceBetween={20}
						slidesPerView={3}
						navigation={navigation}
						pagination={{
							clickable: true,
							dynamicBullets: true,
							el: "[data-reviews-pagination]",
						}}
						breakpoints={{
							320: {
								slidesPerView: 1,
								spaceBetween: 15,
							},
							768: {
								slidesPerView: 2,
								spaceBetween: 20,
							},
							1024: {
								slidesPerView: 3,
								spaceBetween: 20,
							},
						}}
						loop={false}
						className={styles.swiper}
					>
						{reviewsData.map((review) => (
							<SwiperSlide key={review.id} className={styles.reviews__slide}>
								<ReviewCard review={review} />
							</SwiperSlide>
						))}
						<SwiperControls
							prevButtonProps={{ "data-reviews-prev": true }}
							nextButtonProps={{ "data-reviews-next": true }}
							paginationProps={{ "data-reviews-pagination": true }}
						/>
					</Swiper>
				</div>
			</div>
		</section>
	);
}
