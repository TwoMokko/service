"use client";

import React from "react";
import { MdOutlineClose } from "react-icons/md";

import { useFormLogic } from "@/src/shared/lib/hooks/useFormLogic";
import { AgreementCheckboxes } from "@/src/shared/ui/agreementCheckboxes/AgreementCheckboxes";
import { Button } from "@/src/shared/ui/button/Button";
import { Input } from "@/src/shared/ui/input/Input";

import styles from "./Form.module.scss";

interface FormProps {
	title: string | React.ReactNode;
	imageSrc: string;
	content?: string | React.ReactNode;
	variant?: "start" | "end" | undefined;
}

export function Form({ title, content, imageSrc, variant = "start" }: FormProps) {
	const form = useFormLogic({ showNameField: false });

	return (
		<div className={`${styles.form__wrap} ${variant === "end" ? styles.end : ""}`}>
			<div className={styles.img__wrap}>
				<img src={imageSrc} alt="" className={styles.image} />
			</div>
			<div className={styles.info}>
				{title}
				{content}
				<form
					noValidate
					onSubmit={form.submit}
					className={`${styles.form} ${form.submitError ? styles.formError : ""}`}
				>
					{form.submitError && (
						<div className={styles.errorToast}>
							{form.submitError}
							<button
								type="button"
								onClick={form.resetError}
								className={styles.toastClose}
							>
								<MdOutlineClose />
							</button>
						</div>
					)}
					<div className={styles.form__inputs}>
						<Input
							type="tel"
							inputName="phone"
							placeholder="+7 (___) ___-__-__"
							value={form.phoneValue}
							handleChange={form.handlePhoneChange}
							className={form.errors.phone ? styles.errorInput : ""}
							required
						/>
						<Button type="submit" disabled={form.isLoading}>
							{form.isLoading ? "Отправка..." : "Записаться на сервис"}
						</Button>
					</div>

					<AgreementCheckboxes
						agreementPersonalData={form.formData.agreementPersonalData ?? false}
						agreementMarketing={form.formData.agreementMarketing ?? false}
						errors={form.errors}
						isSubmitted={form.isSubmitted}
						onAgreementChange={form.setFieldValue}
						className={styles.modalAgreements}
					/>
				</form>
			</div>
		</div>
	);
}
