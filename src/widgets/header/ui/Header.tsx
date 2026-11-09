import { getServices } from "@/src/shared/data/services";

import { HeaderClient } from "./HeaderClient";
import { HeaderTop } from "./HeaderTop";

import styles from "./Header.module.scss";

export function Header() {
	const services = getServices();

	return (
		<header className={styles.headerWrapper}>
			<div className="container">
				<HeaderTop />
				<HeaderClient services={services} />
			</div>
		</header>
	);
}
