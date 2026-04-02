"use client";

import { useState } from "react";

import { about } from "@/src/shared/config";
import { brandsData } from "@/src/shared/data/brands/brands";
import ContactItem from "@/src/widgets/contact/ui/ContactItem";

import styles from "./Contacts.module.scss";

export function Contacts({
	idSection,
	titleSection,
	titlePage = false,
}: {
	idSection: string;
	titleSection: string;
	titlePage?: boolean;
}) {
	const [activeAddress, setActiveAddress] = useState<"first" | "second">("first");

	return (
		<section id={idSection} className={`${styles.contacts} block-bottom`}>
			<div className="container">
				<h2
					className={`${styles.contactsTitle} ${titlePage ? "page-title" : "section-title"}`}
				>
					{titleSection}
				</h2>
				<div className={styles.contactsWrap}>
					<nav className={styles.contactsSwitcher}>
						<button
							onClick={() => setActiveAddress("first")}
							className={`${styles.contactsSwitcherBtn} ${activeAddress === "first" ? styles.active : ""}`}
							aria-pressed={activeAddress === "first"}
						>
							{about.address}
						</button>
						<button
							onClick={() => setActiveAddress("second")}
							className={`${styles.contactsSwitcherBtn} ${activeAddress === "second" ? styles.active : ""}`}
							aria-pressed={activeAddress === "second"}
						>
							{about.addressSecond}
						</button>
					</nav>

					<div className={styles.contactsItemsContainer}>
						<ContactItem
							address={about.address}
							phone={about.phone}
							email={about.email}
							time={about.time}
							isActive={activeAddress === "first"}
							brands={brandsData.official44}
						/>
						<ContactItem
							address={about.addressSecond}
							phone={about.phoneSecond}
							email={about.email}
							time={about.time}
							isActive={activeAddress === "second"}
							brands={brandsData.official33}
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
