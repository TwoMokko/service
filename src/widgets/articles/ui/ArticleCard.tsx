import Image from "next/image";
import Link from "next/link";

import { Article } from "@/src/shared/data/articles/articles";
import { Button } from "@/src/shared/ui/button/Button";

import styles from "./ArticleCard.module.scss";

interface ArticleCardProps {
	article: Article;
}
export function ArticleCard({ article }: ArticleCardProps) {
	return (
		<article className={styles.article__card}>
			<div className={styles.picture}>
				<Image src={`/images/articles/items/${article.img}`} alt="" fill sizes="100%" />
			</div>
			<div className={styles.info}>
				<div className={styles.tags}>
					<div className={styles.serviceTag}>{article.serviceTag}</div>
					<div className={styles.dateEnd}>{article.dateEnd}</div>
				</div>
				<h3 className={styles.card__title}>{article.title}</h3>
				<Link href={article.href} prefetch={false} className={styles.card__link}>
					<Button variant="secondary">Читать подробнее</Button>
				</Link>
			</div>
		</article>
	);
}
