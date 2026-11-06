import { FaClock, FaPhone } from "react-icons/fa";
import { HiMapPin } from "react-icons/hi2";
import { IoMdMail } from "react-icons/io";

import Image from "next/image";

import { formatPhoneToLink } from "@/src/shared/lib/utils/format-phone";
import { Address } from "@/src/shared/types/types";

import styles from "./ContactsFull.module.scss";

export function ContactsFullItem({ contact }: { contact: Address }) {
	return (
		<div id={contact.id} className={styles.item}>
			<div className={styles.gallery}></div>
			<div className={styles.content}>
				<div className={styles.gallery__thumb}></div>
				<ul className={styles.list}>
					<li className={styles.list__item}>
						<HiMapPin />
						{contact.address}
					</li>
					<li className={styles.list__item}>
						<FaPhone />
						<a href={`tel:${formatPhoneToLink(contact.phone)}`}>{contact.phone}</a>
					</li>
					<li className={styles.list__item}>
						<FaClock />
						{contact.time}
					</li>
				</ul>

				<div className={styles.brands}>
					<div className={styles.brands__title}>Официальный дилер:</div>
					<div className={styles.brands__list}>
						{contact.brands.map((brand) => (
							<div key={brand} className={styles.brands__item}>
								<Image
									src={`/images/brands/icons/${brand}.svg`}
									alt=""
									width={78}
									height={78}
								/>
							</div>
						))}
					</div>
				</div>

				<div className={styles.map}></div>
			</div>
		</div>
	);
}
