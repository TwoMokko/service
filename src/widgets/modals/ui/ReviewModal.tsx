"use client";

import { useState } from "react";
import { MdOutlineClose } from "react-icons/md";

import Image from "next/image";

import { useModal } from "@/src/app/_providers/ModalProvider";
import type { Review } from "@/src/shared/data/reviews/types";
import { ReviewHeader } from "@/src/widgets/reviews/ui/ReviewHeader";

import styles from "./ReviewModal.module.scss";

export function ReviewModal() {
	const { modalData, closeModal } = useModal();
	const review = modalData as Review | null;

	const [activeIndex, setActiveIndex] = useState(0);

	if (!review) return null;

	const hasText = "text" in review;
	const media = "media" in review ? (review.media ?? []) : [];
	const activeMedia = media[activeIndex];

	return (
		<div className={styles.modalOverlay} onClick={closeModal}>
			<div
				className={styles.modalContent}
				onClick={(event) => event.stopPropagation()}
				role="dialog"
				aria-modal="true"
				aria-label={`Отзыв ${review.author.name}`}
			>
				<button
					type="button"
					className={styles.closeButton}
					onClick={closeModal}
					aria-label="Закрыть отзыв"
				>
					<MdOutlineClose />
				</button>

				<div className={styles.reviewContent}>
					<div className={styles.reviewText}>
						<ReviewHeader card={review} variant="text" />

						{hasText && <p className={styles.review__text}>{review.text}</p>}

						{/*{review.link && (*/}
						{/*	<a*/}
						{/*		href={review.link}*/}
						{/*		target="_blank"*/}
						{/*		rel="noopener noreferrer"*/}
						{/*		className={styles.reviewSource}*/}
						{/*	>*/}
						{/*		Оригинал отзыва*/}
						{/*	</a>*/}
						{/*)}*/}
					</div>

					{activeMedia && (
						<div className={styles.reviewMedia}>
							<div className={styles.reviewMedia__main}>
								{activeMedia.type === "video" ? (
									<video
										src={activeMedia.src}
										poster={activeMedia.poster}
										controls
									/>
								) : (
									<Image
										src={activeMedia.src}
										alt={activeMedia.alt ?? `Фото отзыва ${review.author.name}`}
										width={900}
										height={675}
									/>
								)}
							</div>

							{media.length > 1 && (
								<div className={styles.reviewMedia__thumbnails}>
									{media.map((item, index) => (
										<button
											key={`${item.src}-${index}`}
											type="button"
											onClick={() => setActiveIndex(index)}
											className={
												activeIndex === index
													? `${styles.reviewMedia__thumbnail} ${styles.active}`
													: styles.reviewMedia__thumbnail
											}
										>
											<Image
												src={item.type === "video" ? item.poster : item.src}
												alt={item.alt ?? `Миниатюра ${index + 1}`}
												width={100}
												height={75}
											/>
										</button>
									))}
								</div>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
