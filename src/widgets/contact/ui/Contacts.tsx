"use client";

import { useState } from "react";

import { about } from "@/src/shared/config";
import ContactItem from "@/src/widgets/contact/ui/ContactItem";

import styles from "./Contacts.module.scss";

export function Contacts({ idSection, titleSection }: { idSection: string; titleSection: string }) {
	const [activeAddress, setActiveAddress] = useState<"first" | "second">("first");

	return (
		<section id={idSection} className={styles.contacts}>
			<div className="container">
				<h2 className={`${styles.contactsTitle} section-title`}>{titleSection}</h2>
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
						/>
						<ContactItem
							address={about.addressSecond}
							phone={about.phoneSecond}
							email={about.email}
							time={about.time}
							isActive={activeAddress === "second"}
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
