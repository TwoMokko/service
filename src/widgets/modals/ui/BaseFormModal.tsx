"use client";

import { ReactNode } from "react";
import { MdOutlineClose } from "react-icons/md";

import Image from "next/image";

import { useModal } from "@/src/app/_providers/ModalProvider";
import { useFormLogic } from "@/src/shared/lib/hooks/useFormLogic";
import { AgreementCheckboxes } from "@/src/shared/ui/agreementCheckboxes/AgreementCheckboxes";
import { Button } from "@/src/shared/ui/button/Button";
import { Input } from "@/src/shared/ui/input/Input";

import styles from "./Modals.module.scss";

type FormLogic = ReturnType<typeof useFormLogic>;

interface BaseFormModalProps {
	title: ReactNode;
	content?: ReactNode;
	imageSrc: string;
	children?: ReactNode;
}

function ModalForm({ form }: { form: FormLogic }) {
	const nameClass = form.errors.name
		? `${styles.nameInput} ${styles.errorInput}`
		: styles.nameInput;

	return (
		<form
			noValidate
			onSubmit={form.submit}
			className={`${styles.form} ${form.submitError ? styles.formError : ""}`}
		>
			{form.submitError && (
				<div className={styles.errorToast}>
					{form.submitError}
					<button type="button" onClick={form.resetError} className={styles.toastClose}>
						<MdOutlineClose />
					</button>
				</div>
			)}

			<Input
				type="text"
				inputName="name"
				placeholder="Имя"
				value={form.formData.name ?? ""}
				handleChange={form.handleChange}
				className={nameClass}
				required
			/>

			<Input
				type="tel"
				inputName="phone"
				placeholder="+7 (___) ___-__-__"
				value={form.phoneValue}
				handleChange={form.handlePhoneChange}
				className={form.errors.phone ? styles.errorInput : ""}
				required
			/>

			<AgreementCheckboxes
				agreementPersonalData={form.formData.agreementPersonalData ?? false}
				agreementMarketing={form.formData.agreementMarketing ?? false}
				errors={form.errors}
				isSubmitted={form.isSubmitted}
				onAgreementChange={form.setFieldValue}
				className={styles.modalAgreements}
			/>

			<Button type="submit" disabled={form.isLoading} className={styles.submitButton}>
				{form.isLoading ? "Отправка..." : "Записаться на сервис"}
			</Button>
		</form>
	);
}

export function BaseFormModal({ title, content, imageSrc, children }: BaseFormModalProps) {
	const { closeModal } = useModal();
	const form = useFormLogic({ showNameField: true });

	const handleClose = () => {
		form.resetForm();
		closeModal();
	};

	return (
		<div className={styles.modalOverlay} onClick={handleClose}>
			<div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
				<div className={styles.media}>
					<Image
						src={imageSrc}
						alt=""
						fill
						unoptimized
						className={styles.mediaImage}
						priority
					/>
					{children}
				</div>

				<div className={styles.body}>
					{title}
					{content}
					<ModalForm form={form} />
				</div>
				<button
					type="button"
					className={styles.closeButton}
					onClick={handleClose}
					aria-label="Закрыть"
				>
					<MdOutlineClose />
				</button>
			</div>
		</div>
	);
}
