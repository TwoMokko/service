"use client";

import React from "react";

import { BaseFormModal } from "./BaseFormModal";

import styles from "./Modals.module.scss";

export function OrderModal() {
	const title: React.ReactNode = (
		<h2 className={styles.title}>
			Новый SWM с выгодой <br />
			до 700 000 ₽
		</h2>
	);

	const content: React.ReactNode = (
		<p className={styles.subtitle}>Только 20 автомобилей по специальной цене</p>
	);

	return <BaseFormModal title={title} content={content} />;
}
