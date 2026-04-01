import { IoMdStar } from "react-icons/io";

import Image from "next/image";

import { ReviewPhotoCard, ReviewTextCard } from "@/src/shared/data/reviews/reviews";
import styles from "@/src/widgets/reviews/ui/Reviews.module.scss";

const isPhotoCard = (card: ReviewPhotoCard | ReviewTextCard): card is ReviewPhotoCard =>
	card.type === "photo";

type ReviewTextLayout = "single" | "top" | "bottom";
interface ReviewCardProps {
	review: ReviewPhotoCard | ReviewTextCard;
	layout?: ReviewTextLayout;
}

interface ReviewHeaderProps {
	card: ReviewPhotoCard | ReviewTextCard;
	variant: "photo" | "text";
}

// ПЕРЕПИСАТЬ, чтобы просто слайдер и для блоков с пагинацией (double в данных может помочь)
function ReviewHeader({ card, variant }: ReviewHeaderProps) {
	const headerClass =
		variant === "photo" ? styles.reviews__cardHeader : styles.reviews__partHeader;

	return (
		<div className={headerClass}>
			{card.author.avatarSrc && (
				<Image
					src={card.author.avatarSrc}
					alt={`Фото клиента ${card.author.name}`}
					width={64}
					height={64}
					className={styles.reviews__avatar}
				/>
			)}
			<div className={styles.reviews__headerInfo}>
				<p className={styles.reviews__headerInfoName}>{card.author.name}</p>
				<div className={styles.reviews__headerInfoMeta}>
					<div
						className={styles.reviews__headerInfoMetaRating}
						aria-label="Рейтинг"
						role="img"
					>
						{Array.from({ length: 5 }).map((_, index) => (
							<IoMdStar key={index} aria-hidden="true" />
						))}
					</div>
					<p className={styles.reviews__headerInfoMetaDate}>{card.author.date}</p>
				</div>
			</div>
		</div>
	);
}

export default function ReviewCard({ review, layout = "single" }: ReviewCardProps) {
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
			<button className={styles.reviews__partLink}>Читать отзыв полностью</button>
		</div>
	);
}
