// "use client";
import Link from "next/link";

import { getServices } from "@/src/shared/api/services";
import { SectionId } from "@/src/shared/types/types";
import { Button } from "@/src/shared/ui/button/Button";
import { ServicesCard } from "@/src/widgets/services/ui/ServicesCard";

import styles from "./Services.module.scss";

interface ServicesProps {
	buttonShowAll?: boolean;
}
export async function Services({ buttonShowAll = false }: ServicesProps) {
	const services = await getServices();

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
				{services.map((service) => (
					<ServicesCard key={service.id} service={service} />
				))}
			</div>
		</div>
	);
}
