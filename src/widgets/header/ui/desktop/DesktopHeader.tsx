import Link from "next/link";

import { CategoryWithServices } from "@/src/shared/data/services";
import { primaryContact } from "@/src/shared/lib/helpers/getContacts";
import { formatPhoneToLink } from "@/src/shared/lib/utils/format-phone";

import { ButtonCall } from "./ButtonCall";
import { NavLinks } from "./NavLinks";

import styles from "../Header.module.scss";

interface DesktopHeaderProps {
	services: CategoryWithServices[];
}

export function DesktopHeader({ services }: DesktopHeaderProps) {
	return (
		<div className={styles.container}>
			<div className={styles.headerInner}>
				<Link
					prefetch={false}
					href="/"
					className={styles.headerLogo}
					aria-label="Главная страница"
				/>

				<NavLinks services={services} />

				<a
					className={styles.headerPhone}
					href={`tel:${formatPhoneToLink(primaryContact.phone)}`}
				>
					{primaryContact.phone}
				</a>
				<ButtonCall />
			</div>
		</div>
	);
}
