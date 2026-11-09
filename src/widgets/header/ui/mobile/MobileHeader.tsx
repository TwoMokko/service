import Link from "next/link";

import { CategoryWithServices } from "@/src/shared/data/services";
import { primaryContact } from "@/src/shared/lib/helpers/getContacts";
import { formatPhoneToLink } from "@/src/shared/lib/utils/format-phone";

import { BurgerClient } from "./BurgerClient";

import styles from "../Header.module.scss";

interface MobileHeaderProps {
	services: CategoryWithServices[];
}

export function MobileHeader({ services }: MobileHeaderProps) {
	return (
		<div className={styles.container}>
			<div className={styles.headerInner}>
				<BurgerClient services={services} />
				<Link
					prefetch={false}
					href="/public"
					className={styles.headerLogo}
					aria-label="Главная страница"
				/>

				<a
					className={styles.headerPhone}
					href={`tel:${formatPhoneToLink(primaryContact.phone)}`}
				>
					{primaryContact.phone}
				</a>
			</div>
		</div>
	);
}
