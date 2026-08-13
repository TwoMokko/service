'use client';

import { useEffect } from "react";
import { about } from "@/src/shared/config";
import { useBurgerMenu } from "@/src/shared/lib/hooks/useBurgerMenu";
import { useModal } from "@/src/app/_providers/ModalProvider";
import { Button } from "@/src/shared/ui/button/Button";
import { CategoryWithServices } from "@/src/shared/data/services";
import { NavLinksMobile } from "./NavLinksMobile";
import styles from "./Header.module.scss";

interface BurgerClientProps {
	services: CategoryWithServices[];
}

export function BurgerClient({ services }: BurgerClientProps) {
	const { openModal } = useModal();
	const { isOpen, menuRef, buttonRef, toggle, close } = useBurgerMenu();

	useEffect(() => {
		const header = document.querySelector(`.${styles.headerWrapper}`);
		if (header) {
			if (isOpen) {
				header.classList.add(styles.active);
			} else {
				header.classList.remove(styles.active);
			}
		}
	}, [isOpen]);

	const handleOpenModal = () => {
		close();
		openModal("common");
	};

	return (
		<>
			<div
				ref={buttonRef}
				className={`${styles.headerBurger} ${isOpen ? styles.active : ""}`}
				onClick={toggle}
				aria-label="Меню"
				role="button"
				tabIndex={0}
				aria-expanded={isOpen}
			>
				<span></span>
			</div>

			{isOpen && (
				<div ref={menuRef} className={styles.headerBurgerMenu}>
					<div className={styles.headerBurgerMenuWrapper}>
						<ul className={styles.headerBurgerMenuList}>
							<NavLinksMobile services={services} onClick={close} />
						</ul>

						<ul className={styles.headerBurgerMenuContacts}>
							<li className={styles.headerBurgerMenuContactsItem}>
								{about.address}
							</li>
							<li className={styles.headerBurgerMenuContactsItem}>
								<a href={`tel:${about.phoneLink}`}>
									<strong>{about.phone}</strong>
								</a>
							</li>
						</ul>

						<div className={styles.headerBurgerMenuBtns}>
							<Button onClick={handleOpenModal}>
								Записаться на сервис
							</Button>
						</div>
					</div>
				</div>
			)}
		</>
	);
}