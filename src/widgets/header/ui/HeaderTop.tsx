import { about } from "@/src/shared/config";
import SearchAndResults from "@/src/shared/ui/search/SearchAndResults";

import styles from "./Header.module.scss";

export function HeaderTop() {
	return (
		<div className={styles.headerContacts}>
			<div className={styles.container}>
				<div>{about.address}</div>
				<div>{about.addressSecond}</div>
				<div>с 8:00 до 22:00</div>
			</div>
			<SearchAndResults />
		</div>
	);
}
