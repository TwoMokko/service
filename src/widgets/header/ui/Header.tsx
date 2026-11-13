import { getAllCategoriesWithServices } from "@/src/shared/data/services";

import { HeaderClient } from "./HeaderClient";
import { HeaderTop } from "./HeaderTop";

import styles from "./Header.module.scss";

export function Header() {
	const services = getAllCategoriesWithServices();

	return (
		<header className={styles.headerWrapper}>
			<div className="container">
				<HeaderTop />
				<HeaderClient services={services} />
			</div>
		</header>
	);
}
