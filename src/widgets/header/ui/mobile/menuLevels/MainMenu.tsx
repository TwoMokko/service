"use client";
import React from "react";

import Link from "next/link";

import { useModal } from "@/src/app/_providers/ModalProvider";
import { navigationLinks, sectionTitles } from "@/src/shared/config";
import { SectionId } from "@/src/shared/types/types";
import { Button } from "@/src/shared/ui/button/Button";

import styles from "../HeaderMenuMobile.module.scss";

interface MainMenuProps {
	onClose: () => void;
	openCategories: () => void;
}
export function MainMenu({ onClose, openCategories }: MainMenuProps) {
	const { openModal } = useModal();
	const handleOpenModal = () => {
		onClose();
		openModal("common");
	};
	return (
		<div className={styles.levels__main}>
			<ul>
				<li>
					<button type="button" onClick={openCategories}>
						{sectionTitles[SectionId.SERVICES]}
					</button>
				</li>
				{navigationLinks
					.filter((link) => link.title !== sectionTitles[SectionId.SERVICES])
					.map((link) => (
						<li key={link.href}>
							<Link prefetch={false} href={link.href} onClick={onClose}>
								{link.title}
							</Link>
						</li>
					))}
			</ul>
			<Button onClick={handleOpenModal}>Записаться на сервис</Button>
		</div>
	);
}
