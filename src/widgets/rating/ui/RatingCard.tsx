import { Rating } from "@/src/shared/data/rating/rating";

import styles from "./Rating.module.scss";

interface RatingCardProps {
	rating: Rating;
}
export function RatingCard({ rating }: RatingCardProps) {
	return (
		<article className={styles.rating__card}>
			<h3>{rating.title}</h3>
			<p>{rating.subtitle}</p>
		</article>
	);
}
