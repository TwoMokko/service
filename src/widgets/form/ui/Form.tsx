"use client";

import React, { useState } from "react";
import { MdDone } from "react-icons/md";

import Image from "next/image";
import Link from "next/link";

import { usePhoneMask } from "@/src/shared/lib/hooks/usePhoneMask";
import { useSubmit } from "@/src/shared/lib/hooks/useSubmit";
import { FormData } from "@/src/shared/types/types";
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
	const { handleSubmit, isLoading } = useSubmit();
	const { phoneValue, onPhoneChange } = usePhoneMask();
	const [isAgreed, setIsAgreed] = useState(true);
	const [formData, setFormData] = useState<FormData>({
		phone: "",
		url: "",
	});

	const submit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!isAgreed) {
			alert("Пожалуйста, согласитесь с обработкой персональных данных");
			return;
		}

		await handleSubmit(formData);
	};

	const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		onPhoneChange(e);
		setFormData((prev) => ({
			...prev,
			phone: e.target.value,
		}));
	};

	return (
		<section className={`${styles.form__wrap} ${variant === "end" ? styles.end : ""}`}>
			<div className={styles.img__wrap}>
				<Image src={imageSrc} alt="" fill sizes="100vw" className={styles.image} />
			</div>
			<div className={styles.info}>
				{title}
				{content}
				<form onSubmit={submit} className={styles.form}>
					<div className={styles.form__inputs}>
						<Input
							type="tel"
							inputName="phone"
							placeholder="Ваш телефон"
							value={phoneValue}
							handleChange={handlePhoneChange}
							required
						/>
						<Button type="submit" disabled={!isAgreed || isLoading}>
							{isLoading ? "Отправка..." : "Записаться на сервис"}
						</Button>
					</div>

					<label className={styles.checkbox__wrap}>
						<input
							type="checkbox"
							checked={isAgreed}
							onChange={(e) => setIsAgreed(e.target.checked)}
							required
						/>
						<span className={styles.checkbox}>
							{isAgreed && <MdDone color="black" />}
						</span>
						<div>
							Отправив форму путём нажатия на кнопку, я подтверждаю, что ознакомлен
							<br className="laptop-hide" />с
							<Link
								prefetch={false}
								href="/policy"
								target="_blank"
								rel="noopener noreferrer"
								className={styles.policyLink}
							>
								политикой конфиденциальности
							</Link>
							сайта и даю согласие на обработку моих персональных данных.
						</div>
					</label>
				</form>
			</div>
		</section>
	);
}
