"use client";

import { CategoryWithServices } from "@/src/shared/data/services/types";

import { DesktopHeader } from "./desktop/DesktopHeader";
import { MobileHeader } from "./mobile/MobileHeader";

import styles from "./Header.module.scss";

interface HeaderClientProps {
	services: CategoryWithServices[];
}

export function HeaderClient({ services }: HeaderClientProps) {
	return (
		<>
			<div className={`${styles.desktopHeader} ${styles.header}`}>
				<DesktopHeader services={services} />
			</div>

			<div className={`${styles.mobileHeader} ${styles.header}`}>
				<MobileHeader services={services} />
			</div>
		</>
	);
}
