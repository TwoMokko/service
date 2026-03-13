"use client";

import { LuDot } from "react-icons/lu";

import Link from "next/link";

import styles from "./Breadcrumbs.module.scss";

interface BreadcrumbItem {
	title: string;
	href: string;
}

interface BreadcrumbsProps {
	items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
	return (
		<nav aria-label="Хлебные крошки" className={styles.breadcrumbs}>
			<ol className={styles.list}>
				{items.map((item, index) => {
					const isLast = index === items.length - 1;

					return (
						<li
							key={item.href}
							itemProp="itemListElement"
							itemScope
							itemType="https://schema.org/ListItem"
							className={styles.crumb}
						>
							{!isLast ? (
								<Link href={item.href} itemProp="item">
									<span itemProp="name">{item.title}</span>
								</Link>
							) : (
								<span itemProp="name">{item.title}</span>
							)}
							<meta itemProp="position" content={String(index + 1)} />

							{!isLast && (
								<span className={styles.separator}>
									<LuDot size={24} />
								</span>
							)}
						</li>
					);
				})}
			</ol>
		</nav>
	);
}
