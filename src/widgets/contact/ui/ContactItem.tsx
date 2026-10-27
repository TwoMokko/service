import { FaClock, FaPhone } from "react-icons/fa";
import { HiMapPin } from "react-icons/hi2";
import { IoMdMail } from "react-icons/io";

import Image from "next/image";

import styles from "./Contacts.module.scss";

export default function ContactItem({
	address,
	phone,
	email,
	time,
	brands,
}: {
	address: string;
	phone: string;
	email: string;
	time: string;
	brands: string[];
}) {
	return (
		<article className={styles.contactsInfo}>
			<h3 className={styles.contactsItemTitle}>Официальный сервис:</h3>
			<ul className={styles.contactsItemList}>
				<li>
					<HiMapPin />
					{address}
				</li>
				<li>
					<FaPhone />
					<a href={`tel:${phone}`}>{phone}</a>
				</li>
				<li>
					<IoMdMail />
					<a href={`mailto:${email}`}>{email}</a>
				</li>
				<li>
					<FaClock />
					{time}
				</li>
			</ul>
			<div className={`${styles.brandWrap} ${styles[`brandsCount${brands.length}`]}`}>
				{brands.map((brand) => (
					<div key={brand} className={styles.brand}>
						<Image src={`/images/brands/icons/${brand}.svg`} alt="" fill />
					</div>
				))}
			</div>
		</article>
	);
}
