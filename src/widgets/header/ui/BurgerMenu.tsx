import { forwardRef } from "react";

import { about } from "@/src/shared/config";
import { Button } from "@/src/shared/ui/button/Button";

import { NavLinks } from "./NavLinks";

import styles from "./Header.module.scss";

interface BurgerMenuProps {
	isOpen: boolean;
	onClose: () => void;
	onOpenCreditModal: () => void;
}

export const BurgerMenu = forwardRef<HTMLDivElement, BurgerMenuProps>(
	({ isOpen, onClose, onOpenCreditModal }, ref) => {
		if (!isOpen) return null;

		return (
			<div ref={ref} className={styles.headerBurgerMenu}>
				<div className={styles.headerBurgerMenuWrapper}>
					<ul className={styles.headerBurgerMenuList}>
						<NavLinks onClick={onClose} isMobile={true} />
					</ul>

					<ul className={styles.headerBurgerMenuContacts}>
						<li className={styles.headerBurgerMenuContactsItem}>{about.address}</li>
						<li className={styles.headerBurgerMenuContactsItem}>
							<a href={`tel:${about.phoneLink}`}>
								<strong>{about.phone}</strong>
							</a>
						</li>
					</ul>

					<div className={styles.headerBurgerMenuBtns}>
						<Button onClick={onOpenCreditModal}>Обратный звонок</Button>
						<Button variant="secondary" withArrow onClick={onOpenCreditModal}>
							Рассчитать кредит
						</Button>
					</div>
				</div>
			</div>
		);
	},
);

BurgerMenu.displayName = "BurgerMenu";
