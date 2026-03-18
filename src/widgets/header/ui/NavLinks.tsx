import React from "react";
import { IoMdArrowDropdown } from "react-icons/io";

import Link from "next/link";

import { navigationLinks, sectionTitles } from "@/src/shared/config";
import { useServicesMenu } from "@/src/shared/lib/hooks/useServicesMenu";
import { NavigationLink, SectionId } from "@/src/shared/types/types";
import { HeaderServicesNav } from "@/src/widgets/header/ui/HeaderServicesNav";

import styles from "./Header.module.scss";

interface NavLinksProps {
	onClick?: () => void;
	isMobile?: boolean;
}

export function NavLinks({ onClick, isMobile }: NavLinksProps) {
	const servicesMenu = useServicesMenu(200);

	return (
		<nav>
			<ul className={styles.headerNav}>
				{navigationLinks.map((link: NavigationLink) => {
					// Для мобильной версии - просто ссылка без выпадающего меню
					if (isMobile) {
						return (
							<li key={link.href}>
								<Link
									className={styles.link}
									href={link.href}
									onClick={onClick}
									target="_blank"
									rel="noopener noreferrer"
								>
									{link.title}
								</Link>
							</li>
						);
					}

					// Для десктопа - услуги с выпадающим меню
					if (link.title === sectionTitles[SectionId.SERVICES]) {
						return (
							<React.Fragment key={link.href}>
								<li ref={servicesMenu.triggerRef} {...servicesMenu.triggerHandlers}>
									<Link
										className={styles.link}
										href={link.href}
										target="_blank"
										rel="noopener noreferrer"
									>
										{link.title}
										<IoMdArrowDropdown />
									</Link>
									<div
										ref={servicesMenu.menuRef}
										{...servicesMenu.menuHandlers}
										className={`${styles.servicesMenuWrapper} ${servicesMenu.isOpen ? styles.active : ""}`}
									>
										<HeaderServicesNav />
									</div>
								</li>
							</React.Fragment>
						);
					}

					// Обычные ссылки
					return (
						<li key={link.href}>
							<Link
								className={styles.link}
								href={link.href}
								onClick={onClick}
								target="_blank"
								rel="noopener noreferrer"
							>
								{link.title}
							</Link>
						</li>
					);
				})}
			</ul>
		</nav>
	);
}
