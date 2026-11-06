"use client";

import React from "react";

import { about } from "@/src/shared/config";
import { getContactItem, primaryContact } from "@/src/shared/lib/helpers/getContacts";
import { formatPhoneToLink } from "@/src/shared/lib/utils/format-phone";

import { BaseFormModal } from "./BaseFormModal";

import styles from "./Modals.module.scss";

export function CommonModal() {
	const title: React.ReactNode = (
		<h2 className={`${styles.title} section-title`}>
			Получить консультацию
			{/*<br />*/}
		</h2>
	);

	const content: React.ReactNode = (
		<p className={styles.subtitle}>
			Отправьте заявку на обратный звонок или позвоните
			<br />
			по номеру телефона:{" "}
			<a href={`tel:${formatPhoneToLink(primaryContact.phone)}`}>{primaryContact.phone}</a>
		</p>
	);

	return (
		<BaseFormModal
			title={title}
			content={content}
			imageSrc="/images/modals/modal-bg-common.png"
		/>
	);
}
