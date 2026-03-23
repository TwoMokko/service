"use client";

import { useState } from "react";
import { FaClock, FaPhone } from "react-icons/fa";
import { HiMapPin } from "react-icons/hi2";
import { IoMdMail } from "react-icons/io";

import { about } from "@/src/shared/config";
import { YaMap } from "@/src/widgets/contact/ui/YaMap";

import styles from "./Contacts.module.scss";

// вынести в отдельный файл
function ContactItem({
	address,
	phone,
	email,
	time,
	isActive,
}: {
	address: string;
	phone: string;
	email: string;
	time: string;
	isActive: boolean;
}) {
	return (
		<div
			className={`${styles.contactsItem} ${isActive ? styles.active : ""}`}
			aria-hidden={!isActive}
			inert={!isActive ? true : undefined}
		>
			<div className={styles.contactsInfo}>
				<h3>Официальный сервис:</h3>
				<ul>
					<li>
						<HiMapPin />
						{address}
					</li>
					<li>
						<FaPhone />
						{phone}
					</li>
					<li>
						<IoMdMail />
						{email}
					</li>
					<li>
						<FaClock />
						{time}
					</li>
				</ul>
			</div>
			<YaMap address={address} />
		</div>
	);
}

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
