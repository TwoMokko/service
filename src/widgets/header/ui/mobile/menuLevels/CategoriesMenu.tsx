"use client";

import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import Image from "next/image";
import Link from "next/link";

import { CategoryWithServices } from "@/src/shared/data/services/types";

import styles from "./HeaderMenuLevels.module.scss";

interface CategoriesMenuProps {
	services: CategoryWithServices[];
	openServices: (category: CategoryWithServices) => void;
	onClose: () => void;
	goBack: () => void;
}
export function CategoriesMenu({ services, openServices, onClose, goBack }: CategoriesMenuProps) {
	return (
		<div className={styles.categories}>
			<button type="button" onClick={goBack} className={styles.back}>
				<IoIosArrowBack size={12} />
				назад
			</button>
			<h3 className={styles.list__head}>Услуги</h3>
			<ul className={styles.list}>
				<li className={styles.list__item}>
					<Link href={`/services`} prefetch={false} onClick={onClose}>
						<span className={styles.list__item_title}>Показать все</span>
						<IoIosArrowForward size={12} />
					</Link>
				</li>
				{services.map((itm) => (
					<li key={itm.slug} className={styles.list__item}>
						<button type="button" onClick={() => openServices(itm)}>
							<span className={styles.list__item_title}>{itm.title}</span>
							<Image
								className={styles.list__item_img}
								src={`/images/services/cards/${itm.slug}.png`}
								alt=""
								width={96}
								height={47}
							/>
							<IoIosArrowForward size={12} />
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}
