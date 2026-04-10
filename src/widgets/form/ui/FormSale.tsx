"use client";

import React from "react";

import { useDevice } from "@/src/shared/lib/hooks/useDevice";

import { Form } from "./Form";

import styles from "./Form.module.scss";

export function FormSale() {
	const { isMobile, isReady } = useDevice();

	const imageSrc = !isReady
		? "/images/form/form-sale-desk.png"
		: isMobile
			? "/images/form/form-sale-mob.png"
			: "/images/form/form-sale-desk.png";

	const title: React.ReactNode = (
		<h2 className={styles.title}>
			<span className="text-primary">Скидка 50% на ТО</span>
			<br />
			при первом посещении сервиса
			<br />+ комплексная мойка в подарок
		</h2>
	);

	return (
		<section className="container block-bottom">
			<Form title={title} imageSrc={imageSrc} />
		</section>
	);
}
