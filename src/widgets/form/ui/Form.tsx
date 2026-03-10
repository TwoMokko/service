"use client";

import React, { useState } from "react";
import { MdDone } from "react-icons/md";

import Image from "next/image";
import Link from "next/link";

import { useDevice } from "@/src/shared/lib/hooks/useDevice";
import { usePhoneMask } from "@/src/shared/lib/hooks/usePhoneMask";
import { useSubmit } from "@/src/shared/lib/hooks/useSubmit";
import { FormData } from "@/src/shared/types/types";
import { Button } from "@/src/shared/ui/button/Button";

import styles from "./Form.module.scss";

export function Form({ idSection }: { idSection: string }) {
	const { isMobile, isReady } = useDevice();
	const { handleSubmit, isLoading } = useSubmit();
	const { phoneValue, onPhoneChange } = usePhoneMask();
	const [isAgreed, setIsAgreed] = useState(true);
	const [formData, setFormData] = useState<FormData>({
		name: "переписать, чтобы было необязательным",
		phone: "",
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

	const imageSrc = !isReady
		? "/images/form/form-desk.png"
		: isMobile
			? "/images/form/form-mob.png"
			: "/images/form/form-desk.png";

	return (
		<section id={idSection} className={styles.trade}>
			<div className={styles.imgWrap}>
				<Image src={imageSrc} alt="hero" fill sizes="100vw" className={styles.image} />
			</div>
			<div className="container">
				<div className={styles.info}>
					<h2 className={styles.title}>
						Trade-in с выгодой <br />
						от Официального дилера
					</h2>
					<ul className={styles.list}>
						<li>Прозрачная оценка автомобиля</li>
						<li>Скидка до 300 000₽ на новый авто </li>
						<li>Сдать авто можно в качестве первого взноса</li>
					</ul>
					<form onSubmit={submit} className={styles.form}>
						<div className={styles.formInputs}>
							<input
								type="tel"
								name="phone"
								placeholder="Телефон"
								value={phoneValue}
								onChange={handlePhoneChange}
								required
							/>
							<Button type="submit" disabled={!isAgreed || isLoading}>
								{isLoading ? "Отправка..." : "Зафиксировать выгоду"}
							</Button>
						</div>

						<label className={styles.checkboxWrap}>
							<input
								type="checkbox"
								checked={isAgreed}
								onChange={(e) => setIsAgreed(e.target.checked)}
								required
							/>
							<span className={styles.checkbox}>{isAgreed && <MdDone />}</span>
							<div>
								Согласен на обработку
								<Link
									href="/policy"
									target="_blank"
									rel="noopener noreferrer"
									className={styles.policyLink}
								>
									персональных данных*
								</Link>
							</div>
						</label>
					</form>
				</div>
			</div>
		</section>
	);
}
