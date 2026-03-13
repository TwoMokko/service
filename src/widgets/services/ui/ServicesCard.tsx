"use client";
import { LuArrowUpRight } from "react-icons/lu";

import Link from "next/link";

import { CategoryWithServices } from "@/src/shared/data/services/categories";
import { Button } from "@/src/shared/ui/button/Button";

import styles from "./Services.module.scss";

interface ServicesCardProps {
	category: CategoryWithServices;
}
export function ServicesCard({ category }: ServicesCardProps) {
	return (
		<article className={styles.servicesCard}>
			<div className={styles.top}>
				<h3 className={styles.title}>{category.title}</h3>
				<span className={styles.topCount}>({category.items.length})</span>
			</div>

			<Link href={`/services/${category.href}`} className={styles.topLink}>
				<Button variant="outline">Подробнее</Button>
			</Link>

			<div className={styles.listWrap}>
				<div className={styles.list}>
					{category.items.map((service, index) => (
						<Link
							key={service.id || index}
							href={`/services/${category.href}/${service.slug}`}
							className={styles.listItem}
						>
							<span className={styles.listCount}>{index + 1}</span>
							<div className={styles.listTitle}>{service.title}</div>
							<div className={styles.listArrow}>
								<LuArrowUpRight size={18} />
							</div>
						</Link>
					))}
				</div>
			</div>
		</article>
	);
}
