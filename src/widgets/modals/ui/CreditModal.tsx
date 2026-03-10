"use client";

import React from "react";

import styles from "@/src/widgets/modals/ui/Modals.module.scss";

import { BaseFormModal } from "./BaseFormModal";

export function CreditModal() {
	const title: React.ReactNode = (
		<h2 className={styles.title}>
			Рассчитаем кредит <br />с выгодой до 400 000
		</h2>
	);

	const content: React.ReactNode = (
		<ul className={styles.list}>
			<li>По 2-ум документам</li>
			<li>Подарки от дилера</li>
		</ul>
	);

	return <BaseFormModal title={title} content={content} />;
}
