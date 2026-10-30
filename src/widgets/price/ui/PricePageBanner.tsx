"use client";

import React from "react";

import Image from "next/image";

import { useModal } from "@/src/app/_providers/ModalProvider";
import { Button } from "@/src/shared/ui/button/Button";

import styles from "./PricePageBanner.module.scss";

interface PricePageBannerProps {
	title: string;
	titlePage?: boolean;
}

export function PricePageBanner({ title, titlePage = false }: PricePageBannerProps) {
	const { openModal } = useModal();

	return (
		<section className={`${styles.banner} container block-bottom`}>
			<div className={styles.img__wrap}>
				<Image
					src="/images/banners/pricePage-banner-desk.png"
					alt=""
					className={styles.image}
					fill
				/>
			</div>
			<div className={styles.info}>
				{titlePage ? (
					<h1 className={`${styles.title} page-title`}>{title}</h1>
				) : (
					<h2 className={`${styles.title} section-title`}>{title}</h2>
				)}

				<div className={styles.btns}>
					<Button variant="outline" onClick={() => openModal("common")}>
						Бесплатная консультация
					</Button>
					<Button onClick={() => openModal("common")}>Записаться на сервис</Button>
				</div>
			</div>
		</section>
	);
}
