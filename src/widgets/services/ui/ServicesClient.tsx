"use client";
import { useState } from "react";

import type { CategoryWithServices } from "@/src/shared/data/services/categories";
import { useDevice } from "@/src/shared/lib/hooks/useDevice";
import { Button } from "@/src/shared/ui/button/Button";
import { ServicesCard } from "@/src/widgets/services/ui/ServicesCard";

import styles from "./Services.module.scss";

interface ServicesProps {
	services: CategoryWithServices[];
}
export function ServicesClient({ services }: ServicesProps) {
	const { isMobile } = useDevice();
	const [showAllCards, setShowAllCards] = useState<boolean>(false);
	const initCardCount: number = isMobile ? 3 : 6;

	const allCards = services.map((service) => (
		<ServicesCard key={service.id} category={service} />
	));

	const visibleCards = allCards.slice(0, initCardCount);
	const hiddenCards = allCards.slice(initCardCount);

	return (
		<div className={`${styles.services} container`}>
			<h2>Наши услуги</h2>
			<div className={styles.servicesCards}>{visibleCards}</div>
			<div className={`${styles.servicesCards} ${!showAllCards ? styles.hidden : ""}`}>
				{hiddenCards}
			</div>

			{allCards.length > initCardCount && (
				<Button
					variant="secondary"
					onClick={() => setShowAllCards((prev) => !prev)}
					className={styles.showMore}
				>
					{showAllCards ? "Свернуть список" : "Показать еще"}
				</Button>
			)}
		</div>
	);
}
