import React from "react";
import Link from "next/link";
import { about } from "@/src/shared/config";
import { getServices } from "@/src/shared/data/services";
import { HeaderTop } from "./HeaderTop";
import { NavLinks } from "./NavLinks";
import { BurgerClient } from "./BurgerClient";
import { ButtonCall } from "./ButtonCall";
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

							<a className={styles.headerPhone} href={`tel:${about.phoneLink}`}>
								{about.phone}
							</a>
							<ButtonCall />
						</div>
					</div>
				</div>
			</div>
		</header>
	);
}