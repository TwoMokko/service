"use client";

import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

import { useDevice } from "@/src/shared/lib/hooks/useDevice";

import styles from "./InfoBlock.module.scss";

export interface InfoBlockProps {
	content: {
		title: string;
		paragraphs: string[]; // если будут другие типы данных, переписать (и разметку тоже)
	}[];
	title?: string;
	titlePage?: boolean;
}

export function InfoBlock({ content, title, titlePage = false }: InfoBlockProps) {
	const [isShow, setIsShow] = useState<boolean>(true);
	const { isMobile } = useDevice();

	const handleShow = () => {
		if (!isMobile) return;

		setIsShow((prev) => !prev);
	};

	return (
		<section className={`block-bottom ${styles.wrapper} ${isShow ? styles.show : ""}`}>
			{title && (
				<button className={styles.top} onClick={handleShow}>
					{titlePage ? (
						<h1 className={`${styles.top__title} page-title`}>{title}</h1>
					) : (
						<h2 className={`${styles.top__title} section-title`}>{title}</h2>
					)}
					<IoIosArrowDown
						size={20}
						aria-hidden="true"
						className={`desk-hide ${styles.top__arrow}`}
					/>
				</button>
			)}
			{content.map((item) => (
				<article className={styles.paragraph}>
					<h3 className={styles.paragraph__title}>{item.title}</h3>
					{item.paragraphs.map((p) => (
						<p className={styles.paragraph__text}>{p}</p>
					))}
				</article>
			))}
		</section>
	);
}
