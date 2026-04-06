import { FaClock, FaPhone } from "react-icons/fa";
import { HiMapPin } from "react-icons/hi2";
import { IoMdMail } from "react-icons/io";

import Image from "next/image";

import { Brands, BrandsKey } from "@/src/shared/data/brands/brands";
import { YaMap } from "@/src/widgets/contact/ui/YaMap";

import styles from "./Contacts.module.scss";

export default function ContactItem({
	address,
	phone,
	email,
	time,
	isActive,
	brands,
}: {
	address: string;
	phone: string;
	email: string;
	time: string;
	isActive: boolean;
	brands: Brands[BrandsKey];
}) {
	return (
		<article
			className={`${styles.contactsItem} ${isActive ? styles.active : ""}`}
			aria-hidden={!isActive}
			inert={!isActive ? true : undefined}
		>
			<div className={styles.contactsInfo}>
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
							<Image src={`/images/brands/official/${brand}.svg`} alt="" fill />
						</div>
					))}
				</div>
			</div>
			{/*<YaMapIframe address={address} />*/}
			<YaMap address={address} />
		</article>
	);
}
