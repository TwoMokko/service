import { LuArrowUpRight } from "react-icons/lu";

import Link from "next/link";

import { getServices } from "@/src/shared/api/services";
import { CategoryWithServices } from "@/src/shared/data/services";

import styles from "./Header.module.scss";

export function HeaderServicesNav() {
	const categories: CategoryWithServices[] = getServices();

	return (
		<nav className={styles.headerServicesNav}>
			<ul className={styles.categories}>
				{categories.map((category) => (
					<li key={category.id} className={styles.category}>
						<Link href={`/services/${category.href}`}>
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
										<Link href={`/services/${category.href}/${service.slug}`}>
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
