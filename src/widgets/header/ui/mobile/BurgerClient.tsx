"use client";

import { CategoryWithServices } from "@/src/shared/data/services/types";
import { useBurgerMenu } from "@/src/shared/lib/hooks/useBurgerMenu";

import { MobileNavigation } from "./MobileNavigation";

import styles from "../Header.module.scss";

interface BurgerClientProps {
	services: CategoryWithServices[];
}

export function BurgerClient({ services }: BurgerClientProps) {
	const { isOpen, menuRef, buttonRef, toggle, close } = useBurgerMenu();

	return (
		<>
			<button
				ref={buttonRef}
				type="button"
				className={`${styles.headerBurger} ${isOpen ? styles.active : ""}`}
				onClick={toggle}
				aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
				aria-expanded={isOpen}
				aria-controls="mobile-navigation"
			>
				<span />
			</button>

			<div
				ref={menuRef}
				className={`${styles.headerBurgerMenu} ${isOpen ? styles.active : ""}`}
				id="mobile-navigation"
			>
				<MobileNavigation services={services} onClose={close} />
			</div>
		</>
	);
}
