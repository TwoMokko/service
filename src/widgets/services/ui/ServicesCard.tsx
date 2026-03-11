"use client";
import Link from "next/link";

import { ServiceCategory } from "@/src/shared/types/types";

import styles from "./Services.module.scss";

interface ServicesCardProps {
	category: ServiceCategory;
}
export function ServicesCard({ category }: ServicesCardProps) {
	return (
		<article className={styles.servicesCard}>
			<h3>
				<Link href={`/services/${category.href}`}>{category.title}</Link>
			</h3>

			<div>
				{category.items.map((service, index) => (
					<div key={service.href || index}>
						<span>{index}</span>
						<Link href={`/services/${category.href}/${service.href}`}>
							{service.title}
						</Link>
					</div>
				))}
			</div>
		</article>
	);
}
