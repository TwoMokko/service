import { IoMdStar } from "react-icons/io";

import Image from "next/image";

import type { Review } from "@/src/shared/data/reviews/types";

import styles from "./Reviews.module.scss";

interface ReviewHeaderProps {
	card: Review;
	variant: "photo" | "text";
}

const DEFAULT_AVATAR = "/images/reviews/default-avatar.png";

export function ReviewHeader({ card, variant }: ReviewHeaderProps) {
	const headerClass =
		variant === "photo" ? styles.reviews__cardHeader : styles.reviews__partHeader;

	return (
		<div className={headerClass}>
			<Image
				src={card.author.avatarSrc ? card.author.avatarSrc : DEFAULT_AVATAR}
				alt={`Фото клиента ${card.author.name}`}
				width={64}
				height={64}
				className={styles.reviews__avatar}
			/>

			<div className={styles.reviews__headerInfo}>
				<p className={styles.reviews__headerInfoName}>{card.author.name}</p>

				<div className={styles.reviews__headerInfoMeta}>
					<div
						className={styles.reviews__headerInfoMetaRating}
						aria-label={`Оценка ${card.rating} из 5`}
						role="img"
					>
						{Array.from({ length: card.rating }).map((_, index) => (
							<IoMdStar key={index} aria-hidden="true" />
						))}
					</div>

					<p className={styles.reviews__headerInfoMetaDate}>{card.author.date}</p>
				</div>
			</div>
		</div>
	);
}
