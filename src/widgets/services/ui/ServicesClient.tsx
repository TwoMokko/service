"use client";
import { useState } from "react";

import Link from "next/link";

import { useDevice } from "@/src/shared/lib/hooks/useDevice";
import { SectionId, ServiceCategory } from "@/src/shared/types/types";
import { Button } from "@/src/shared/ui/button/Button";
import { ServicesCard } from "@/src/widgets/services/ui/ServicesCard";

import styles from "./Services.module.scss";

interface ServicesProps {
	services: ServiceCategory[];
	buttonShowAll?: boolean;
}
export function ServicesClient({ services, buttonShowAll = false }: ServicesProps) {
	const { isMobile } = useDevice();
	const [showAllCards, setShowAllCards] = useState<boolean>(false);
	const initCardCount: number = isMobile ? 3 : 6;

	const visibleServices = showAllCards ? services : services.slice(0, initCardCount);

	return (
		<div className={`${styles.services} container`}>
			<h2>Наши услуги</h2>

			{/*вынести в отдельный компонент*/}
			<div style={{ display: "flex", gap: "20px" }}>
				<input style={{ width: "100%" }} />
				{buttonShowAll && (
					<Link
						style={{ flex: "none" }}
						href={`/${SectionId.SERVICES}`}
						target="_blank"
						rel="noopener noreferrer"
					>
						<Button variant="secondary">Показать все услуги</Button>
					</Link>
				)}
			</div>
			{/*вынести в отдельный компонент*/}

			<div className={styles.servicesCards}>
				{visibleServices.map((service) => (
					<ServicesCard key={service.id} category={service} />
				))}
			</div>
			<Button variant="secondary" onClick={() => setShowAllCards((prev) => !prev)}>
				{showAllCards ? "Свернуть список" : "Показать еще"}
			</Button>
		</div>
	);
}
