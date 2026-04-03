import Image from "next/image";

import { useModal } from "@/src/app/_providers/ModalProvider";
import { ReviewPhotoCard, ReviewTextCard } from "@/src/shared/data/reviews/reviews";

import { ReviewHeader } from "./ReviewHeader";

import styles from "./Reviews.module.scss";

const isPhotoCard = (card: ReviewPhotoCard | ReviewTextCard): card is ReviewPhotoCard =>
	card.type === "photo";

type ReviewTextLayout = "single" | "top" | "bottom";
interface ReviewCardProps {
	review: ReviewPhotoCard | ReviewTextCard;
	layout?: ReviewTextLayout;
}

// ПЕРЕПИСАТЬ, чтобы для просто слайдера и для блоков с пагинацией (double в данных может помочь)
export default function ReviewCard({ review, layout = "single" }: ReviewCardProps) {
	const { openModal } = useModal();

	if (isPhotoCard(review)) {
		return (
			<div className={styles.reviews__card}>
				<ReviewHeader card={review} variant="photo" />
				<div className={styles.reviews__cardImage}>
					<Image
						src={review.photoSrc}
						alt={`Фото клиента ${review.author.name}`}
						width={486}
						height={364}
					/>
				</div>
			</div>
		);
	}

	const classNames = [styles.reviews__part];

	if (layout === "top") {
		classNames.push(styles.reviews__partTop);
	} else if (layout === "bottom") {
		classNames.push(styles.reviews__partBottom);
	}

	return (
		<div className={classNames.join(" ")}>
			<div className={styles.reviews__partContent}>
				<ReviewHeader card={review} variant="text" />
				<p className={styles.reviews__text}>{review.text}</p>
			</div>
			<button
				onClick={() => {
					openModal("review", review);
				}}
				className={styles.reviews__partLink}
			>
				Читать отзыв полностью
			</button>
		</div>
	);
}
