"use client";

import React, { useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { about } from "@/src/shared/config/model-base";
import { SectionId } from "@/src/shared/types/types";

import styles from "./Footer.module.scss";

export function Footer() {
	const [showDisclaimer, setShowDisclaimer] = useState<boolean>(false);

	return (
		<footer className={styles.footer}>
			<div className="container">
				<div className={styles.iconsWrap}>
					<Link href="/" target="_blank" rel="noopener noreferrer">
						<Image
							src="/images/icons/logo-footer.svg"
							alt="logo"
							width={245}
							height={30}
							className={styles.logoImage}
						/>
					</Link>
				</div>
				<div className={styles.main}>
					<div className={styles.navSections}>
						<Link
							href={`/${SectionId.SERVICES}`}
							className={styles.navLink}
							target="_blank"
							rel="noopener noreferrer"
						>
							Услуги
						</Link>
						<Link
							href={`/${SectionId.PRICE}`}
							className={styles.navLink}
							target="_blank"
							rel="noopener noreferrer"
						>
							Прайс-лист
						</Link>
						<Link
							href={`/${SectionId.ABOUT}`}
							className={styles.navLink}
							target="_blank"
							rel="noopener noreferrer"
						>
							О нас
						</Link>
						<Link
							href={`/${SectionId.REVIEWS}`}
							className={styles.navLink}
							target="_blank"
							rel="noopener noreferrer"
						>
							Отзывы
						</Link>
						<Link
							href={`/${SectionId.ARTICLE}`}
							className={styles.navLink}
							target="_blank"
							rel="noopener noreferrer"
						>
							Статьи
						</Link>
						<Link
							href={`/${SectionId.CONTACTS}`}
							className={styles.navLink}
							target="_blank"
							rel="noopener noreferrer"
						>
							Контакты
						</Link>
					</div>
					<div>
						<h4 className={styles.contactsTitle}>Контакты</h4>
						<div className={styles.contactsList}>
							{/*может быть, на Link заменить*/}
							<a href={`tel:${about.phoneLink}`} className={styles.contactsItem}>
								{about.phone}
							</a>
							<a href={`mailto:${about.email}`} className={styles.contactsItem}>
								{about.email}
							</a>
							<span className={styles.contactsItem}>{about.address}</span>
							<span className={styles.contactsItem}>{about.time}</span>
						</div>
					</div>
				</div>
				<div className={styles.info}>
					<div className={`${styles.disclaimer} ${showDisclaimer ? styles.show : ""}`}>
						<p>
							Обращаем Ваше внимание на то, что вся представленная на сайте
							информация, носит информационный характер и ни при каких условиях не
							является публичной офертой, определяемой положениями Статьи 437 (2)
							Гражданского кодекса Российской Федерации. Наличие конкретных
							комплектаций, опций и оборудования по доступным автомобилям уточняйте у
							продавцов консультантов. Условия акций ограничены, подробности уточняйте
							в отделе продаж дилерского центра.
						</p>
					</div>
					<button
						className={styles.btnDisclaimer}
						onClick={() => setShowDisclaimer((prevState) => !prevState)}
					>
						{showDisclaimer ? "Скрыть" : "Раскрыть полный текст"}
					</button>
					<p>
						*Instagram — проект Meta Platforms Inc., деятельность которой запрещена в
						России
					</p>
				</div>
				<div className={styles.links}>
					<span className={styles.link}>2025 SWM</span>
				</div>
			</div>
		</footer>
	);
}
