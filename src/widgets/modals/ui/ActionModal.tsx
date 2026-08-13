"use client";

import React from "react";
import { MdOutlineClose } from "react-icons/md";

import { useModal } from "@/src/app/_providers/ModalProvider";
import { ActionModalData } from "@/src/shared/types/types";

import styles from "./ActionModal.module.scss";

export function ActionModal() {
	const { modalData, closeModal } = useModal();
	const data = modalData as ActionModalData;

	if (!data) return null;

	return (
		<div className={styles.modalOverlay} onClick={closeModal}>
			<div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
				<button className={styles.closeButton} onClick={closeModal}>
					<MdOutlineClose />
				</button>
				<div>{data.content}</div>
			</div>
		</div>
	);
}
