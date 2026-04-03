"use client";

import React from "react";

import { useDevice } from "@/src/shared/lib/hooks/useDevice";

import { Form } from "./Form";

import styles from "./Form.module.scss";

export function FormService() {
	const { isMobile, isReady } = useDevice();

	const imageSrc = !isReady
		? "/images/form/form-service-desk.png"
		: isMobile
			? "/images/form/form-service-mob.png"
			: "/images/form/form-service-desk.png";

	const title: React.ReactNode = <h2 className={styles.title}>Запишитесь на обслуживание</h2>;

	return (
		<section className="container block-bottom">
			<Form title={title} imageSrc={imageSrc} variant={"end"} />
		</section>
	);
}
