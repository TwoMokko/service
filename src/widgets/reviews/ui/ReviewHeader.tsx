import { IoMdStar } from "react-icons/io";

import Image from "next/image";

import { ReviewPhotoCard, ReviewTextCard } from "@/src/shared/data/reviews/reviews";
import styles from "@/src/widgets/reviews/ui/Reviews.module.scss";

interface ReviewHeaderProps {
	card: ReviewPhotoCard | ReviewTextCard;
	variant: "photo" | "text";
}
export function ReviewHeader({ card, variant }: ReviewHeaderProps) {
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
