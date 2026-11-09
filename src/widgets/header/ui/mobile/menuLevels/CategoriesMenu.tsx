"use client";

import { CategoryWithServices } from "@/src/shared/data/services";

import styles from "../HeaderMenuMobile.module.scss";

interface CategoriesMenuProps {
	services: CategoryWithServices[];
	openServices: (category: CategoryWithServices) => void;
	goBack: () => void;
}
export function CategoriesMenu({ services, openServices, goBack }: CategoriesMenuProps) {
	return (
		<div className={styles.levels__categories}>
			<button type="button" onClick={goBack}>
				назад
			</button>
			<ul>
				{services.map((itm) => (
					<li key={itm.href}>
						<button type="button" onClick={() => openServices(itm)}>
							{itm.title}
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}
