"use client";
import React, {useState} from "react";

import Link from "next/link";

import { useModal } from "@/src/app/_providers/ModalProvider";
import {about, navigationLinks, sectionTitles} from "@/src/shared/config";
import { SectionId } from "@/src/shared/types/types";
import { Button } from "@/src/shared/ui/button/Button";

import styles from "./HeaderMenuLevels.module.scss";
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io";
import {HiMapPin} from "react-icons/hi2";
import {FaClock} from "react-icons/fa";
import {primaryContact} from "@/src/shared/lib/helpers/getContacts";
import SearchAndResults from "@/src/shared/ui/search/SearchAndResults";

interface MainMenuProps {
	onClose: () => void;
	openCategories: () => void;
}
export function MainMenu({ onClose, openCategories }: MainMenuProps) {
	const [isSearch, setIsSearch] = useState(false);
	const { openModal } = useModal();
	const handleOpenModal = () => {
		onClose();
		openModal("common");
	};
	return (
		<div className={styles.main}>
			{isSearch &&
				<>
					<button type="button" onClick={() => setIsSearch(false)} className={styles.back}>
						<IoIosArrowBack size={12} />
						назад
					</button>
					<h3 className={styles.list__head}>Поиск по сайту</h3>
				</>
			}
			<SearchAndResults variant="mobile" onNavigate={onClose} onFocus={() => setIsSearch(true)} />
			{!isSearch && (
				<>
					<ul className={styles.list}>
						<li className={styles.list__item}>
							<button type="button" onClick={openCategories}>
								{sectionTitles[SectionId.SERVICES]}
								<IoIosArrowForward size={12} />
							</button>
						</li>
						{navigationLinks
							.filter((link) => link.title !== sectionTitles[SectionId.SERVICES])
							.map((link) => (
								<li key={link.href} className={styles.list__item}>
									<Link prefetch={false} href={link.href} onClick={onClose}>
										{link.title}
									</Link>
								</li>
							))}
					</ul>
					<Button onClick={handleOpenModal}>Записаться на сервис</Button>

					<ul className={styles.contacts}>
						{about.addresses.map(contact => (
							<li key={contact.id} className={styles.contacts__item}>
								<HiMapPin />
								{contact.address}
							</li>
						))}
						<li className={styles.contacts__item}>
							<FaClock />
							{primaryContact.time}
						</li>
					</ul>

					<p className={styles.copyright}>© 2026 Peleton, все права защищены</p>
				</>
			)}
		</div>
	);
}
