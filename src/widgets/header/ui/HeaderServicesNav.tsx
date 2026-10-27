"use client";

import React from "react";
import { LuArrowUpRight } from "react-icons/lu";

import Image from "next/image";
import Link from "next/link";

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
						<Link
							prefetch={false}
							href={`/services/${category.href}`}
							className={styles.categoryLink}
						>
							<div className={styles.categoryTitle}>{category.title}</div>
							<Image
								className={styles.categoryImg}
								src={`/images/services/cards/${category.href}.png`}
								alt=""
								width={160}
								height={80}
							/>
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
