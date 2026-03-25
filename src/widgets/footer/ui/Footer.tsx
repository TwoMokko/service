"use client";

import React, { useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { useModal } from "@/src/app/_providers/ModalProvider";
import { navigationLinks } from "@/src/shared/config";
import { about } from "@/src/shared/config/model-base";
import { NavigationLink } from "@/src/shared/types/types";
import { Button } from "@/src/shared/ui/button/Button";

import styles from "./Footer.module.scss";

export function Footer() {
	const [showDisclaimer, setShowDisclaimer] = useState<boolean>(false);
	const { openModal } = useModal();

	return (
		<footer className="container">
			<div className={styles.footer}>
				<div className={styles.main}>
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
					<nav className={styles.navSections}>
						{navigationLinks.map((link: NavigationLink) => (
							<Link
								href={link.href}
								className={styles.navLink}
								target="_blank"
								rel="noopener noreferrer"
							>
								{link.title}
							</Link>
						))}
					</nav>
					<div className={styles.actions}>
						<a href={`tel:${about.phoneLink}`}>{about.phone}</a>
						<Button
							minWidth={242}
							onClick={() => openModal("order")}
							className={styles.btn}
						>
							Записаться на сервис
						</Button>
					</div>
				</div>
				<div className={styles.info}>
					<p>
						Общество с ограниченной ответственностью «Финанс Лайн», 108820, город
						Москва, п Завода Мосрентген, км Мкад 44-Й (Внешняя Сторона), влд. 1 стр. 2.,
						<br />
						ИНН 7751294798, ОГРН 1247700093960
					</p>
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
						<p>
							Предоставляя свои персональные данные и используя настоящий веб-сайт, Вы
							даете согласие на обработку Ваших персональных данных и принимаете
							условия их обработки.
						</p>
					</div>
					<button
						className={styles.btnDisclaimer}
						onClick={() => setShowDisclaimer((prevState) => !prevState)}
					>
						{showDisclaimer ? "Скрыть" : "Раскрыть полный текст"}
					</button>
				</div>
				<div className={styles.links}>
					<Link
						href="/policy"
						className={styles.link}
						target="_blank"
						rel="noopener noreferrer"
					>
						Политика конфиденциальности
					</Link>
					<Link
						href="/link"
						className={styles.link}
						target="_blank"
						rel="noopener noreferrer"
					>
						Условия использования
					</Link>
					<span>© 2026, все права защищены</span>
				</div>
			</div>
		</footer>
	);
}
