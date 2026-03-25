"use client";

import React from "react";

import Link from "next/link";

import { useModal } from "@/src/app/_providers/ModalProvider";
import { about } from "@/src/shared/config";
import { useBurgerMenu } from "@/src/shared/lib/hooks/useBurgerMenu";
import { useDevice } from "@/src/shared/lib/hooks/useDevice";
import { Button } from "@/src/shared/ui/button/Button";

import { BurgerMenu } from "./BurgerMenu";
import { HeaderTop } from "./HeaderTop";
import { NavLinks } from "./NavLinks";

import styles from "./Header.module.scss";

export function Header() {
	const { openModal } = useModal();
	const { isMobile } = useDevice();
	const { isOpen: burgerOpen, menuRef, buttonRef, toggle, close } = useBurgerMenu();

	const handleOpenModal = () => {
		openModal("order");
	};

	return (
		<header className={`${styles.headerWrapper} ${burgerOpen ? styles.active : ""}`}>
			<div className="container">
				{!isMobile && <HeaderTop />}

				<div className={styles.header}>
					<div className={styles.container}>
						<div className={styles.headerInner}>
							<Link
								href="/"
								className={styles.headerLogo}
								aria-label="Главная страница"
							/>

							<NavLinks />

							<a className={styles.headerPhone} href={`tel:${about.phoneLink}`}>
								{about.phone}
							</a>
							{!isMobile && (
								<Button onClick={handleOpenModal}>Записаться на сервис</Button>
							)}

							<div
								ref={buttonRef}
								className={`${styles.headerBurger} ${burgerOpen ? styles.active : ""}`}
								onClick={toggle}
								aria-label="Меню"
								role="button"
								tabIndex={0}
								aria-expanded={burgerOpen}
							>
								<span></span>
							</div>
						</div>

						<BurgerMenu
							ref={menuRef}
							isOpen={burgerOpen}
							onClose={close}
							onOpenCreditModal={handleOpenModal}
						/>
					</div>
				</div>
			</div>
		</header>
	);
}
