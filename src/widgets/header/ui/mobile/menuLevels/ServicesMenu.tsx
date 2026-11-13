"use client";

import React from "react";
import { IoIosArrowBack } from "react-icons/io";

import Link from "next/link";

import { Service } from "@/src/shared/data/services/types";

import styles from "./HeaderMenuLevels.module.scss";

interface ServicesMenuProps {
	services: Service[];
	title: string;
	goBack: () => void;
	onClose: () => void;
}
export function ServicesMenu({ services, title, goBack, onClose }: ServicesMenuProps) {
	return (
		<div className={styles.services}>
			<button type="button" onClick={goBack} className={styles.back}>
				<IoIosArrowBack size={12} />
				назад
			</button>
			<h3 className={styles.list__head}>
				{title}
				<span className={styles.list__head_count}>({services.length})</span>
			</h3>
			<ul className={styles.list}>
				{services.map((itm, index) => (
					<li key={itm.slug} className={styles.list__item}>
						<Link
							href={`/services/${itm.categorySlug}/${itm.slug}`}
							prefetch={false}
							onClick={onClose}
						>
							<span className={styles.list__item_count}>{index + 1}</span>
							<span className={styles.list__item_title}>{itm.title}</span>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}
