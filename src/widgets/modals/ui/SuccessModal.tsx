"use client";

import React from "react";
import { MdOutlineClose } from "react-icons/md";

import { useModal } from "@/src/app/_providers/ModalProvider";

import styles from "./Modals.module.scss";

export function SuccessModal() {
	const { closeModal } = useModal();

	return (
		<div className={styles.modalOverlay} onClick={closeModal}>
			<div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
				<button className={styles.closeButton} onClick={closeModal}>
					<MdOutlineClose />
				</button>

				<h2>Спасибо за заявку!</h2>
				<p>Наш менеджер скоро свяжется с Вами</p>
			</div>
		</div>
	);
}
