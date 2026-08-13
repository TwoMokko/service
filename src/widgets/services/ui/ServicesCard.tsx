"use client";
import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { LuArrowUpRight } from "react-icons/lu";

import Image from "next/image";
import Link from "next/link";

import { CategoryWithServices } from "@/src/shared/data/services";
import { useDevice } from "@/src/shared/lib/hooks/useDevice";
import { Button } from "@/src/shared/ui/button/Button";

import styles from "./Services.module.scss";

interface ServicesCardProps {
	category: CategoryWithServices;
	isInitiallyOpen?: boolean;
}
export function ServicesCard({ category, isInitiallyOpen = false }: ServicesCardProps) {
	const { isMobile } = useDevice();
	const [isShowList, setIsShowList] = useState<boolean>(isInitiallyOpen);

	return (
		<article className={styles.servicesCard}>
			<div className={styles.top}>
				<div className={styles.title__wrap}>
					<h3 className={styles.title}>{category.title}</h3>
					<span className={styles.topCount}>({category.items.length})</span>
				</div>
				<Link
					prefetch={false}
					href={`/services/${category.href}`}
					className={styles.topLink}
				>
					<Button variant="outline">Подробнее</Button>
				</Link>
				<Image
					className={styles.imgBackground}
					src={`/images/services/cards/${category.href}.png`}
					alt=""
					width={196}
					height={114}
				/>
			</div>

			<div className={styles.listWrap}>
				{isMobile && (
					<button
						className={`${styles.list__showMore} ${isShowList ? styles.show : ""}`}
						onClick={() => setIsShowList((prev) => !prev)}
					>
						<span>
							{isShowList ? "Свернуть список услуг" : "Раскрыть список услуг"}
						</span>
						<IoIosArrowDown size={20} />
					</button>
				)}
				{(!isMobile || (isMobile && isShowList)) && (
					<div className={styles.list}>
						{category.items.map((service, index) => (
							<Link
								prefetch={false}
								key={service.id || index}
								href={`/services/${category.href}/${service.href}`}
								className={styles.listItem}
							>
								<span className={styles.listCount}>{index + 1}</span>
								<div className={styles.listTitle}>{service.title}</div>
								{!isMobile && (
									<div className={styles.listArrow}>
										<LuArrowUpRight size={22} />
									</div>
								)}
							</Link>
						))}
					</div>
				)}
			</div>
		</article>
	);
}
