'use client';

import Link from "next/link";
import { LuArrowUpRight } from "react-icons/lu";
import { CategoryWithServices } from "@/src/shared/data/services";
import styles from "./Header.module.scss";

interface HeaderServicesNavProps {
	services: CategoryWithServices[];
}

export function HeaderServicesNav({ services }: HeaderServicesNavProps) {
	if (!services || services.length === 0) {
		return <nav className={styles.headerServicesNav}>Нет услуг</nav>;
	}

	return (
		<nav className={styles.headerServicesNav}>
			<ul className={styles.categories}>
				{services.map((category) => (
					<li key={category.id} className={styles.category}>
						<Link prefetch={false} href={`/services/${category.href}`}>
							<div className={styles.categoryTitle}>{category.title}</div>
						</Link>
						<div className={styles.services}>
							<div className={styles.servicesTop}>
								<h3 className={styles.servicesTitle}>{category.title}</h3>
								<span className={styles.servicesTopCount}>
                                    ({category.items.length})
                                </span>
							</div>
							<ul className={styles.servicesList}>
								{category.items.map((service, index) => (
									<li key={service.id || index} className={styles.listItem}>
										<Link
											prefetch={false}
											href={`/services/${category.href}/${service.href}`}
										>
											<span className={styles.listCount}>{index + 1}</span>
											<div className={styles.listTitle}>{service.title}</div>
											<div className={styles.listArrow}>
												<LuArrowUpRight size={18} />
											</div>
										</Link>
									</li>
								))}
							</ul>
						</div>
					</li>
				))}
			</ul>
		</nav>
	);
}