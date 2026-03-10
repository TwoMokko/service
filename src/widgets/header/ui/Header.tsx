"use client";

import React, { useEffect, useRef, useState } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useModal } from "@/src/app/_providers/ModalProvider";
import { about, navigationLinks } from "@/src/shared/config";
import { useDevice } from "@/src/shared/lib/hooks/useDevice";
import { NavigationLink } from "@/src/shared/types/types";
import { Button } from "@/src/shared/ui/button/Button";

import styles from "./Header.module.scss";

export function Header() {
	const { openModal } = useModal();
	const { isMobile, isReady } = useDevice();
	const [burgerOpen, setBurgerOpen] = useState(false);
	const burgerMenuRef = useRef<HTMLDivElement>(null);
	const burgerButtonRef = useRef<HTMLDivElement>(null);
	// const pathname = usePathname();

	useEffect(() => {
		document.body.classList.toggle("lock", burgerOpen);

		return () => {
			document.body.classList.remove("lock");
		};
	}, [burgerOpen]);

	useEffect(() => {
		if (!burgerOpen) return;

		const handleClickOutside = (event: MouseEvent) => {
			if (!(event.target instanceof Node)) return;
			if (!burgerMenuRef.current || !burgerButtonRef.current) return;

			if (
				!burgerMenuRef.current.contains(event.target) &&
				!burgerButtonRef.current.contains(event.target)
			) {
				setBurgerOpen(false);
			}
		};

		document.addEventListener("click", handleClickOutside);
		return () => document.removeEventListener("click", handleClickOutside);
	}, [burgerOpen]);

	const handleOpenCreditModal = () => {
		openModal("order");
	};

	const toggleBurgerMenu = () => {
		setBurgerOpen((prev) => !prev);
	};

	const closeBurgerMenu = () => {
		setBurgerOpen(false);
	};

	const renderNavLinks = (onClickHandler?: () => void) =>
		navigationLinks.map((link: NavigationLink) => (
			<li key={link.href}>
				<Link
					className={styles.link}
					href={link.href}
					onClick={onClickHandler}
					target="_blank"
					rel="noopener noreferrer"
				>
					{link.title}
				</Link>
			</li>
		));

	return (
		<header className={`${styles.headerWrapper} ${burgerOpen ? styles.active : ""} container`}>
			{isReady && !isMobile && (
				<div className={styles.headerContacts}>
					<div className={`${styles.container}`}>
						<div>{about.address}</div>
						<div>{about.addressSecond}</div>
						<div>с 8:00 до 22:00</div>
					</div>
				</div>
			)}

			<div className={`${styles.header}`}>
				<div className={`${styles.container}`}>
					<div className={styles.headerInner}>
						<Link
							href="/"
							className={styles.headerLogo}
							aria-label="Главная страница"
						/>

						<nav>
							<ul className={styles.headerNav}>{renderNavLinks()}</ul>
						</nav>

						{isReady && !isMobile && (
							<>
								<a className={styles.headerPhone} href={`tel:${about.phoneLink}`}>
									{about.phone}
								</a>
								<Button onClick={handleOpenCreditModal}>
									Записаться на сервис
								</Button>
							</>
						)}

						{isReady && isMobile && (
							<div className={styles.headerPhone}>
								<a href={`tel:${about.phoneLink}`}>{about.phone}</a>
							</div>
						)}

						<div
							ref={burgerButtonRef}
							className={`${styles.headerBurger} ${burgerOpen ? styles.active : ""}`}
							onClick={toggleBurgerMenu}
							aria-label="Меню"
							role="button"
							tabIndex={0}
							aria-expanded={burgerOpen}
						>
							<span></span>
						</div>
					</div>

					<div ref={burgerMenuRef} className={styles.headerBurgerMenu}>
						<div className={styles.headerBurgerMenuWrapper}>
							<ul className={styles.headerBurgerMenuList}>
								{renderNavLinks(closeBurgerMenu)}
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
								<Button onClick={handleOpenCreditModal}>Обратный звонок</Button>
								<Button
									variant="secondary"
									withArrow
									onClick={handleOpenCreditModal}
								>
									Рассчитать кредит
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
}
