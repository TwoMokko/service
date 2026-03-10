// "use client";
import { AiFillYoutube } from "react-icons/ai";
import { BiLogoInstagramAlt } from "react-icons/bi";
import { RiTelegram2Fill, RiVkFill } from "react-icons/ri";

import { about, socialLinks } from "@/src/shared/config";
import { YaMap } from "@/src/widgets/contact/ui/YaMap";

import styles from "./Contacts.module.scss";

export function Contacts({ idSection, titleSection }: { idSection: string; titleSection: string }) {
	return (
		<section id={idSection} className={styles.contacts}>
			<div className="container">
				<h2 className={`${styles.contactsTitle} section-title`}>{titleSection}</h2>
				<div className={styles.contactsWrap}>
					<div className={styles.contactsInfo}>
						<div>
							<div className={styles.contactsInfoItem}>
								<div className={styles.contactsInfoName}>(телефон)</div>
								<div className={styles.contactsInfoValue}>
									<a
										href={`tel:${about.phoneLink}`}
										className={styles.primaryPhone}
									>
										{about.phone}
									</a>
								</div>
							</div>
							<div className={styles.contactsInfoItem}>
								<div className={styles.contactsInfoName}>(электронная почта)</div>
								<div className={styles.contactsInfoValue}>
									<a href={`mailto:${about.email}`}>{about.email}</a>
								</div>
							</div>
							<div className={styles.contactsInfoItem}>
								<div className={styles.contactsInfoName}>(Адрес)</div>
								<div className={styles.contactsInfoValue}>{about.address}</div>
							</div>
							<div className={styles.contactsInfoItem}>
								<div className={styles.contactsInfoName}>(часы работы)</div>
								<div className={styles.contactsInfoValue}>{about.time}</div>
							</div>
							<div className={styles.contactsInfoItem}>
								<div className={styles.contactsInfoName}>(социальные сети)</div>
								<div
									className={`${styles.contactsInfoValue} ${styles.contactsInfoSocial}`}
								>
									<a
										href={socialLinks.instagram}
										target="_blank"
										rel="noopener noreferrer"
										className="inst"
									>
										<BiLogoInstagramAlt size={25} />
									</a>
									<a
										href={socialLinks.youtube}
										target="_blank"
										rel="noopener noreferrer"
									>
										<AiFillYoutube size={25} />
									</a>
									<a
										href={socialLinks.vkontakte}
										target="_blank"
										rel="noopener noreferrer"
									>
										<RiVkFill size={25} />
									</a>
									<a
										href={socialLinks.telegram}
										target="_blank"
										rel="noopener noreferrer"
									>
										<RiTelegram2Fill size={25} />
									</a>
								</div>
							</div>
							<div className={styles.contactsInfoItem}>
								<div className={styles.contactsInfoName}>(сервисный центр)</div>
								<div className={styles.contactsInfoValue}>
									<a href={`tel:${about.servicePhoneLink}`}>
										{about.servicePhone}
									</a>
								</div>
							</div>
						</div>
						<div className={styles.contactsInfoInst}>
							*Instagram — проект Meta Platforms Inc., деятельность которой запрещена
							в России
						</div>
					</div>
					<YaMap address="МКАД, 44-й километр, 1Вс2" />
				</div>
			</div>
		</section>
	);
}
