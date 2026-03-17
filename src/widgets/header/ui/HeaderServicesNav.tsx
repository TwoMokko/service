import { getServices } from "@/src/shared/api/services";
import { CategoryWithServices } from "@/src/shared/data/services";

import styles from "./Header.module.scss";

export function HeaderServicesNav() {
	const services: CategoryWithServices[] = getServices();

	return (
		<nav className={styles.headerServicesNav}>
			<ul>
				{services.map((el) => (
					<li key={el.id}>{el.title}</li>
				))}
			</ul>
		</nav>
	);
}
