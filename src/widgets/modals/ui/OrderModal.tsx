"use client";

import React from "react";

import { BaseFormModal } from "./BaseFormModal";

import styles from "./Modals.module.scss";
import {about} from "@/src/shared/config";

export function OrderModal() {
	const title: React.ReactNode = (
		<h2 className={styles.title}>
			Получить консультацию
			{/*<br />*/}
		</h2>
	);

	const content: React.ReactNode = (
		<p className={styles.subtitle}>
			Отправьте заявку на обратный звонок или позвоните
			<br/>по номеру телефона: <a href={`tel:${about.phoneLink}`}>{about.phone}</a>
		</p>
	);

	return <BaseFormModal title={title} content={content} />;
}
