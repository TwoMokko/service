"use client";

import { Swiper, SwiperSlide } from "swiper/react";

import Image from "next/image";

import { useModal } from "@/src/app/_providers/ModalProvider";
import type { Review } from "@/src/shared/data/reviews/types";
import { PlayIcon } from "@/src/shared/ui/playIcon/PlayIcon";

import { ReviewHeader } from "./ReviewHeader";

import styles from "./Reviews.module.scss";

interface ReviewCardProps {
	review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
	const { openModal } = useModal();

	const hasText = "text" in review;
	const media = "media" in review ? (review.media ?? []) : [];

	const openReview = () => {
		openModal("review", review);
	};

	const renderMedia = () => {
		if (!media.length) return null;

		return (
			<div className={styles.reviews__cardImage}>
				{hasText && (
					<Swiper
						slidesPerView={"auto"}
						spaceBetween={8}
						loop={false}
						className={styles.cardSwiper}
					>
						{media.map((item, index) => {
							return (
								<SwiperSlide
									key={`${item.src}-${index}`}
									className={styles.cardSlide}
								>
									<a
										key={`${item.src}-${index}`}
										type="button"
										className={styles.reviews__mediaButton}
										href={item.src}
										data-fancybox={`review-${review.id}`}
										data-type="image"
									>
										<Image
											src={item.src}
											alt={item.alt ?? `Отзыв ${review.author.name}`}
											width={140}
											height={140}
										/>
									</a>
								</SwiperSlide>
							);
						})}
					</Swiper>
				)}
				{!hasText &&
					media.map((item, index) => {
						const isVideo = item.type === "video";
						const previewSrc = isVideo ? item.poster : item.src;

						const preview = (
							<>
								<Image
									src={previewSrc}
									alt={item.alt ?? `Отзыв ${review.author.name}`}
									width={140}
									height={140}
								/>

								{isVideo && <PlayIcon />}
							</>
						);

						return (
							<a
								key={`${item.src}-${index}`}
								href={item.src}
								data-fancybox={`review-${review.id}`}
								data-type={isVideo ? "html5video" : "image"}
								data-thumb={isVideo ? item.poster : undefined}
								className={styles.reviews__mediaButton}
							>
								{preview}
							</a>
						);
					})}
			</div>
		);
	};

	// Только текст
	if (review.type === "text") {
		return (
			<article className={styles.reviews__part}>
				<ReviewHeader card={review} variant="text" />

				<div className={styles.reviews__partContent}>
					<p className={styles.reviews__text}>{review.text}</p>
				</div>

				<button type="button" onClick={openReview} className={styles.reviews__partLink}>
					Читать отзыв полностью
				</button>
			</article>
		);
	}

	// Текст + фото или видео
	if (review.type === "text-photo" || review.type === "text-video") {
		return (
			<article className={`${styles.reviews__part} ${styles.reviews__part_media}`}>
				<ReviewHeader card={review} variant="text" />

				<div className={styles.reviews__partContent}>
					<p className={styles.reviews__text}>{review.text}</p>
				</div>

				{renderMedia()}

				<button type="button" onClick={openReview} className={styles.reviews__partLink}>
					Читать отзыв полностью
				</button>
			</article>
		);
	}

	// Только фото или видео
	return (
		<article className={`${styles.reviews__card} ${styles.reviews__part_onlymedia}`}>
			<ReviewHeader card={review} variant="photo" />
			{renderMedia()}
		</article>
	);
}
