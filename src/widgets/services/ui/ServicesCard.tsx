// "use client";
import { Service } from "@/src/shared/types/types";

import styles from "./Services.module.scss";
import Link from "next/link";

interface ServicesCardProps {
	service: Service;
}
export async function ServicesCard({ service }: ServicesCardProps) {
	return (
		<article className={styles.servicesCard}>
			<h3>{service.title}</h3>

			<div>
				{service.items.map((itm, index) => <div key={itm.href}>
					<span>{index}</span>
					<Link href={`/services/${service.href}/${itm.href}`}>{ itm.title }</Link>
				</div> )}
			</div>
		</article>
	);
}
