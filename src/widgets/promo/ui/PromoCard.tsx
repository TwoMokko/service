import Image from "next/image";

import { Promo } from "@/src/shared/data/promo/promo";

import styles from "./PromoSwiper.module.scss";

interface ActionCardProps {
	promo: Promo;
}
export function PromoCard({ promo }: ActionCardProps) {
	return (
		<article className={styles.promo__card}>
			<div className={styles.picture}>
				<Image src={`/images/promo/items/${promo.img}`} alt="" fill sizes="100%" />
			</div>
			<div className={styles.info}>
				<div className={styles.tags}>
					<div className={styles.dateEnd}>до {promo.dateEnd}</div>
					<div className={styles.serviceTag}>{promo.serviceTag}</div>
				</div>
				<h3 className={styles.card__title}>{promo.title}</h3>
				<div className={styles.card__subtitle}>{promo.subtitle}</div>
			</div>
		</article>
	);
}
