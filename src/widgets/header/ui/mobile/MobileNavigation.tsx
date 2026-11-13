"use client";

import { useState } from "react";

import { CategoryWithServices } from "@/src/shared/data/services/types";

import { CategoriesMenu, MainMenu, ServicesMenu } from "./menuLevels";

import styles from "../Header.module.scss";

export type MenuLevel = "main" | "categories" | "services";

interface MobileMenuState {
	level: MenuLevel;
	activeCategory: CategoryWithServices | null;
}

const initialMenuState: MobileMenuState = {
	level: "main",
	activeCategory: null,
};
interface MobileNavigationProps {
	services: CategoryWithServices[];
	onClose: () => void;
}
export function MobileNavigation({ services, onClose }: MobileNavigationProps) {
	const [menuState, setMenuState] = useState(initialMenuState);

	const openCategories = () => {
		setMenuState((prev) => ({
			...prev,
			level: "categories",
		}));
	};
	const openServices = (category: CategoryWithServices) => {
		setMenuState((prev) => ({
			...prev,
			level: "services",
			activeCategory: category,
		}));
	};
	const goBack = () => {
		setMenuState((prev) => {
			if (prev.level === "services") {
				return {
					...prev,
					level: "categories",
				};
			}

			return {
				level: "main",
				activeCategory: null,
			};
		});
	};

	return (
		<div className={styles.headerBurgerMenuWrapper}>
			{menuState.level === "main" && (
				<MainMenu onClose={onClose} openCategories={openCategories} />
			)}
			{menuState.level === "categories" && (
				<CategoriesMenu
					services={services}
					openServices={openServices}
					onClose={onClose}
					goBack={goBack}
				/>
			)}
			{menuState.level === "services" && menuState.activeCategory && (
				<ServicesMenu
					services={menuState.activeCategory.items}
					title={menuState.activeCategory.title}
					goBack={goBack}
					onClose={onClose}
				/>
			)}
		</div>
	);
}
