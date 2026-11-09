"use client";

import Link from "next/link";

import { Service } from "@/src/shared/data/services";

import styles from "../HeaderMenuMobile.module.scss";

interface ServicesMenuProps {
	services: Service[];
	goBack: () => void;
	onClose: () => void;
}
export function ServicesMenu({ services, goBack, onClose }: ServicesMenuProps) {
	return (
		<div className={styles.levels__categories}>
			<button type="button" onClick={goBack}>
				назад
			</button>
			<ul>
				{services.map((itm) => (
					<li key={itm.href}>
						<Link
							href={`/services/${itm.categorySlug}/${itm.href}`}
							prefetch={false}
							onClick={onClose}
						>
							{itm.title}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}
