import { about } from "@/src/shared/config";

import { ContactsFullItem } from "./ContactsFullItem";

import styles from "./ContactsFull.module.scss";

export function ContactsFull() {
	const contactsData = about.addresses;

	return (
		<section className="container block-bottom">
			<h1 className="page-title margin-bot">Контакты сервисных центров PELETON</h1>
			<div className={styles.wrapper}>
				{contactsData.map((contact, idx) => (
					<ContactsFullItem contact={contact} key={contact.id} />
				))}
			</div>

			<div>avito 2gis yandex</div>
		</section>
	);
}
