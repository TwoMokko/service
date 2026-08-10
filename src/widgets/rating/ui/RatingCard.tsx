import { TiLocation } from "react-icons/ti";

import Image from "next/image";
import Link from "next/link";

import { Rating } from "@/src/shared/data/rating/rating";

import styles from "./Rating.module.scss";

interface RatingCardProps {
	rating: Rating;
}
export function RatingCard({ rating }: RatingCardProps) {
	return (
		<article className={styles.rating__card}>
			<div className={styles.content}>
				<div
					className={`${styles.location} ${rating.location == "44-й км" ? styles.main : styles.yug}`}
				>
					<TiLocation size={16} />
					{rating.location}
				</div>
				<div className={styles.info}>
					<Image
						className={styles.logo}
						src={`/images/rating/logo/${rating.logo}.svg`}
						alt=""
						width={200}
						height={40}
					/>
					<div className={styles.rating__stars}>
						{rating.rating}
						<Image
							src="/images/rating/icons/stars.svg"
							alt=""
							width={144}
							height={28}
						/>
					</div>
					<p className={styles.subtitle}>{rating.subtitle}</p>
					<Link prefetch={false} className={styles.link} href={rating.link}>
						{rating.linkTitle}
					</Link>
				</div>
				<div className={styles.brand__wrap}>
					<Image
						className={styles.brand}
						src={`/images/rating/brand/${rating.brand}.svg`}
						alt=""
						width={80}
						height={80}
					/>
				</div>
			</div>
			<div className={styles.bg__wrap}>
				<Image
					className={styles.bg}
					src={`/images/rating/bg/${rating.bg}.png`}
					alt=""
					fill
				/>
			</div>
		</article>
	);
}
