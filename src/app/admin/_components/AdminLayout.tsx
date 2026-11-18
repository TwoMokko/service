"use client";

import type { ReactNode } from "react";

import styles from "../admin.module.scss";

export type AdminTab = "services" | "reviews" | "brands";

interface AdminLayoutProps {
	activeTab: AdminTab;
	onTabChange: (tab: AdminTab) => void;
	children: ReactNode;
}

export default function AdminLayout({ activeTab, onTabChange, children }: AdminLayoutProps) {
	return (
		<div className={styles.adminPage}>
			<div className={styles.header}>
				<h1>Админка</h1>
			</div>

			<nav>
				<button
					type="button"
					className={styles.btn}
					onClick={() => onTabChange("services")}
					aria-pressed={activeTab === "services"}
				>
					Услуги
				</button>

				<button
					type="button"
					className={styles.btn}
					onClick={() => onTabChange("reviews")}
					aria-pressed={activeTab === "reviews"}
				>
					Отзывы
				</button>
				<button
					type="button"
					className={styles.btn}
					onClick={() => onTabChange("brands")}
					aria-pressed={activeTab === "brands"}
				>
					Бренды
				</button>
			</nav>

			{children}
		</div>
	);
}
