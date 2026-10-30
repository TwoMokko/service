"use client";
import React, { ReactNode } from "react";

import Image from "next/image";

import { useModal } from "@/src/app/_providers/ModalProvider";
import { Brand } from "@/src/shared/data/brands/brands";
import { Button } from "@/src/shared/ui/button/Button";

import styles from "./Banner.module.scss";

interface BannerProps {
	title: string | ReactNode;
	description: string | ReactNode;
	imageSrc: string;
	titlePage?: boolean;
	brand?: Brand;
}

export function Banner({ title, description, imageSrc, titlePage = false, brand }: BannerProps) {
	const { openModal } = useModal();

	return (
		<section className={`${styles.banner} container block-bottom`}>
			<div className={styles.img__wrap}>
				<Image src={imageSrc} alt="" className={styles.image} fill />
			</div>
			<div className={styles.info}>
				{titlePage ? (
					<h1 className={`${styles.title} page-title`}>{title}</h1>
				) : (
					<h2 className={`${styles.title} section-title`}>{title}</h2>
				)}
				{description && <p className={styles.description}>{description}</p>}

				<div className={styles.btns}>
					<Button variant="outline" onClick={() => openModal("common")}>
						Бесплатная консультация
					</Button>
					<Button onClick={() => openModal("common")}>Записаться на сервис</Button>
				</div>
			</div>
			{brand && (
				<div className={styles.brand}>
					<Image
						src={`/images/brands/icons/${brand.href}.svg`}
						alt={brand.title}
						width={80}
						height={80}
					/>
				</div>
			)}
		</section>
	);
}
