'use client';

import React from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import Link from "next/link";
import { navigationLinks, sectionTitles } from "@/src/shared/config";
import { useServicesMenu } from "@/src/shared/lib/hooks/useServicesMenu";
import { NavigationLink, SectionId } from "@/src/shared/types/types";
import { CategoryWithServices } from "@/src/shared/data/services";
import { HeaderServicesNav } from "./HeaderServicesNav";
import styles from "./Header.module.scss";

interface NavLinksProps {
	services: CategoryWithServices[];
}

export function NavLinks({ services }: NavLinksProps) {
	const servicesMenu = useServicesMenu(200);

	return (
		<nav className="mob-hide">
			<ul className={styles.headerNav}>
				{navigationLinks.map((link: NavigationLink) => {
					if (link.title === sectionTitles[SectionId.SERVICES]) {
						return (
							<React.Fragment key={link.href}>
								<li ref={servicesMenu.triggerRef} {...servicesMenu.triggerHandlers}>
									<Link
										prefetch={false}
										className={styles.link}
										href={link.href}
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
										<HeaderServicesNav services={services} />
									</div>
								</li>
							</React.Fragment>
						);
					}

					return (
						<li key={link.href}>
							<Link
								prefetch={false}
								className={styles.link}
								href={link.href}
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