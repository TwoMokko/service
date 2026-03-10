"use client";

import React from "react";

import styles from "@/src/widgets/modals/ui/Modals.module.scss";

import { BaseFormModal } from "./BaseFormModal";

export function TradeModal() {
	const title: React.ReactNode = <h2 className={styles.title}>Трейд-ин</h2>;

	const content: React.ReactNode = (
		<>
			<p className={styles.subtitle}>
				Обменяйте старый а/м на SWM <br />с бонусом до 300 000 руб
			</p>
			<ul className={styles.list}>
				<li>Сделка за один день</li>
				<li>Честная оценка вашего авто</li>
			</ul>
		</>
	);

	return <BaseFormModal title={title} content={content} />;
}
