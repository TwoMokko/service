"use client";

import React from "react";
import { MdOutlineClose } from "react-icons/md";

import Image from "next/image";
import Link from "next/link";

import { useModal } from "@/src/app/_providers/ModalProvider";
import { Button } from "@/src/shared/ui/button/Button";

import styles from "./Modals.module.scss";

export function ErrorModal() {
	const { closeModal } = useModal();

	return (
		<div className={styles.modalOverlay} onClick={closeModal}>
			<div
				className={`${styles.modalContent} ${styles.feedback}`}
				onClick={(e) => e.stopPropagation()}
			>
				<div className={styles.media}>
					<Image
						src="/images/modals/modal-bg-error.png"
						alt=""
						fill
						unoptimized
						className={styles.mediaImage}
						priority
					/>
				</div>
				<div className={styles.body}>
					<h2 className={`${styles.title} section-title`}>
						Ваша заявка уже <br />
						была отправлена!
					</h2>
					<p className={styles.subtitle}>
						Наш менеджер свяжется с вами <br className="desk-hide" />в течение 5 минут
					</p>
					<Link href="/" prefetch={false}>
						<Button className={styles.btn}>Вернуться на главную</Button>
					</Link>
				</div>
				<button
					type="button"
					className={styles.closeButton}
					onClick={closeModal}
					aria-label="Закрыть"
				>
					<MdOutlineClose />
				</button>
			</div>
		</div>
	);
}
