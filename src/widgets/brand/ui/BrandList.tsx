"use client";
import React, { ReactNode, useState } from "react";
import { LuArrowUpRight } from "react-icons/lu";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/src/shared/ui/button/Button";

import styles from "./Brands.module.scss";

interface BrandListProps {
	title: string;
	brands: string[];
	className?: string | null;
	showMoreBtn?: boolean;
}
export function BrandList({
	title,
	brands,
	className,
	showMoreBtn = false,
}: BrandListProps): ReactNode {
	const [showAllCards, setShowAllCards] = useState<boolean>(false);

	return (
		<>
			<article
				className={`${styles.listWrap} ${className ? className : ""} ${showMoreBtn && !showAllCards ? styles.hidden : ""}`}
			>
				<h3 className={styles.list__title}>{title}</h3>
				<div className={styles.list}>
					{brands.map((brand) => (
						<Link key={brand} className={styles.brand} href={`/brands/${brand}`}>
							<Image src={`/images/brands/icons/${brand}.svg`} alt="" fill />
							<div className={styles.arrow}>
								<LuArrowUpRight size={22} />
							</div>
						</Link>
					))}
				</div>
			</article>
			{showMoreBtn && (
				<Button
					variant="secondary"
					onClick={() => setShowAllCards((prev) => !prev)}
					className={styles.showMore}
				>
					{showAllCards ? "Свернуть список" : "Показать еще"}
				</Button>
			)}
		</>
	);
}
