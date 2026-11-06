import React from "react";

import Link from "next/link";

import { about } from "@/src/shared/config";
import { getServices } from "@/src/shared/data/services";
import { primaryContact } from "@/src/shared/lib/helpers/getContacts";
import { formatPhoneToLink } from "@/src/shared/lib/utils/format-phone";

import { BurgerClient } from "./BurgerClient";
import { ButtonCall } from "./ButtonCall";
import { HeaderTop } from "./HeaderTop";
import { NavLinks } from "./NavLinks";

import styles from "./Header.module.scss";

export async function Header() {
	const services = getServices();

	return (
		<header className={styles.headerWrapper}>
			<div className="container">
				<HeaderTop />

				<div className={styles.header}>
					<div className={styles.container}>
						<div className={styles.headerInner}>
							<BurgerClient services={services} />

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
				</div>
			</div>
		</header>
	);
}
