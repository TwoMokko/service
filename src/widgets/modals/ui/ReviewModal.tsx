"use client";

import React from "react";
import { MdOutlineClose } from "react-icons/md";

import Image from "next/image";

import { useModal } from "@/src/app/_providers/ModalProvider";
import { ReviewPhotoCard, ReviewTextCard } from "@/src/shared/data/reviews/reviews";
import { ReviewHeader } from "@/src/widgets/reviews";

import styles from "./ReviewModal.module.scss";

// стили дубликаты убрать: вынести куда-то (глобальный класс или миксин)
export function ReviewModal() {
	const { modalData, closeModal } = useModal();
	const review = modalData as ReviewPhotoCard | ReviewTextCard;

	if (!review) return null;

	const isPhotoReview = review.type === "photo";

	return (
		<div className={styles.modalOverlay} onClick={closeModal}>
			<div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
				<button className={styles.closeButton} onClick={closeModal}>
					<MdOutlineClose />
				</button>

				{isPhotoReview ? (
					<Image
						src={review.photoSrc}
						alt={`Отзыв ${review.author.name}`}
						width={600}
						height={450}
					/>
				) : (
					<div>
						<ReviewHeader card={review} variant="text" />
						<p className={styles.review__text}>{review.text}</p>
					</div>
				)}
			</div>
		</div>
	);
}
